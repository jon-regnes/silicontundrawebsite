import nodemailer from "nodemailer";

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Where form submissions/leads are delivered. */
export function destinationEmail(): string | undefined {
  return process.env.CONTACT_DESTINATION_EMAIL ?? process.env.GMAIL_USER;
}

let transporter: nodemailer.Transporter | null = null;

/** Gmail/Workspace SMTP transporter, or null if env isn't configured. */
export function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;
  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
  return transporter;
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * In-memory sliding-window rate limiter. Each caller gets its own state.
 * Persistent on Railway's long-running process (would reset per-invocation on
 * serverless). Returns a function that records a hit and reports if over limit.
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>();
  return (ip: string): boolean => {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
    recent.push(now);
    hits.set(ip, recent);
    return recent.length > limit;
  };
}
