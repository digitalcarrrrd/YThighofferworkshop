# GoHighLevel (GHL) & abrarnadir.com Workflow Automation Guide

This guide details the complete automation infrastructure connecting **abrarnadir.com** with **GoHighLevel (GHL)** for automated WhatsApp sequences and Course/LMS email follow-ups.

---

## 1. System Architecture

```
[ Student / Lead Action ]
   - Submits Workshop Form (/ or /workshops)
   - Enrolls in Academy (/academy or /cc)
   - Submits Payment Proof
                │
                ▼
      [ Next.js API Routes ]
   - /api/workshop-registration
   - /api/academy-lead
   - /api/cron/check-stage-changes
                │
         ┌──────┴──────────────────────────────────────┐
         ▼                                             ▼
[ GHL API v2 Synchronizer ]                  [ Automation Engine ]
   - Upsert Contact & Tags                      - WhatsApp Templates
   - Create / Update Opportunity                - Course Email Templates
   - Direct Workflow Enrollment                 - Audit Notes in Contact
         │                                             │
         └──────────────────────┬──────────────────────┘
                                ▼
                   [ Webhook Bridge & Dispatch ]
                      /api/ghl-webhook
                      /api/automations/dispatch
```

---

## 2. GoHighLevel Workflows Inventory

In your GHL account (`Location ID: 6MzIr7iWX12OyaxfufLw`), the following workflows exist:

| Workflow Name | Workflow ID | Status | Role |
| :--- | :--- | :--- | :--- |
| **YouTube Workshop WhatsApp Confirmation** | `8c73d915-30dc-4f5f-9fbe-0db027ca6f32` | **Published** | Official WhatsApp confirmation for live workshop attendees. |
| **Academy LMS Payment Confirmation** | `037af938-b83f-4aac-b1b3-61cdfdf5b9a5` | **Published** | Payment verified LMS onboarding for academy students. |
| **Workshop WhatsApp Sequence** | `5b8e88a7-4fb0-476e-9cf2-d36a8751bff4` | **Draft** | Multi-day reminder sequence before the live session. |
| **Workshop Booking & Follow-up** | `492a7eef-7d13-4ceb-8f0a-69e9ccf26837` | **Draft** | Booking confirmation and email follow-up sequence. |
| **Workshop Payment Confirmation** | `0635e2a7-9da4-4757-b12f-c631a0b1eb44` | **Draft** | Alternative payment confirmation flow. |

### Recommended Action in GHL Dashboard:
1. Open **GoHighLevel > Automation > Workflows**.
2. Open **"Workshop WhatsApp Sequence"** (`5b8e88a7-4fb0-476e-9cf2-d36a8751bff4`) and toggle status from **Draft** to **Published**.
3. Open **"Workshop Booking & Follow-up"** (`492a7eef-7d13-4ceb-8f0a-69e9ccf26837`) and toggle status to **Published**.

---

## 3. WhatsApp Workflow Automations

All WhatsApp notifications can be triggered automatically via the code endpoints or via Webhook action nodes inside GHL.

### Stages & Messages:
1. **Payment Pending (Immediate upon registration)**
   - **Trigger**: Form submission on website with payment pending.
   - **Template Name**: `yt_interest_payment_pending`
   - **Content**: Welcomes student, provides official Meezan Bank & Easypaisa account numbers, requests screenshot.
2. **Payment Confirmed & Verified**
   - **Trigger**: Opportunity stage moved to `Payment Confirmed` or webhook action `confirmed`.
   - **Template Name**: `yt_payment_verified_details`
   - **Content**: Congratulations badge, LMS portal credentials link (`lms.abrarnadir.com`), live Zoom room link.
3. **24-Hour Countdown Reminder**
   - **Trigger**: 24 hours prior to workshop date/time.
   - **Template Name**: `yt_24h_workshop_reminder`
   - **Content**: Equipment checklist, Zoom installation reminder, student portal link.
4. **15-Minute Emergency Alert**
   - **Trigger**: 15 minutes before the session starts.
   - **Template Name**: `yt_15min_class_reminder`
   - **Content**: Urgent join room alert with direct Zoom URL.
5. **Post-Workshop VIP Upsell**
   - **Trigger**: 2 hours after workshop finishes.
   - **Template Name**: `yt_workshop_vip_upsell`
   - **Content**: Invitation to apply for the 1-on-1 VIP Executive Mentorship program.

---

## 4. Course & LMS Email Follow-up Automation

A branded, responsive 5-part email follow-up sequence is built into `lib/courseAutomation.ts`:

1. **Email 0 (Immediate)**: `welcome_onboarding`
   - **Subject**: `🎉 Welcome to YouTube Empire Builders, [Name]! Your LMS Access is Ready`
   - **Core Action**: LMS Login URL, username/password instruction, VIP student group link, Module 0 orientation video.
2. **Email 1 (Day 1 / 24 Hours)**: `day1_niche_mastery`
   - **Subject**: `📈 Day 1: How to Pick a $20+ CPM YouTube Niche (Avoid This Common Mistake)`
   - **Core Action**: High-CPM niche matrix (Finance, AI tools, Real Estate), Google Sheet scoring template download.
3. **Email 2 (Day 3 / 72 Hours)**: `day3_content_system`
   - **Subject**: `🤖 Day 3: Our 100% AI Script-to-Video Assembly Line (Zero Face, Zero Camera)`
   - **Core Action**: ChatGPT prompt stack, ElevenLabs voice cloning, 3-word thumbnail rule for 10%+ CTR.
4. **Email 3 (Day 5 / 120 Hours)**: `day5_monetization_playbook`
   - **Subject**: `💰 Day 5: Beyond AdSense — 4 Revenue Streams for Faceless Channels`
   - **Core Action**: Affiliate links, brand deals, digital leads, AdSense setup checklist.
5. **Email 4 (Day 7 / 168 Hours)**: `day7_vip_accelerator`
   - **Subject**: `🚀 Day 7: Ready to Build a 100-Channel Portfolio with 1-on-1 Mentorship?`
   - **Core Action**: Application for the 1-on-1 VIP Executive Portfolio Mentorship.

---

## 5. Webhook Integration in GHL Workflows

You can trigger any of these automations from inside any GHL Workflow by adding a **Webhook** action:

- **Method**: `POST`
- **URL**: `https://abrarnadir.com/api/ghl-webhook`
- **Payload (JSON)**:
```json
{
  "contactId": "{{contact.id}}",
  "email": "{{contact.email}}",
  "name": "{{contact.name}}",
  "phone": "{{contact.phone}}",
  "action": "course_welcome" 
}
```

### Supported `action` values in Webhook:
- `course_welcome`: Dispatches LMS Welcome Credentials email.
- `course_day1`: Dispatches Day 1 Niche Mastery email.
- `course_day3`: Dispatches Day 3 AI Video Assembly email.
- `course_day5`: Dispatches Day 5 Monetization Playbook email.
- `course_day7`: Dispatches Day 7 VIP Mentorship email.
- `payment_pending`: Dispatches WhatsApp payment instructions.
- `confirmed`: Dispatches both WhatsApp Verified alert + LMS Onboarding email.
- `24h`: Dispatches 24h workshop reminder WhatsApp.
- `15min`: Dispatches 15m live room reminder WhatsApp.
- `upsell`: Dispatches VIP upsell WhatsApp.

---

## 6. Testing & Management Endpoints

### 1. Preview Templates in Browser:
- **Email Preview**: `https://abrarnadir.com/api/automations/dispatch?action=preview-email&step=welcome_onboarding`
  *(Change `step` to `day1_niche_mastery`, `day3_content_system`, `day5_monetization_playbook`, or `day7_vip_accelerator`)*
- **WhatsApp Preview**: `https://abrarnadir.com/api/automations/dispatch?action=preview-whatsapp&step=payment_confirmed`

### 2. Manual Test Dispatch via API:
```bash
curl -X POST https://abrarnadir.com/api/automations/dispatch \
  -H "Content-Type: application/json" \
  -d '{
    "type": "whatsapp",
    "email": "test@abrarnadir.com",
    "phone": "+923266641695",
    "name": "Test Student",
    "step": "payment_confirmed"
  }'
```
