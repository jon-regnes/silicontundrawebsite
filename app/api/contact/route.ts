import { NextResponse } from "next/server";
import {
  createRateLimiter,
  destinationEmail,
  EMAIL_RE,
  escapeHtml,
  getClientIp,
  getTransporter,
} from "@/lib/mailer";

// Nodemailer needs the Node runtime (not edge). On Railway this runs in the
// persistent server, so the transporter and rate-limit state are reused.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ContactPayload {
  name?: string;
  email?: string;
  business?: string;
  message?: string;
  company?: string; // honeypot — real users never see or fill this
}

const isRateLimited = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again in a little while." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a bot filled the hidden field. Pretend success, send nothing.
  if (payload.company && payload.company.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const business = payload.business?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and a message." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }

  const mailer = getTransporter();
  const to = destinationEmail();
  if (!mailer || !to) {
    console.error("Contact form: missing GMAIL_USER/GMAIL_APP_PASSWORD env.");
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email us directly." },
      { status: 503 },
    );
  }

  try {
    await mailer.sendMail({
      from: `"Silicon Tundra Website" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `New contact form message from ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Business: ${business || "—"}`,
        "",
        message,
      ].join("\n"),
      html: `
        <h2>New contact form message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Business:</strong> ${escapeHtml(business) || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed:", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 },
    );
  }
}
