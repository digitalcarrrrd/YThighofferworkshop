import { NextRequest, NextResponse } from "next/server";

/**
 * Proxy for GHL document downloads.
 * Usage: /api/ghl-doc/[docId]
 * Fetches the document from GHL with auth and serves it directly as an image.
 */

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ docId: string }> }
) {
  const { docId } = await params;
  
  if (!docId) {
    return NextResponse.json({ error: "Document ID required" }, { status: 400 });
  }

  const ghlToken = process.env.GHL_PRIVATE_INTEGRATION_TOKEN;
  if (!ghlToken) {
    return NextResponse.json({ error: "Not configured" }, { status: 500 });
  }

  try {
    const docRes = await fetch(
      `https://services.leadconnectorhq.com/documents/download/${docId}`,
      {
        headers: {
          Authorization: `Bearer ${ghlToken}`,
          Version: "2021-07-28",
        },
      }
    );

    if (!docRes.ok) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const contentType = docRes.headers.get("content-type") || "image/jpeg";
    const buffer = Buffer.from(await docRes.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="receipt_${docId}.jpg"`,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("GHL doc proxy error:", error);
    return NextResponse.json({ error: "Proxy error" }, { status: 500 });
  }
}
