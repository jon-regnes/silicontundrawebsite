"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function CopyPromptButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — nothing useful to do.
    }
  }

  return (
    <Button onClick={handleCopy} aria-live="polite">
      {copied ? "Copied!" : "Copy prompt"}
    </Button>
  );
}
