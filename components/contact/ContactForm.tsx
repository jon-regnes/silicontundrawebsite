"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

const inputClasses =
  "w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none";
const labelClasses =
  "mb-2 block text-sm font-medium text-foreground";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      business: data.get("business"),
      message: data.get("message"),
      company: data.get("company"), // honeypot
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(body.error ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-accent/40 bg-surface p-8">
        <h2 className="font-heading text-xl font-semibold text-accent">
          Message sent
        </h2>
        <p className="mt-2 text-muted">
          Thanks for reaching out — we&apos;ll get back to you shortly. In the
          meantime, feel free to{" "}
          <a
            href="/book"
            className="font-medium text-accent hover:text-accent-hover"
          >
            book a discovery call
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      {/* Honeypot — hidden from users, catches bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company (leave blank)</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClasses}>
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="business" className={labelClasses}>
          Business name
        </label>
        <input
          id="business"
          name="business"
          type="text"
          autoComplete="organization"
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClasses}>
          How can we help? <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className={`${inputClasses} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Send message"}
        </Button>
        {status === "error" && (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
