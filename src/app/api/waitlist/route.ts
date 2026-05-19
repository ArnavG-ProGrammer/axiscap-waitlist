import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { confirmationEmail } from "@/lib/emails/confirmation";
import { adminNotificationEmail } from "@/lib/emails/admin-notification";

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!supabaseUrl || !supabaseKey) {
      console.error("[AXISCAP] Missing env var: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
      console.error("[AXISCAP] URL present:", !!supabaseUrl, "KEY present:", !!supabaseKey);
      return NextResponse.json({ error: "Configuration error. Contact support." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { email, full_name, role, interest_area, referral_source } = body;

    if (!email || !full_name || !role || !interest_area) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Check duplicate
    const { data: existing, error: selectError } = await supabase
      .from("waitlist")
      .select("position")
      .eq("email", email)
      .maybeSingle();

    if (selectError) {
      console.error("[AXISCAP] Supabase select error:", selectError);
      return NextResponse.json({ error: "Database error: " + selectError.message }, { status: 500 });
    }

    if (existing) {
      return NextResponse.json(
        {
          error: "already_registered",
          position: existing.position,
          message: "You're already on the list.",
        },
        { status: 409 }
      );
    }

    // Insert
    const { data, error } = await supabase
      .from("waitlist")
      .insert([{ email, full_name, role, interest_area, referral_source }])
      .select("position")
      .single();

    if (error) {
      console.error("[AXISCAP] Supabase insert error:", error);
      return NextResponse.json({ error: "Database error: " + error.message }, { status: 500 });
    }

    // Send emails (best-effort, never block the response)
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);

        await resend.emails.send({
          from: "AXISCAP <onboarding@resend.dev>",
          to: email,
          subject: `Welcome to AXISCAP — you're #${data.position} on the waitlist`,
          html: confirmationEmail(full_name, data.position),
        });

        if (adminEmail) {
          await resend.emails.send({
            from: "AXISCAP <onboarding@resend.dev>",
            to: adminEmail,
            subject: `New AXISCAP waitlist signup — #${data.position}`,
            html: adminNotificationEmail({
              full_name,
              email,
              role,
              interest_area,
              referral_source,
              position: data.position,
            }),
          });
        }
      } catch (emailErr) {
        console.error("[AXISCAP] Email send failed:", emailErr);
      }
    }

    return NextResponse.json({ success: true, position: data.position });
  } catch (err: unknown) {
    console.error("[AXISCAP] Unhandled waitlist error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: "server_error: " + message }, { status: 500 });
  }
}
