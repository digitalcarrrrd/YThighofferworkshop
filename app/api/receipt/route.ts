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

const memoryStore = new Map<string, { base64: string; mimeType: string; filename: string }>();

export async function storeReceiptAsync(base64: string, filename?: string): Promise<string> {
  ensureDir();
  const cleanId = `rec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const mimeMatch = base64.match(/^data:(image\/[a-zA-Z+]+|application\/pdf);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const ext = mimeType.includes("pdf") ? "pdf" : mimeType.includes("png") ? "png" : "jpg";

  const rawData = base64.replace(/^data:[^;]+;base64,/, "");

  // 1. Save to local temp buffer
  try {
    const filePath = path.join(TEMP_DIR, `${cleanId}.${ext}`);
    fs.writeFileSync(filePath, Buffer.from(rawData, "base64"));
  } catch (e) {
    console.warn("File write note:", e);
  }

  memoryStore.set(cleanId, {
    base64: rawData,
    mimeType,
    filename: filename || `receipt_${cleanId}.${ext}`,
  });

  // 2. Try upload to Free Permanent Image CDN (ImgBB)
  try {
    const formData = new FormData();
    formData.append("image", rawData);
    const imgbbRes = await fetch("https://api.imgbb.com/1/upload?key=8e68407f1543be8e5616f73315a6bfa9", {
      method: "POST",
      body: formData,
    });
    const imgbbData = await imgbbRes.json();
    if (imgbbData?.data?.url) {
      return imgbbData.data.url;
    }
  } catch (cdnErr) {
    console.warn("CDN upload fallback:", cdnErr);
  }

  return `https://www.abrarnadir.com/api/receipt?id=${cleanId}&ext=${ext}`;
}

export function storeReceipt(base64: string, filename?: string): string {
  ensureDir();
  const cleanId = `rec_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const mimeMatch = base64.match(/^data:(image\/[a-zA-Z+]+|application\/pdf);base64,/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
  const ext = mimeType.includes("pdf") ? "pdf" : mimeType.includes("png") ? "png" : "jpg";
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
    filename: filename || `receipt_${cleanId}.${ext}`,
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

    const receiptUrl = await storeReceiptAsync(base64, filename);

    return NextResponse.json({
      success: true,
      receiptUrl,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const ext = searchParams.get("ext") || "jpg";

  if (!id) {
    return new NextResponse("Receipt ID is required.", { status: 400 });
  }

  ensureDir();
  const filePath = path.join(TEMP_DIR, `${id}.${ext}`);
  const mimeType = ext === "pdf" ? "application/pdf" : ext === "png" ? "image/png" : "image/jpeg";

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

  // Try GHL document proxy — search for document by receipt ID
  const ghlToken = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  if (ghlToken) {
    try {
      // Try common document IDs from GHL custom fields
      // The receipt ID pattern contains a timestamp we can match
      const docSearchUrls = [
        `https://services.leadconnectorhq.com/documents/download/${id}`,
      ];
      
      for (const docUrl of docSearchUrls) {
        const docRes = await fetch(docUrl, {
          headers: {
            Authorization: `Bearer ${ghlToken}`,
            Version: "2021-07-28",
          },
        });
        
        if (docRes.ok) {
          const contentType = docRes.headers.get("content-type") || mimeType;
          const buffer = Buffer.from(await docRes.arrayBuffer());
          if (buffer.length > 100) {
            return new NextResponse(buffer, {
              headers: {
                "Content-Type": contentType,
                "Content-Disposition": `inline; filename="receipt_${id}.${ext}"`,
                "Cache-Control": "public, max-age=86400",
              },
            });
          }
        }
      }
    } catch (proxyErr) {
      console.warn("GHL document proxy error:", proxyErr);
    }
  }

  // Visual Fallback Display
  return new NextResponse(
    `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Screenshot — Abrar Nadir</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0B100C; color: #F8FAFC; margin: 0; padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
        .card { max-width: 520px; width: 100%; background: #111913; border: 1px solid rgba(47,217,126,0.3); border-radius: 20px; padding: 32px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .badge { display: inline-block; background: rgba(47,217,126,0.15); color: #2FD97E; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px; border: 1px solid rgba(47,217,126,0.3); }
        h2 { font-size: 22px; font-weight: 900; margin: 0 0 10px; color: #FFFFFF; }
        p { font-size: 14px; color: #94A3B8; line-height: 1.6; margin: 0 0 24px; }
        .btn { display: inline-block; background: #25D366; color: #FFFFFF; font-weight: 800; font-size: 14px; padding: 14px 28px; border-radius: 12px; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="badge">Payment Receipt</div>
        <h2>Receipt Expired or Not Found</h2>
        <p>This payment screenshot was uploaded during workshop registration but the temporary link has expired. The original screenshot is stored in GoHighLevel CRM under the contact's custom fields and notes.</p>
        <a href="https://wa.me/923266641695" class="btn" target="_blank">Contact Support on WhatsApp →</a>
      </div>
    </body>
    </html>`,
    {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    }
  );
}
