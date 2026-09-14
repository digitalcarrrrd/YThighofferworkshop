import { ghlClient } from "./ghlClient";

export type CourseEmailStep =
  | "welcome_onboarding"
  | "day1_niche_mastery"
  | "day3_content_system"
  | "day5_monetization_playbook"
  | "day7_vip_accelerator";

export type WhatsAppAutomationStep =
  | "payment_pending"
  | "payment_confirmed"
  | "workshop_24h_reminder"
  | "workshop_15m_reminder"
  | "course_day2_checkin"
  | "course_day5_checkin"
  | "vip_upsell";

export interface AutomationRecipient {
  contactId: string;
  email?: string;
  phone?: string;
  name: string;
  workshopName?: string;
  zoomLink?: string;
  customFee?: string;
}

// ---------------------------------------------------------------------------
// EMAIL TEMPLATES & BUILDERS
// ---------------------------------------------------------------------------

function buildEmailContainer(contentHtml: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abrar Nadir Academy</title>
</head>
<body style="margin: 0; padding: 0; background-color: #060907; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #E2E8F0;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #060907; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background-color: #0D1510; border: 1px solid #1E2D23; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.6);">
          <!-- Header -->
          <tr>
            <td style="padding: 28px 32px; background: linear-gradient(180deg, #132219 0%, #0D1510 100%); border-bottom: 1px solid #1E2D23;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <span style="font-size: 20px; font-weight: 800; letter-spacing: -0.5px; color: #FFFFFF;">
                      ABRAR <span style="color: #2FD97E;">NADIR</span>
                    </span>
                    <div style="font-size: 11px; font-weight: 600; color: #2FD97E; text-transform: uppercase; letter-spacing: 1px; margin-top: 2px;">
                      YouTube Automation Academy
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 5px 12px; background: rgba(47, 217, 126, 0.12); border: 1px solid rgba(47, 217, 126, 0.3); border-radius: 999px; font-size: 11px; font-weight: 700; color: #2FD97E; text-transform: uppercase;">
                      Official Access
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Content Body -->
          <tr>
            <td style="padding: 36px 32px;">
              ${contentHtml}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #090E0B; border-top: 1px solid #1E2D23; text-align: center;">
              <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748B;">
                Official Student Portal: <a href="https://lms.abrarnadir.com" style="color: #2FD97E; text-decoration: none;">lms.abrarnadir.com</a> &bull; WhatsApp Support: +92 326 6641695
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                &copy; ${new Date().getFullYear()} Abrar Nadir. All rights reserved. You received this email because you enrolled in YouTube Empire Builders.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function getCourseEmailTemplate(step: CourseEmailStep, name: string, data?: { lmsUrl?: string; email?: string }): { subject: string; html: string } {
  const studentName = name || "Student";
  const portalUrl = data?.lmsUrl || "https://lms.abrarnadir.com";
  const registeredEmail = data?.email || "your registered email";

  switch (step) {
    case "welcome_onboarding":
      return {
        subject: `🎉 Welcome to YouTube Empire Builders, ${studentName}! Your LMS Access is Ready`,
        html: buildEmailContainer(`
          <div style="margin-bottom: 24px;">
            <span style="background: rgba(47, 217, 126, 0.15); border: 1px solid #2FD97E; color: #2FD97E; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;">
              Module 0 &bull; Welcome &amp; Onboarding
            </span>
          </div>
          <h1 style="color: #FFFFFF; font-size: 26px; line-height: 1.3; margin: 0 0 16px 0; font-weight: 800;">
            Welcome aboard, ${studentName}! 🚀
          </h1>
          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 20px 0;">
            Congratulations on taking action. Your official enrollment in the <b>YouTube Empire Builders Academy</b> is verified. Your student credentials have been provisioned on our high-speed learning portal.
          </p>

          <div style="background: rgba(47, 217, 126, 0.05); border: 1px solid rgba(47, 217, 126, 0.25); border-radius: 12px; padding: 24px; margin: 24px 0;">
            <h3 style="color: #2FD97E; font-size: 16px; margin: 0 0 12px 0; font-weight: 700;">
              🔑 Your Learning Portal Credentials:
            </h3>
            <p style="margin: 6px 0; font-size: 14px; color: #E2E8F0;">
              &bull; <b>LMS URL:</b> <a href="${portalUrl}" style="color: #2FD97E; text-decoration: underline;">${portalUrl}</a>
            </p>
            <p style="margin: 6px 0; font-size: 14px; color: #E2E8F0;">
              &bull; <b>Username / Email:</b> <span style="color: #FFFFFF; font-family: monospace;">${registeredEmail}</span>
            </p>
            <p style="margin: 6px 0; font-size: 13px; color: #94A3B8;">
              Agar aap pehli dafa login kar rahe hain, to "Forgot / Set Password" par click karein aur apna link verify karein.
            </p>
            <div style="margin-top: 20px; text-align: center;">
              <a href="${portalUrl}" style="display: inline-block; background-color: #2FD97E; color: #04220F; font-size: 15px; font-weight: 800; padding: 14px 32px; border-radius: 10px; text-decoration: none;">
                LOGIN TO LMS NOW &rarr;
              </a>
            </div>
          </div>

          <h3 style="color: #FFFFFF; font-size: 18px; margin: 28px 0 12px 0;">
            ⚡ 3 Things You Must Do Today:
          </h3>
          <ol style="color: #CBD5E1; font-size: 14px; line-height: 1.7; padding-left: 20px; margin: 0 0 24px 0;">
            <li><b>Watch the Orientation Video:</b> Understand how we build cash-cow channels without showing your face.</li>
            <li><b>Join the Private WhatsApp Student Group:</b> Network with fellow empire builders and get weekly masterclass updates.</li>
            <li><b>Complete Module 1:</b> Discover how to validate high-CPM ($8 to $25) niches before recording a single second.</li>
          </ol>

          <p style="font-size: 14px; color: #94A3B8; margin: 0;">
            Koi sawal ho to direct WhatsApp helpdesk (+92 326 6641695) par rabta karein. Let's build your empire together!
          </p>
        `),
      };

    case "day1_niche_mastery":
      return {
        subject: `📈 Day 1: How to Pick a $20+ CPM YouTube Niche (Avoid This Common Mistake)`,
        html: buildEmailContainer(`
          <div style="margin-bottom: 24px;">
            <span style="background: rgba(59, 130, 246, 0.15); border: 1px solid #3B82F6; color: #60A5FA; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;">
              Module 1 Follow-Up &bull; Day 1
            </span>
          </div>
          <h1 style="color: #FFFFFF; font-size: 24px; line-height: 1.3; margin: 0 0 16px 0; font-weight: 800;">
            Hi ${studentName}, have you locked in your niche yet?
          </h1>
          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 18px 0;">
            90% of beginners fail on YouTube Automation because they pick the wrong niche. They choose gaming, funny memes, or vlogs where advertisers only pay <b>$0.50 to $1.20 per 1,000 views</b>.
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 20px 0;">
            In YouTube Empire Builders, we target high-paying US/UK/Canada audiences in:
          </p>

          <div style="background: #111B14; border-left: 4px solid #2FD97E; padding: 18px 20px; border-radius: 0 10px 10px 0; margin: 20px 0;">
            <p style="margin: 4px 0; color: #FFFFFF; font-size: 14px;">💵 <b>Personal Finance &amp; Investing:</b> $15 – $35 CPM</p>
            <p style="margin: 4px 0; color: #FFFFFF; font-size: 14px;">🤖 <b>AI Tools &amp; Software Reviews:</b> $12 – $25 CPM</p>
            <p style="margin: 4px 0; color: #FFFFFF; font-size: 14px;">🏢 <b>Luxury Real Estate &amp; Business Documentaries:</b> $18 – $30 CPM</p>
          </div>

          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 24px 0;">
            Check out <b>Module 1: The Niche Matrix</b> inside your LMS. It includes the exact Google Sheet template to score your niche before spending time or money.
          </p>

          <div style="text-align: center; margin: 28px 0;">
            <a href="${portalUrl}" style="display: inline-block; background-color: #2FD97E; color: #04220F; font-size: 14px; font-weight: 800; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
              Open Module 1 on LMS &rarr;
            </a>
          </div>
        `),
      };

    case "day3_content_system":
      return {
        subject: `🤖 Day 3: Our 100% AI Script-to-Video Assembly Line (Zero Face, Zero Camera)`,
        html: buildEmailContainer(`
          <div style="margin-bottom: 24px;">
            <span style="background: rgba(168, 85, 247, 0.15); border: 1px solid #A855F7; color: #C084FC; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;">
              Module 2 &amp; 3 &bull; Production System
            </span>
          </div>
          <h1 style="color: #FFFFFF; font-size: 24px; line-height: 1.3; margin: 0 0 16px 0; font-weight: 800;">
            ${studentName}, here is how we produce videos in 45 minutes:
          </h1>
          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 18px 0;">
            You don't need to be an English writer, video editor, or voice artist. We run our channels like an assembly line using 4 specific tools:
          </p>

          <div style="background: #111915; border: 1px solid #1E2D23; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <ol style="margin: 0; padding-left: 20px; color: #E2E8F0; font-size: 14px; line-height: 1.8;">
              <li><b>ChatGPT / Claude Custom Framework:</b> Generates high-retention 8-minute retention-hook scripts.</li>
              <li><b>ElevenLabs Voice AI:</b> Ultra-realistic studio voiceovers with natural breathing and pauses.</li>
              <li><b>Storyblocks / Pexels + Premiere / CapCut:</b> Fast b-roll pacing with captions every 3 seconds.</li>
              <li><b>Photoshop / Canva CTR formula:</b> Bold 3-word rule for 10%+ click-through rate.</li>
            </ol>
          </div>

          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 24px 0;">
            Your action task today: Open <b>Module 3: Automated Video Production</b> and download the exact prompt stack.
          </p>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${portalUrl}" style="display: inline-block; background-color: #2FD97E; color: #04220F; font-size: 14px; font-weight: 800; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
              Watch Module 3 Walkthrough &rarr;
            </a>
          </div>
        `),
      };

    case "day5_monetization_playbook":
      return {
        subject: `💰 Day 5: Beyond AdSense — 4 Revenue Streams for Faceless Channels`,
        html: buildEmailContainer(`
          <div style="margin-bottom: 24px;">
            <span style="background: rgba(234, 179, 8, 0.15); border: 1px solid #EAB308; color: #FACC15; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;">
              Module 4 &bull; Monetization Secrets
            </span>
          </div>
          <h1 style="color: #FFFFFF; font-size: 24px; line-height: 1.3; margin: 0 0 16px 0; font-weight: 800;">
            ${studentName}, AdSense is only 30% of our YouTube income.
          </h1>
          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 18px 0;">
            Most creators wait 6 months for 4,000 watch hours to make their first dollar. Empire Builders monetize from <b>Day 1</b>.
          </p>

          <div style="background: #151A14; border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 12px; padding: 22px; margin: 20px 0;">
            <h4 style="color: #FACC15; margin: 0 0 12px 0; font-size: 15px;">The 4-Pillar Monetization Model:</h4>
            <p style="margin: 6px 0; font-size: 14px; color: #E2E8F0;">1. <b>Affiliate Pinned Links:</b> High-ticket SaaS software paying $50 to $200 recurring per referral.</p>
            <p style="margin: 6px 0; font-size: 14px; color: #E2E8F0;">2. <b>Brand Sponsorships:</b> Direct brand deals even on small 10k-subscriber channels.</p>
            <p style="margin: 6px 0; font-size: 14px; color: #E2E8F0;">3. <b>Digital Product Leads:</b> Simple lead-magnets that collect buyer emails.</p>
            <p style="margin: 6px 0; font-size: 14px; color: #E2E8F0;">4. <b>YouTube AdSense Partner Program:</b> Passive ad revenue in USD.</p>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #94A3B8; margin: 0 0 20px 0;">
            Log in to the LMS today and complete the <b>Monetization Setup Checklist</b>.
          </p>
          <div style="text-align: center; margin: 24px 0;">
            <a href="${portalUrl}" style="display: inline-block; background-color: #2FD97E; color: #04220F; font-size: 14px; font-weight: 800; padding: 12px 28px; border-radius: 8px; text-decoration: none;">
              Go to Monetization Checklist &rarr;
            </a>
          </div>
        `),
      };

    case "day7_vip_accelerator":
      return {
        subject: `🚀 Day 7: Ready to Build a 100-Channel Portfolio with 1-on-1 Mentorship?`,
        html: buildEmailContainer(`
          <div style="margin-bottom: 24px;">
            <span style="background: rgba(47, 217, 126, 0.15); border: 1px solid #2FD97E; color: #2FD97E; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 999px; text-transform: uppercase;">
              Executive Mentorship &bull; Day 7
            </span>
          </div>
          <h1 style="color: #FFFFFF; font-size: 26px; line-height: 1.3; margin: 0 0 16px 0; font-weight: 800;">
            One week in, ${studentName}! Ready for the next level?
          </h1>
          <p style="font-size: 15px; line-height: 1.6; color: #CBD5E1; margin: 0 0 20px 0;">
            You now have all the core foundations of YouTube Automation. But if you want to skip the trial-and-error, get your channels audited, or have my personal production team assist you in scaling a multi-channel portfolio, apply for:
          </p>

          <div style="background: linear-gradient(180deg, #16261B 0%, #0F1912 100%); border: 1px solid #2FD97E; border-radius: 14px; padding: 26px; margin: 24px 0; text-align: center;">
            <h3 style="color: #2FD97E; font-size: 20px; margin: 0 0 8px 0; font-weight: 800;">
              VIP Executive Portfolio Accelerator
            </h3>
            <p style="color: #94A3B8; font-size: 14px; margin: 0 0 18px 0; line-height: 1.5;">
              Private 1-on-1 mentorship with Abrar Nadir &bull; Channel validation audit &bull; Dedicated editor introductions &bull; Bi-weekly portfolio strategy calls.
            </p>
            <a href="https://www.abrarnadir.com/ytempirebuilder" style="display: inline-block; background-color: #2FD97E; color: #04220F; font-size: 15px; font-weight: 900; padding: 14px 36px; border-radius: 10px; text-decoration: none;">
              Apply for VIP Mentorship &rarr;
            </a>
          </div>

          <p style="font-size: 13px; color: #64748B; text-align: center; margin: 0;">
            Strictly limited to 10 clients per batch to ensure dedicated individual attention.
          </p>
        `),
      };
  }
}

// ---------------------------------------------------------------------------
// WHATSAPP AUTOMATION MESSAGES
// ---------------------------------------------------------------------------

export function getWhatsAppAutomationMessage(
  step: WhatsAppAutomationStep,
  name: string,
  options?: { workshopName?: string; zoomLink?: string; customFee?: string }
): { message: string; templateName?: string } {
  const studentName = name || "Student";
  const workshop = options?.workshopName || "YouTube Empire Builders Live Workshop";
  const zoomLink = options?.zoomLink || "https://lms.abrarnadir.com";
  const fee = options?.customFee || "PKR 1,999";

  switch (step) {
    case "payment_pending":
      return {
        templateName: "yt_interest_payment_pending",
        message:
          `Assalam o Alaikum ${studentName}! 👋\n\n` +
          `Thank you for registering for the *${workshop}*.\n\n` +
          `🎁 *5 Founding Bonuses Included (Worth PKR 15,499 - 100% FREE):*\n` +
          `1. 🤖 50+ AI Prompts Pack (FREE - PKR 3,000)\n` +
          `2. 🔍 Niche Research Matrix Template (FREE - PKR 2,000)\n` +
          `3. 📅 90-Day Content Calendar Planner (FREE - PKR 2,500)\n` +
          `4. 💬 7-Day WhatsApp Group Support (FREE - PKR 5,000)\n` +
          `5. 📹 Workshop Recording with 24h Access (FREE - PKR 2,999)\n\n` +
          `Aap ki seat temporarily hold kar di gayi hai. Kindly fee (${fee}) transfer karein:\n\n` +
          `🏦 *Meezan Bank Limited:*\n• Account Title: Muhammad Abrar\n• Account Number: 02370103321036\n• IBAN: PK39MEZN0002370103321036\n\n` +
          `📱 *Easypaisa:*\n• Account Title: Muhammad Abrar Ghauri\n• Number: 03274532186\n\n` +
          `Payment ke baad receipt screenshot is WhatsApp number (+92 326 6641695) par reply karein taake aap ka LMS portal access aur VIP workshop link activate kiya ja sake!`,
      };

    case "payment_confirmed":
      return {
        templateName: "yt_payment_verified_details",
        message:
          `🎉 Mubarak ho ${studentName}!\n\n` +
          `Aap ki payment of ${fee} verify ho chuki hai and your seat is *OFFICIALLY CONFIRMED* for ${workshop}.\n\n` +
          `🔑 *Your Student LMS Portal:*\nURL: https://lms.abrarnadir.com\n\n` +
          `🔴 *Live Session Zoom Link:*\n${zoomLink}\n\n` +
          `Official course materials aur live Q&A session ke liye ready rahein. Save this official support number: +92 326 6641695.`,
      };

    case "workshop_24h_reminder":
      return {
        templateName: "yt_24h_workshop_reminder",
        message:
          `⏳ Hi ${studentName}, reminder!\n\n` +
          `*${workshop}* starts in exactly 24 HOURS.\n\n` +
          `📌 Checklist:\n` +
          `1. Ensure Zoom app is installed on your laptop/mobile\n` +
          `2. Have your notebook ready for our high-CPM niche blueprint\n` +
          `3. Portal access: https://lms.abrarnadir.com\n\n` +
          `See you live tomorrow!`,
      };

    case "workshop_15m_reminder":
      return {
        templateName: "yt_15min_class_reminder",
        message:
          `🔴 URGENT: Class starts in 15 minutes, ${studentName}!\n\n` +
          `The live room is open right now. Click below to enter immediately:\n` +
          `${zoomLink}\n\n` +
          `Please join now so you don't miss the opening niche framework!`,
      };

    case "course_day2_checkin":
      return {
        templateName: "yt_course_day2_checkin",
        message:
          `Hi ${studentName}! Hope you enjoyed the initial lessons on YouTube Empire Builders.\n\n` +
          `Have you selected your top 3 niches yet? Module 1 worksheet check karein: https://lms.abrarnadir.com\n\n` +
          `Agar kisi bhi topic par confusion hai, to reply karein, team Abrar is here to guide you!`,
      };

    case "course_day5_checkin":
      return {
        templateName: "yt_course_day5_checkin",
        message:
          `Assalam o Alaikum ${studentName}! 🚀\n\n` +
          `Module 3 (AI Video Assembly Line) is where 90% of students see the biggest breakthrough.\n\n` +
          `Make sure to test the custom ChatGPT prompt today and generate your first test script on LMS: https://lms.abrarnadir.com`,
      };

    case "vip_upsell":
      return {
        templateName: "yt_workshop_vip_upsell",
        message:
          `Hi ${studentName}, congratulations on completing the live workshop!\n\n` +
          `Ready to scale to a 100-channel portfolio with direct 1-on-1 mentorship from Abrar Nadir?\n\n` +
          `Apply for the VIP Executive Accelerator here: https://www.abrarnadir.com/ytempirebuilder\n\n` +
          `Seats are strictly limited to 10 candidates per batch.`,
      };
  }
}

// ---------------------------------------------------------------------------
// AUTOMATION DISPATCH ORCHESTRATOR
// ---------------------------------------------------------------------------

export async function dispatchCourseEmailAutomation(
  recipient: AutomationRecipient,
  step: CourseEmailStep
) {
  if (!recipient.email || !recipient.contactId) {
    return { success: false, error: "Missing email or contactId" };
  }

  const template = getCourseEmailTemplate(step, recipient.name, {
    email: recipient.email,
    lmsUrl: "https://lms.abrarnadir.com",
  });

  const res = await ghlClient.sendEmail(
    recipient.contactId,
    recipient.email,
    template.subject,
    template.html
  );

  await ghlClient.addNote(
    recipient.contactId,
    `📧 COURSE EMAIL AUTOMATION DISPATCHED:\n• Step: ${step}\n• Subject: ${template.subject}\n• Recipient: ${recipient.email}\n• Dispatched At: ${new Date().toISOString()}`
  );

  return { success: true, result: res, step };
}

export async function dispatchWhatsAppAutomation(
  recipient: AutomationRecipient,
  step: WhatsAppAutomationStep
) {
  if (!recipient.contactId) {
    return { success: false, error: "Missing contactId" };
  }

  const wa = getWhatsAppAutomationMessage(step, recipient.name, {
    workshopName: recipient.workshopName,
    zoomLink: recipient.zoomLink,
    customFee: recipient.customFee,
  });

  const res = await ghlClient.sendWhatsApp(
    recipient.contactId,
    wa.message,
    wa.templateName
  );

  await ghlClient.addNote(
    recipient.contactId,
    `📱 WHATSAPP AUTOMATION DISPATCHED:\n• Step: ${step}\n• Template: ${wa.templateName || "custom"}\n• Dispatched At: ${new Date().toISOString()}`
  );

  return { success: true, result: res, step };
}
