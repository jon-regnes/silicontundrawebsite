import { NextResponse } from "next/server";
import {
  createRateLimiter,
  destinationEmail,
  EMAIL_RE,
  escapeHtml,
  getClientIp,
  getTransporter,
} from "@/lib/mailer";
import { absoluteUrl } from "@/lib/seo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface EbookPayload {
  email?: string;
  company?: string; // honeypot
}

const EBOOK_TITLE = "From ChatGPT Curiosity to Operational Leverage";
const DOWNLOAD_PATH = "/api/ebook/download";

const isRateLimited = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in a little while." },
      { status: 429 },
    );
  }

  let payload: EbookPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bot filled the hidden field. Pretend success, send nothing.
  if (payload.company && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true, download: DOWNLOAD_PATH });
  }

  const email = payload.email?.trim() ?? "";
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const mailer = getTransporter();
  const to = destinationEmail();
  if (!mailer || !to) {
    console.error("Ebook form: missing GMAIL_USER/GMAIL_APP_PASSWORD env.");
    // Still let them download — the email is a bonus, not a blocker.
    return NextResponse.json({ ok: true, download: DOWNLOAD_PATH });
  }

  const downloadUrl = absoluteUrl(DOWNLOAD_PATH);

  // Notify Jon of the new lead (fire-and-forget; don't block the download on it).
  const notify = mailer.sendMail({
    from: `"Silicon Tundra Website" <${process.env.GMAIL_USER}>`,
    to,
    subject: `New ebook download: ${email}`,
    text: `New ebook lead.\n\nEmail: ${email}\nEbook: ${EBOOK_TITLE}\nTime: ${new Date().toISOString()}`,
    html: `<h2>New ebook lead</h2>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Ebook:</strong> ${escapeHtml(EBOOK_TITLE)}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString("en-US")}</p>`,
  });

  // Send the reader the download link.
  const deliver = mailer.sendMail({
    from: `"Silicon Tundra" <${process.env.GMAIL_USER}>`,
    to: email,
    replyTo: to,
    subject: `Your free ebook: ${EBOOK_TITLE}`,
    text: [
      `Thanks for grabbing "${EBOOK_TITLE}."`,
      "",
      `Download it here: ${downloadUrl}`,
      "",
      "It's a practical guide to moving past one-off prompting and putting AI to work in your business. If you'd like to talk through where it fits for you, just reply to this email or book a call: " +
        absoluteUrl("/book"),
      "",
      "— Silicon Tundra",
    ].join("\n"),
    html: `
      <p>Thanks for grabbing <strong>${escapeHtml(EBOOK_TITLE)}</strong>.</p>
      <p><a href="${downloadUrl}">Download your copy (PDF)</a></p>
      <p>It's a practical guide to moving past one-off prompting and putting AI to work in your business. If you'd like to talk through where it fits, just reply to this email or <a href="${absoluteUrl("/book")}">book a call</a>.</p>
      <p>— Silicon Tundra</p>
    `,
  });

  try {
    await Promise.allSettled([notify, deliver]);
  } catch (err) {
    console.error("Ebook email send issue:", err);
    // Non-fatal — the reader still gets the on-page download.
  }

  return NextResponse.json({ ok: true, download: DOWNLOAD_PATH });
}
