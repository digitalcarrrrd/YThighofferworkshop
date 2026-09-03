import { NextRequest, NextResponse } from "next/server";
import { ghlClient } from "@/lib/ghlClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("GHL Webhook Payload received:", JSON.stringify(body));

    // Extract Contact & Opportunity details from various GHL payload structures
    const contactId = body.contact_id || body.contactId || body.contact?.id || body.id;
    const email = body.email || body.contact?.email || body.contact_email;
    const name = body.first_name || body.name || body.contact?.first_name || body.contact?.name || body.full_name || "Student";
    const phone = body.phone || body.contact?.phone;
    const stageName = (body.stage_name || body.stage || body.pipeline_stage || body.status || "").toLowerCase();
    const lmsUrl = "https://lms.abrarnadir.com";

    if (!contactId && !email) {
      return NextResponse.json({ success: false, error: "Missing contact identifier" }, { status: 400 });
    }

    // 1. Send Payment Verified & LMS Unlocked Email
    if (email) {
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0B100C; color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #2FD97E;">
          <div style="display: inline-block; background: rgba(47,217,126,0.15); border: 1px solid #2FD97E; color: #2FD97E; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px;">
            ✓ Payment Verified & Enrolled
          </div>
          <h2 style="color: #2FD97E; margin-top: 0; font-size: 24px;">Welcome to YT Empire Builders, ${name}!</h2>
          <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">Aap ki payment verify ho chuki hai and your official curriculum access is unlocked.</p>
          
          <div style="background: rgba(47, 217, 126, 0.08); border: 1px solid rgba(47,217,126,0.3); padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
            <h3 style="margin-top: 0; color: #2FD97E; font-size: 16px;">🚀 Access Your Learning Portal (LMS):</h3>
            <p style="margin-bottom: 16px; color: #94A3B8; font-size: 13px;">Login with your registered email to start your 12 core modules:</p>
            <a href="${lmsUrl}" style="display: inline-block; background: #2FD97E; color: #04220F; font-weight: 900; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none;">Open LMS Portal (lms.abrarnadir.com) →</a>
          </div>

          <h4 style="color: #FFFFFF; font-size: 14px; margin-bottom: 8px;">What To Do Next:</h4>
          <ul style="color: #94A3B8; font-size: 13px; padding-left: 20px; line-height: 1.8;">
            <li>Log in to <a href="${lmsUrl}" style="color: #2FD97E;">lms.abrarnadir.com</a> and watch Module 01</li>
            <li>Download the 50+ High-RPM AI Prompts Swipe File</li>
            <li>Fill your 90-Day Channel Content Calendar</li>
            <li>Connect directly with Abrar on WhatsApp for VIP onboarding</li>
          </ul>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="font-size: 13px; color: #94A3B8; margin: 0 0 10px;">Direct WhatsApp Support: <b style="color: #FFFFFF;">+92 329 6158206</b></p>
            <p style="font-size: 13px; color: #94A3B8; margin: 0;">Shukriya,<br><b style="color: #FFFFFF;">Abrar Nadir</b><br>Founder, YT Empire Builders</p>
          </div>
        </div>
      `;

      await ghlClient.sendEmail(
        contactId,
        email,
        "🎉 Payment Verified! Access Your YT Empire Builders LMS & Community",
        emailHtml
      ).catch((err) => console.warn("Webhook sendEmail note:", err));
    }

    // 2. Send Automated WhatsApp Message via GHL using approved template
    if (contactId) {
      const waMsg = `Hello ${name}, your payment has been verified! Welcome to YouTube Empire Builders Live Workshop.`;
      await ghlClient.sendWhatsApp(contactId, waMsg, "yt_payment_verified_details").catch((err) => console.warn("Webhook sendWhatsApp note:", err));
    }

    // 3. Add Note in GHL
    if (contactId) {
      await ghlClient.addNote(
        contactId,
        `✅ AUTOMATED CONFIRMATION DISPATCHED:\n• Payment verification email sent to: ${email || "N/A"}\n• Automated WhatsApp sent to: ${phone || "N/A"}\n• LMS Portal Link: ${lmsUrl}\n• Dispatched At: ${new Date().toISOString()}`
      ).catch((err) => console.warn("Webhook addNote note:", err));
    }

    return NextResponse.json({
      success: true,
      message: "Automated payment verification email and WhatsApp dispatched successfully.",
      lmsUrl,
    });
  } catch (error) {
    console.error("GHL Webhook processing error:", error);
    return NextResponse.json({ success: false, error: "Internal webhook processing error" }, { status: 500 });
  }
}
