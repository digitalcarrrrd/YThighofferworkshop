import { NextRequest, NextResponse } from "next/server";

// In-memory / temporary receipt storage map
const receiptStore = new Map<string, { base64: string; mimeType: string; filename: string; timestamp: number }>();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { base64, filename } = body;

    if (!base64 || typeof base64 !== "string") {
      return NextResponse.json({ success: false, error: "Missing image data" }, { status: 400 });
    }

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

    return NextResponse.json({
      success: true,
      id,
      receiptUrl: `https://www.abrarnadir.com/api/receipt?id=${id}`,
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
      <head><title>Receipt View</title><meta name="viewport" content="width=device-width, initial-scale=1"></head>
      <body style="font-family:sans-serif;text-align:center;padding:40px;background:#0f172a;color:#f8fafc;">
        <h2>Payment Screenshot Received</h2>
        <p style="color:#94a3b8;font-size:14px;">The student has verified and attached this payment receipt directly to the WhatsApp verification desk (+92 329 6158206).</p>
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
