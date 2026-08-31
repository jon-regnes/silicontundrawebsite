"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "loading" | "success" | "error";

export function EbookForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function startDownload(url: string) {
    const a = document.createElement("a");
    a.href = url;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setError("");

    const data = new FormData(event.currentTarget);
    try {
      const res = await fetch("/api/ebook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          company: data.get("company"), // honeypot
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.download) {
        startDownload(body.download);
        setStatus("success");
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
      <div className="rounded-sm border border-accent/40 bg-surface p-6">
        <h3 className="font-heading text-lg font-semibold text-accent">
          Your download is starting
        </h3>
        <p className="mt-2 text-sm text-muted">
          We&apos;ve also emailed you the link so you have it handy. If the
          download didn&apos;t start,{" "}
          <a
            href="/api/ebook/download"
            className="font-medium text-accent hover:text-accent-hover"
          >
            click here to download the PDF
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="eb-company">Company (leave blank)</label>
        <input
          id="eb-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="eb-email" className="sr-only">
          Email address
        </label>
        <input
          id="eb-email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@yourbusiness.com"
          className="w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Sending…" : "Download the ebook"}
        </Button>
      </div>
      <p className="mt-3 text-xs text-muted">
        Free PDF. We&apos;ll email you the link — no spam, unsubscribe anytime.
      </p>
      {status === "error" && (
        <p className="mt-3 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
