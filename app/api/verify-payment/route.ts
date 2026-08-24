import { NextRequest, NextResponse } from "next/server";
import { ghlClient } from "@/lib/ghlClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contactId, email, phone, name, studentId, plan } = body;

    if (!contactId && !email && !phone) {
      return NextResponse.json({ success: false, error: "Contact ID or Email/Phone is required" }, { status: 400 });
    }

    const studentName = name || "Student";
    const portalUrl = `https://www.abrarnadir.com/portal?name=${encodeURIComponent(studentName)}${email ? `&email=${encodeURIComponent(email)}` : ""}${phone ? `&phone=${encodeURIComponent(phone)}` : ""}`;

    // 1. Send Verified Email via GHL
    if (contactId && email) {
      const verifiedEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0b100c; color: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #22c55e;">
          <div style="display: inline-block; background: #22c55e; color: #000000; font-size: 11px; font-weight: bold; padding: 4px 12px; border-radius: 999px; margin-bottom: 12px;">
            ✓ PAYMENT VERIFIED & LMS UNLOCKED
          </div>
          <h2 style="color: #22c55e; margin-top: 0;">Congratulations ${studentName}!</h2>
          <p>Aap ki payment verify ho chuki hai and you are officially enrolled in <b>YT Empire Builders</b>.</p>
          
          <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid #22c55e; padding: 20px; border-radius: 12px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #22c55e;">🎓 Access Your Student Portal:</h3>
            <p style="margin-bottom: 15px;">Your LMS modules and download vault are 100% unlocked:</p>
            <a href="${portalUrl}" style="display: inline-block; background: #22c55e; color: #000000; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none;">Open Unlocked Student Portal →</a>
          </div>

          <p><b>Join Private VIP Community:</b><br>
          <a href="https://wa.me/15553693691?text=Salam%20Abrar%20Bhai!%20Mera%20payment%20verify%20ho%20gaya%20hai,%20please%20add%20me%20to%20the%20VIP%20WhatsApp%20group" style="color: #22c55e; font-weight: bold;">Click Here to Connect with Abrar on WhatsApp →</a></p>

          <p style="margin-top: 25px; font-size: 13px; color: #9ca3af;">Shukriya,<br><b>Abrar Nadir</b><br>Founder, YT Empire Builders</p>
        </div>
      `;

      await ghlClient.sendEmail(
        contactId,
        email,
        "✅ Payment Verified! Access Your YT Empire Builders LMS & Community",
        verifiedEmailHtml
      );
    }

    // 2. Send Verified WhatsApp via GHL
    if (contactId) {
      const waMsg = `Salam ${studentName}! Abrar here.\n\nAap ki payment verify ho chuki hai and welcome to YT Empire Builders! 🎉\n\nAapka student portal dashboard 100% unlocked hai:\n👉 ${portalUrl}\n\nYahan se aap 12 video modules, 50+ AI prompts aur 90-day calendar download kar sakte hain.\n\nLet's build your YouTube empire! 🚀`;
      await ghlClient.sendWhatsApp(contactId, waMsg);
    }

    return NextResponse.json({
      success: true,
      message: "Automated payment verification email and WhatsApp dispatched successfully.",
      portalUrl,
    });
  } catch (error) {
    console.error("Verify payment error:", error);
    return NextResponse.json({ success: false, error: "Internal error" }, { status: 500 });
  }
}
