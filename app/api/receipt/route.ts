import { NextRequest, NextResponse } from "next/server";

// Global in-memory receipt storage map
const receiptStore = new Map<string, { base64: string; mimeType: string; filename: string; timestamp: number }>();

export function storeReceipt(base64: string, filename?: string): string {
  const id = `receipt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const mimeMatch = base64.match(/^data:(image\/[a-zA-Z+]+|application\/pdf);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/png";

  receiptStore.set(id, {
    base64,
    mimeType,
    filename: filename || "receipt.png",
    timestamp: Date.now(),
  });

  // Cleanup items older than 7 days
  const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  for (const [key, val] of receiptStore.entries()) {
    if (val.timestamp < sevenDaysAgo) {
      receiptStore.delete(key);
    }
  }

  return `https://www.abrarnadir.com/api/receipt?id=${id}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64, filename } = body;

    if (!base64 || typeof base64 !== "string") {
      return NextResponse.json({ success: false, error: "Missing image data" }, { status: 400 });
    }

    const receiptUrl = storeReceipt(base64, filename);
    const id = receiptUrl.split("id=")[1];

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

  if (!id || !receiptStore.has(id)) {
    return new NextResponse(
      `<!DOCTYPE html>
      <html>
      <head><title>Payment Receipt Verification</title><meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body style="font-family:sans-serif;text-align:center;padding:40px;background:#0f172a;color:#f8fafc;">
        <div style="max-width:500px;margin:40px auto;background:#1e293b;padding:30px;border-radius:16px;border:1px solid rgba(255,255,255,0.1);">
          <h2 style="color:#22c55e;margin-top:0;">Payment Verification Desk</h2>
          <p style="color:#cbd5e1;font-size:14px;line-height:1.6;">The student's payment receipt screenshot is recorded and routed directly to the WhatsApp verification manager at <b style="color:#ffffff;">+92 329 6158206</b>.</p>
          <a href="https://wa.me/923296158206" style="display:inline-block;background:#22c55e;color:#000000;font-weight:bold;padding:10px 20px;border-radius:8px;text-decoration:none;margin-top:10px;">Contact Manager on WhatsApp →</a>
        </div>
      </body>
      </html>`,
      { headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const receipt = receiptStore.get(id)!;
  const rawBase64 = receipt.base64.replace(/^data:[^;]+;base64,/, "");
  const buffer = Buffer.from(rawBase64, "base64");

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": receipt.mimeType,
      "Content-Disposition": `inline; filename="${receipt.filename}"`,
      "Cache-Control": "public, max-age=604800, immutable",
    },
  });
}
