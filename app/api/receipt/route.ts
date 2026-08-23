import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";

const TEMP_DIR = path.join(os.tmpdir(), "yteb_receipts");

function ensureDir() {
  try {
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR, { recursive: true });
    }
  } catch (e) {
    console.warn("Temp dir creation note:", e);
  }
}

// Global in-memory map as supplementary buffer
const memoryStore = new Map<string, { base64: string; mimeType: string; filename: string }>();

export function storeReceipt(base64: string, filename?: string): string {
  ensureDir();
  const cleanId = `rec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const mimeMatch = base64.match(/^data:(image\/[a-zA-Z+]+|application\/pdf);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/png";
  const ext = mimeType.includes("pdf") ? "pdf" : mimeType.includes("jpeg") || mimeType.includes("jpg") ? "jpg" : "png";

  const rawData = base64.replace(/^data:[^;]+;base64,/, "");

  try {
    const filePath = path.join(TEMP_DIR, `${cleanId}.${ext}`);
    fs.writeFileSync(filePath, Buffer.from(rawData, "base64"));
  } catch (e) {
    console.warn("File write note:", e);
  }

  memoryStore.set(cleanId, {
    base64: rawData,
    mimeType,
    filename: filename || `payment_screenshot.${ext}`,
  });

  return `https://www.abrarnadir.com/api/receipt?id=${cleanId}&ext=${ext}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64, filename } = body;

    if (!base64 || typeof base64 !== "string") {
      return NextResponse.json({ success: false, error: "Missing image data" }, { status: 400 });
    }

    const receiptUrl = storeReceipt(base64, filename);
    const id = new URL(receiptUrl).searchParams.get("id");

    return NextResponse.json({
      success: true,
      id,
      receiptUrl,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const ext = searchParams.get("ext") || "png";

  if (!id) {
    return new NextResponse("Receipt ID is required.", { status: 400 });
  }

  ensureDir();
  const filePath = path.join(TEMP_DIR, `${id}.${ext}`);
  const mimeType = ext === "pdf" ? "application/pdf" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";

  // Check file on disk
  if (fs.existsSync(filePath)) {
    try {
      const buffer = fs.readFileSync(filePath);
      return new NextResponse(buffer, {
        headers: {
          "Content-Type": mimeType,
          "Content-Disposition": `inline; filename="receipt_${id}.${ext}"`,
          "Cache-Control": "public, max-age=86400",
        },
      });
    } catch (e) {
      console.warn("File read note:", e);
    }
  }

  // Check memory buffer
  if (memoryStore.has(id)) {
    const item = memoryStore.get(id)!;
    const buffer = Buffer.from(item.base64, "base64");
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": item.mimeType,
        "Content-Disposition": `inline; filename="${item.filename}"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  }

  // Visual Fallback Display
  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Screenshot Verification</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B100C; color: #F8FAFC; margin: 0; padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { max-width: 520px; width: 100%; background: #111913; border: 1px solid rgba(47,217,126,0.3); border-radius: 20px; padding: 32px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .badge { display: inline-block; background: rgba(47,217,126,0.15); color: #2FD97E; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; border: 1px solid rgba(47,217,126,0.3); }
        h2 { font-size: 20px; font-weight: 900; margin: 0 0 10px; color: #FFFFFF; }
        p { font-size: 13px; color: #94A3B8; line-height: 1.6; margin: 0 0 24px; }
        .btn { display: inline-block; background: #25D366; color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 12px 24px; border-radius: 12px; text-decoration: none; transition: transform 0.2s; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">Payment Receipt Logged</div>
        <h2>Payment Screenshot Received</h2>
        <p>The student attached this payment receipt during enrollment. The image is also transmitted directly to Abrar's WhatsApp chat at <b>+92 329 6158206</b>.</p>
        <a href="https://wa.me/923296158206" class="btn" target="_blank">Open Verification Chat on WhatsApp →</a>
      </div>
    </body>
    </html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
