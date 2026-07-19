import { NextResponse } from "next/server";

/**
 * Placeholder until the Kit (ConvertKit) integration is wired up in build-order
 * item 7 — see §7.2 of silicon-tundra-architecture.md.
 */
export async function POST() {
  return NextResponse.json(
    { error: "Newsletter signup isn't live yet — check back soon." },
    { status: 503 },
  );
}
