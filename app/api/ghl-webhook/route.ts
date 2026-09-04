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
    const stageName = (body.stage_name || body.stage || body.pipeline_stage || body.pipelineStageName || body.status || "").toLowerCase();
    const pipelineStageId = body.pipelineStageId || body.pipeline_stage_id || "";
    const step = (body.step || body.action || body.template || "").toLowerCase();
    
    // If stage name or ID indicates "Payment Confirmed", force step to confirmed
    const isPaymentConfirmed = 
      stageName.includes("confirmed") || 
      stageName.includes("verified") || 
      pipelineStageId === "0ad7cb14-6f9c-4a9c-ba9a-2b3a015cfeee" ||
      step.includes("confirmed") || 
      step.includes("verified");
    const effectiveStep = isPaymentConfirmed ? "confirmed" : (step || stageName);
    const lmsUrl = "https://lms.abrarnadir.com";
    const workshopName = body.workshop_name || body.workshop || "YouTube Empire Builders Live Workshop";
    const zoomLink = body.zoom_link || "https://lms.abrarnadir.com";

    if (!contactId && !email && !phone) {
      return NextResponse.json({ success: false, error: "Missing contact identifier" }, { status: 400 });
    }

    // ----------------------------------------------------
    // TEMPLATE 1: PAYMENT PENDING (Lead captured, payment missing)
    // ----------------------------------------------------
    if (effectiveStep.includes("pending") || effectiveStep.includes("interest") || effectiveStep.includes("reserve")) {
      const waMsg = `Hi ${name}, thank you for your interest in the ${workshopName}! Your seat is reserved. Please complete your fee of PKR 1,999 via Meezan Bank or Easypaisa and reply with your screenshot here to confirm your seat.`;
      if (contactId) {
        await ghlClient.sendWhatsApp(contactId, waMsg, "yt_interest_payment_pending").catch(console.warn);
      }
      if (email && contactId) {
        const pendingEmail = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0B100C; color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #EAB308;">
            <div style="display: inline-block; background: rgba(234,179,8,0.15); border: 1px solid #EAB308; color: #EAB308; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px;">
              ⏳ Seat Reserved — Payment Pending
            </div>
            <h2 style="color: #EAB308; margin-top: 0; font-size: 24px;">Hi ${name}! Complete Your Registration</h2>
            <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">Thank you for registering for <b>${workshopName}</b>. Your seat is temporarily reserved.</p>
            <div style="background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.3); padding: 20px; border-radius: 12px; margin: 24px 0;">
              <h3 style="margin-top: 0; color: #EAB308; font-size: 16px;">💳 Official Payment Accounts (Fee: PKR 1,999):</h3>
              <p style="margin: 6px 0; color: #FFFFFF; font-size: 14px;">• <b>Meezan Bank:</b> 02370103321036 (Muhammad Abrar)</p>
              <p style="margin: 6px 0; color: #FFFFFF; font-size: 14px;">• <b>Easypaisa:</b> 03274532186 (Muhammad Abrar Ghauri)</p>
            </div>
            <p style="color: #94A3B8; font-size: 13px;">Payment ke baad screenshot WhatsApp (+92 326 6641695) par reply karein taake confirmed access grant kiya ja sake.</p>
          </div>
        `;
        await ghlClient.sendEmail(contactId, email, `⏳ Complete Your Seat Reservation — ${workshopName}`, pendingEmail).catch(console.warn);
      }
      return NextResponse.json({ success: true, template: "yt_interest_payment_pending" });
    }

    // ----------------------------------------------------
    // TEMPLATE 3: 15-MINUTE REMINDER (Before event)
    // ----------------------------------------------------
    if (effectiveStep.includes("15min") || effectiveStep.includes("reminder") || effectiveStep.includes("class")) {
      const waMsg = `Hello ${name}, your live class starts in 15 minutes! Please click the link to join the live room now: ${zoomLink}`;
      if (contactId) {
        await ghlClient.sendWhatsApp(contactId, waMsg, "yt_15min_class_reminder").catch(console.warn);
      }
      if (email && contactId) {
        const reminderEmail = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0B100C; color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #EF4444;">
            <div style="display: inline-block; background: rgba(239,68,68,0.15); border: 1px solid #EF4444; color: #EF4444; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px;">
              🔴 Live Room Starting in 15 Minutes
            </div>
            <h2 style="color: #FFFFFF; margin-top: 0; font-size: 24px;">Class Is About To Begin, ${name}!</h2>
            <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">${workshopName} live room is now open. We are starting in 15 minutes.</p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="${zoomLink}" style="display: inline-block; background: #EF4444; color: #FFFFFF; font-weight: 900; font-size: 16px; padding: 14px 32px; border-radius: 10px; text-decoration: none;">JOIN LIVE ROOM NOW →</a>
            </div>
          </div>
        `;
        await ghlClient.sendEmail(contactId, email, `🔴 Starting In 15 Minutes: ${workshopName}`, reminderEmail).catch(console.warn);
      }
      return NextResponse.json({ success: true, template: "yt_15min_class_reminder" });
    }

    // ----------------------------------------------------
    // TEMPLATE 4: VIP UPSELL (After event)
    // ----------------------------------------------------
    if (effectiveStep.includes("upsell") || effectiveStep.includes("vip") || effectiveStep.includes("accelerator")) {
      const waMsg = `Hi ${name}, congratulations on attending the live workshop! Ready to build a 100-channel automation empire with 1-on-1 mentorship? Check our VIP Executive Accelerator: https://www.abrarnadir.com/ytempirebuilder`;
      if (contactId) {
        await ghlClient.sendWhatsApp(contactId, waMsg, "yt_workshop_vip_upsell").catch(console.warn);
      }
      if (email && contactId) {
        const upsellEmail = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0B100C; color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #2FD97E;">
            <div style="display: inline-block; background: rgba(47,217,126,0.15); border: 1px solid #2FD97E; color: #2FD97E; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px;">
              ⭐ Next Step: Scale to 10 Cr
            </div>
            <h2 style="color: #FFFFFF; margin-top: 0; font-size: 24px;">Congratulations, ${name}!</h2>
            <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">Now that you understand the mechanics of YouTube Automation, apply to our 1-on-1 VIP Executive Portfolio program.</p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="https://www.abrarnadir.com/ytempirebuilder" style="display: inline-block; background: #2FD97E; color: #04220F; font-weight: 900; font-size: 16px; padding: 14px 32px; border-radius: 10px; text-decoration: none;">Apply for VIP Executive Accelerator →</a>
            </div>
          </div>
        `;
        await ghlClient.sendEmail(contactId, email, `🚀 Next Step: Scale Your YouTube Empire with Abrar Nadir`, upsellEmail).catch(console.warn);
      }
      return NextResponse.json({ success: true, template: "yt_workshop_vip_upsell" });
    }

    // ----------------------------------------------------
    // DEFAULT / TEMPLATE 2: PAYMENT VERIFIED & DETAILS (Confirmed)
    // ----------------------------------------------------
    if (email && contactId) {
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0B100C; color: #FFFFFF; padding: 32px; border-radius: 16px; border: 1px solid #2FD97E;">
          <div style="display: inline-block; background: rgba(47,217,126,0.15); border: 1px solid #2FD97E; color: #2FD97E; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; margin-bottom: 16px;">
            ✓ Payment Verified & Enrolled
          </div>
          <h2 style="color: #2FD97E; margin-top: 0; font-size: 24px;">Welcome to ${workshopName}, ${name}!</h2>
          <p style="color: #E2E8F0; font-size: 14px; line-height: 1.6;">Aap ki payment verify ho chuki hai and your official access is unlocked.</p>
          <div style="background: rgba(47, 217, 126, 0.08); border: 1px solid rgba(47,217,126,0.3); padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
            <h3 style="margin-top: 0; color: #2FD97E; font-size: 16px;">🚀 Access Learning Portal (LMS):</h3>
            <p style="margin-bottom: 16px; color: #94A3B8; font-size: 13px;">Login with your registered email to start your 12 core modules:</p>
            <a href="${lmsUrl}" style="display: inline-block; background: #2FD97E; color: #04220F; font-weight: 900; font-size: 14px; padding: 12px 28px; border-radius: 10px; text-decoration: none;">Open LMS Portal (lms.abrarnadir.com) →</a>
          </div>
          <p style="font-size: 13px; color: #94A3B8;">Live Session Link: <a href="${zoomLink}" style="color: #2FD97E;">${zoomLink}</a></p>
          <p style="font-size: 13px; color: #94A3B8;">Direct WhatsApp Support: <b style="color: #FFFFFF;">+92 326 6641695</b></p>
        </div>
      `;
      await ghlClient.sendEmail(contactId, email, `🎉 Payment Verified & Seat Confirmed! — ${workshopName}`, emailHtml).catch(console.warn);
    }

    if (contactId) {
      const waMsg = `Hello ${name}, your payment of PKR 1,999 has been verified! Welcome to ${workshopName}. Your live session access link and community invite have been activated.`;
      await ghlClient.sendWhatsApp(contactId, waMsg, "yt_payment_verified_details").catch(console.warn);
    }

    if (contactId) {
      await ghlClient.addNote(
        contactId,
        `✅ AUTOMATED CONFIRMATION DISPATCHED:\n• WhatsApp Template: yt_payment_verified_details\n• Email sent to: ${email || "N/A"}\n• Dispatched At: ${new Date().toISOString()}`
      ).catch(console.warn);
    }

    return NextResponse.json({
      success: true,
      template: "yt_payment_verified_details",
      message: "Automated payment verification email and WhatsApp template dispatched successfully.",
      lmsUrl,
    });
  } catch (error) {
    console.error("GHL Webhook processing error:", error);
    return NextResponse.json({ success: false, error: "Internal webhook processing error" }, { status: 500 });
  }
}
