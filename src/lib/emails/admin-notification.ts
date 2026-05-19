export function adminNotificationEmail(data: {
  full_name: string;
  email: string;
  role: string;
  interest_area: string;
  referral_source?: string;
  position: number;
}): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#000;font-family:'IBM Plex Mono',monospace;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0a0c0f;border:1px solid #1e2330;border-radius:4px;padding:32px;">
        <tr><td style="padding-bottom:24px;border-bottom:1px solid #1e2330;">
          <span style="font-size:14px;color:#00d4a0;letter-spacing:2px;">NEW WAITLIST SIGNUP — #${data.position}</span>
        </td></tr>
        <tr><td style="padding-top:24px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td style="padding:8px 0;color:#525e72;font-size:12px;letter-spacing:1px;">NAME</td>
                <td style="padding:8px 0;color:#e8eaf0;font-size:14px;">${data.full_name}</td></tr>
            <tr><td style="padding:8px 0;color:#525e72;font-size:12px;letter-spacing:1px;">EMAIL</td>
                <td style="padding:8px 0;color:#e8eaf0;font-size:14px;">${data.email}</td></tr>
            <tr><td style="padding:8px 0;color:#525e72;font-size:12px;letter-spacing:1px;">ROLE</td>
                <td style="padding:8px 0;color:#e8eaf0;font-size:14px;">${data.role}</td></tr>
            <tr><td style="padding:8px 0;color:#525e72;font-size:12px;letter-spacing:1px;">INTEREST</td>
                <td style="padding:8px 0;color:#e8eaf0;font-size:14px;">${data.interest_area}</td></tr>
            <tr><td style="padding:8px 0;color:#525e72;font-size:12px;letter-spacing:1px;">SOURCE</td>
                <td style="padding:8px 0;color:#e8eaf0;font-size:14px;">${data.referral_source || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#525e72;font-size:12px;letter-spacing:1px;">TIME</td>
                <td style="padding:8px 0;color:#e8eaf0;font-size:14px;">${new Date().toISOString()}</td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
