const INK = '#221d23';
const PAPER = '#fefcfa';
const WHITE = '#ffffff';
const YELLOW = '#ffce00';
const PURPLE = '#623cea';
const MUTED = '#6e6870';
const LINE = '#e9e4e3';
const FOOTER = '#171317';

export const EMAIL_RECIPIENTS = ['team@nudgeable.ai', 'egauravpatel@gmail.com', 'work.nudgeable@gmail.com'] as const;

export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.nudgeable.ai').replace(/\/$/, '');
}

export function detailsTable(rows: Array<{ label: string; value: string }>) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;border-collapse:collapse;">
      ${rows.map((row, index) => `
        <tr>
          <td style="padding:${index === 0 ? '0' : '14px'} 0 12px;border-bottom:1px solid ${LINE};">
            <div style="font-size:11px;line-height:1;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${MUTED};">${escapeHtml(row.label)}</div>
            <div style="margin-top:8px;font-size:16px;line-height:1.45;font-weight:700;color:${INK};">${escapeHtml(row.value).replaceAll('\n', '<br />')}</div>
          </td>
        </tr>
      `).join('')}
    </table>
  `;
}

export function brandedEmail({
  preview,
  eyebrow,
  title,
  intro,
  bodyHtml,
  cta
}: {
  preview?: string;
  eyebrow: string;
  title: string;
  intro?: string;
  bodyHtml: string;
  cta?: { label: string; href: string };
}) {
  const base = siteUrl();
  const logo = `${base}/brand/nudgeable-black.png`;
  const previewText = preview || intro || title;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light">
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:${PAPER};color:${INK};font-family:Arial,Helvetica,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(previewText)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr>
      <td style="padding:28px 16px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
          <tr>
            <td style="padding:0 8px 18px;">
              <img src="${logo}" alt="Nudgeable" width="160" style="display:block;width:160px;height:auto;border:0;">
            </td>
          </tr>
          <tr>
            <td style="background:${WHITE};border:1px solid ${LINE};border-radius:22px;overflow:hidden;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="height:8px;background:${YELLOW};font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                  <td style="padding:32px 32px 12px;">
                    <div style="font-size:11px;line-height:1;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:${PURPLE};">
                      <span style="display:inline-block;width:18px;height:3px;background:${YELLOW};vertical-align:middle;margin-right:8px;"></span>${escapeHtml(eyebrow)}
                    </div>
                    <h1 style="margin:16px 0 0;font-size:32px;line-height:1.12;letter-spacing:-.04em;font-weight:700;color:${INK};">${escapeHtml(title)}</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 32px 36px;">
                    ${intro ? `<p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:${MUTED};">${escapeHtml(intro)}</p>` : ''}
                    ${bodyHtml}
                    ${cta ? `
                      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 6px;">
                        <tr>
                          <td style="background:${YELLOW};border:2px solid ${INK};border-radius:8px;box-shadow:3px 3px 0 ${INK};">
                            <a href="${cta.href}" style="display:inline-block;padding:13px 18px;font-size:12px;line-height:1;font-weight:800;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;color:${INK};">${escapeHtml(cta.label)}</a>
                          </td>
                        </tr>
                      </table>
                    ` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 8px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${FOOTER};border-radius:18px;">
                <tr>
                  <td style="padding:22px 24px 18px;">
                    <div style="font-size:18px;font-weight:800;letter-spacing:-.04em;color:${WHITE};">nudgeable</div>
                    <p style="margin:8px 0 14px;max-width:360px;font-size:12px;line-height:1.55;color:#918a91;">Practical AI for Work training and products for corporate capability building.</p>
                    <a href="${base}" style="color:${YELLOW};font-size:12px;font-weight:700;text-decoration:none;">www.nudgeable.ai</a>
                    <span style="color:#5d575e;font-size:12px;"> · </span>
                    <a href="mailto:team@nudgeable.ai" style="color:${YELLOW};font-size:12px;font-weight:700;text-decoration:none;">team@nudgeable.ai</a>
                  </td>
                </tr>
              </table>
              <p style="margin:14px 4px 0;font-size:11px;line-height:1.5;color:${MUTED};">AI for Work, made practical. You’re receiving this because you contacted or subscribed at nudgeable.ai.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
