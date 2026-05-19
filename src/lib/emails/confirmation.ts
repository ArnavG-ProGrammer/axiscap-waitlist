export function confirmationEmail(name: string, position: number): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin:0;padding:0;background:#000;font-family:'Space Grotesk',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#000;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#0a0c0f;border:1px solid #1e2330;border-radius:4px;padding:48px 40px;">
        <tr><td align="center" style="padding-bottom:32px;">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:24px;font-weight:600;color:#00d4a0;letter-spacing:4px;">AXISCAP</span>
        </td></tr>
        <tr><td align="center" style="padding-bottom:16px;">
          <span style="font-size:36px;font-weight:300;color:#e8eaf0;">Welcome.</span>
        </td></tr>
        <tr><td align="center" style="padding-bottom:8px;">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:15px;color:#8892a4;">Hi ${name},</span>
        </td></tr>
        <tr><td align="center" style="padding-bottom:32px;">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:15px;color:#8892a4;line-height:1.6;">
            You're <strong style="color:#00d4a0;font-size:20px;">#${position}</strong> on the AXISCAP waitlist.
          </span>
        </td></tr>
        <tr><td align="center" style="padding-bottom:32px;">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:13px;color:#525e72;line-height:1.6;">
            We'll notify you the moment your access opens.<br/>
            In the meantime, follow us on Twitter and LinkedIn for updates.
          </span>
        </td></tr>
        <tr><td align="center" style="border-top:1px solid #1e2330;padding-top:24px;">
          <span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#525e72;letter-spacing:2px;">
            DATA × INTELLIGENCE
          </span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
