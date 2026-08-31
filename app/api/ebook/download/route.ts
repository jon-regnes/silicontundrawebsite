import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const PDF_PATH = path.join(
  process.cwd(),
  "content/ebook/from-chatgpt-curiosity-to-operational-leverage.pdf",
);
const DOWNLOAD_NAME =
  "From ChatGPT Curiosity to Operational Leverage.pdf";

export async function GET() {
  try {
    const file = await fs.promises.readFile(PDF_PATH);
    return new NextResponse(new Uint8Array(file), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${DOWNLOAD_NAME}"`,
        "Content-Length": String(file.length),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error("Ebook download failed:", err);
    return NextResponse.json(
      { error: "The ebook is temporarily unavailable." },
      { status: 404 },
    );
  }
}
