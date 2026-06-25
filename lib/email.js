// SendGrid email helper for YANUSH Cars
// Non-blocking: errors are logged but never throw to caller
import sgMail from '@sendgrid/mail';

const API_KEY = process.env.SENDGRID_API_KEY;
const FROM = process.env.SENDGRID_FROM_EMAIL;
const NOTIFY = process.env.NOTIFY_EMAIL || 'yanush.cars@gmail.com';

if (API_KEY) {
  try { sgMail.setApiKey(API_KEY); } catch (e) { console.error('SendGrid init error:', e.message); }
}

const isEnabled = () => Boolean(API_KEY && FROM);

// YANUSH-styled HTML wrapper (black/gold)
const wrapHtml = (title, bodyHtml) => `
<!doctype html>
<html><body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0a0a;padding:30px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#111;border:1px solid #d4af37;border-radius:12px;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#f3d57a 0%,#d4af37 50%,#b8860b 100%);padding:20px 30px;text-align:center;">
          <h1 style="margin:0;color:#000;font-size:24px;letter-spacing:2px;">YANUSH CARS</h1>
          <div style="color:#000;font-size:11px;letter-spacing:3px;margin-top:4px;">PREMIUM AUTOMOTIVE SELECTION</div>
        </td></tr>
        <tr><td style="padding:30px;">
          <h2 style="color:#d4af37;margin-top:0;border-bottom:1px solid #d4af37;padding-bottom:10px;">${title}</h2>
          ${bodyHtml}
        </td></tr>
        <tr><td style="background:#000;padding:20px 30px;text-align:center;color:#666;font-size:11px;border-top:1px solid #d4af37;">
          YANUSH Cars · Bierstal 48, 9920 Lievegem · +32 465 81 98 42
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const row = (label, value) => value ? `
  <tr>
    <td style="padding:8px 0;color:#888;font-size:13px;width:140px;vertical-align:top;">${label}</td>
    <td style="padding:8px 0;color:#fff;font-size:14px;font-weight:bold;">${value}</td>
  </tr>` : '';

const escape = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Convert base64 data URLs to SendGrid attachment objects (max 8, total <25MB)
const buildAttachments = (images) => {
  if (!Array.isArray(images)) return [];
  const out = [];
  let totalBytes = 0;
  const MAX_TOTAL = 22 * 1024 * 1024; // 22MB safety budget
  images.slice(0, 8).forEach((img, i) => {
    if (typeof img !== 'string' || !img.startsWith('data:')) return;
    const match = img.match(/^data:(image\/[a-zA-Z0-9+.-]+);base64,(.+)$/);
    if (!match) return;
    const mime = match[1];
    const b64 = match[2];
    const bytes = Math.floor(b64.length * 0.75);
    if (totalBytes + bytes > MAX_TOTAL) return;
    totalBytes += bytes;
    const ext = mime.split('/')[1].split('+')[0] || 'jpg';
    out.push({
      content: b64,
      filename: `foto-${i + 1}.${ext}`,
      type: mime,
      disposition: 'attachment',
    });
  });
  return out;
};

export const sendContactEmail = async (data) => {
  if (!isEnabled()) { console.warn('[email] SendGrid not configured, skipping'); return { sent: false }; }
  try {
    const body = `
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        ${row('Naam', escape(data.name))}
        ${row('Email', `<a href="mailto:${escape(data.email)}" style="color:#d4af37;">${escape(data.email)}</a>`)}
      </table>
      <div style="margin-top:20px;padding:15px;background:#1a1a1a;border-left:3px solid #d4af37;border-radius:4px;">
        <div style="color:#888;font-size:11px;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Bericht</div>
        <div style="color:#fff;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escape(data.message)}</div>
      </div>
      <p style="color:#666;font-size:12px;margin-top:25px;">Ontvangen via het contactformulier op yanushcars.be</p>
    `;
    await sgMail.send({
      to: NOTIFY,
      from: { email: FROM, name: 'YANUSH Cars Website' },
      replyTo: data.email || undefined,
      subject: `📩 Nieuw contactbericht van ${data.name || 'onbekend'}`,
      html: wrapHtml('Nieuw Contactbericht', body),
    });
    return { sent: true };
  } catch (e) {
    console.error('[email] contact send failed:', e.response?.body || e.message);
    return { sent: false, error: e.message };
  }
};

export const sendSellRequestEmail = async (data) => {
  if (!isEnabled()) { console.warn('[email] SendGrid not configured, skipping'); return { sent: false }; }
  try {
    const waLink = data.phone ? `https://wa.me/${String(data.phone).replace(/\D/g, '')}` : '';
    const body = `
      <p style="color:#fff;font-size:14px;margin:0 0 20px;">Een klant wil een voertuig verkopen aan YANUSH Cars.</p>
      <h3 style="color:#d4af37;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;margin:20px 0 10px;">Contactgegevens</h3>
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        ${row('Naam', escape(data.name))}
        ${row('Telefoon', `<a href="tel:${escape(data.phone)}" style="color:#d4af37;">${escape(data.phone)}</a>${waLink ? ` · <a href="${waLink}" style="color:#25D366;">WhatsApp</a>` : ''}`)}
        ${row('Email', data.email ? `<a href="mailto:${escape(data.email)}" style="color:#d4af37;">${escape(data.email)}</a>` : '')}
      </table>
      <h3 style="color:#d4af37;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;margin:25px 0 10px;">Voertuig</h3>
      <table cellpadding="0" cellspacing="0" style="width:100%;">
        ${row('Merk', escape(data.brand))}
        ${row('Model', escape(data.model))}
        ${row('Jaar', escape(data.year))}
        ${row('Kilometerstand', escape(data.mileage))}
      </table>
      ${data.message ? `
        <h3 style="color:#d4af37;font-size:14px;text-transform:uppercase;letter-spacing:1.5px;margin:25px 0 10px;">Beschrijving / Staat</h3>
        <div style="padding:15px;background:#1a1a1a;border-left:3px solid #d4af37;border-radius:4px;color:#fff;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escape(data.message)}</div>
      ` : ''}
      ${data.images?.length ? `<p style="color:#888;font-size:12px;margin-top:25px;">📎 ${data.images.length} foto(s) toegevoegd als bijlage.</p>` : ''}
    `;
    await sgMail.send({
      to: NOTIFY,
      from: { email: FROM, name: 'YANUSH Cars Website' },
      replyTo: data.email || undefined,
      subject: `🚗 Verkoopaanvraag: ${data.brand || ''} ${data.model || ''} (${data.year || ''}) — ${data.name || ''}`,
      html: wrapHtml('Nieuwe Verkoopaanvraag', body),
      attachments: buildAttachments(data.images),
    });
    return { sent: true };
  } catch (e) {
    console.error('[email] sell-request send failed:', e.response?.body || e.message);
    return { sent: false, error: e.message };
  }
};
