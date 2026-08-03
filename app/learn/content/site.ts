export type PlanId = "monthly" | "lifetime" | "installments";

export const plans = [
  { id: "monthly" as const, name: "Monthly Explorer", price: "Rs 3,000", cadence: "every 30 days", cta: "Start Monthly Access", benefits: ["LMS access while subscribed", "30-day recorded roadmap", "Active resources and community", "Available updates", "Cancel before renewal"] },
  { id: "lifetime" as const, name: "Lifetime Builder", price: "Rs 30,000", cadence: "one time", cta: "Get Lifetime Access", badge: "Best value", benefits: ["All 12 modules", "Lifetime LMS access", "Execution systems and templates", "Community", "Available future updates", "No recurring Academy fee"] },
  { id: "installments" as const, name: "Three-Payment Plan", price: "3 × Rs 11,000", cadence: "Rs 33,000 total", cta: "Pay in Three Installments", benefits: ["Divided payment schedule", "Portal access under installment terms", "Lifetime access after all payments", "Checkout or support arrangement"] },
];

export const paths = [
  { id: "channel", label: "Build my channel", eyebrow: "Own the asset", text: "Create a long-term audience and a channel you control.", modules: "Start with Modules 1, 3, 4 and 6" },
  { id: "skills", label: "Sell YouTube skills", eyebrow: "Start with service", text: "Develop research, scripting, thumbnail, editing or management skills.", modules: "Start with Modules 1, 3, 6 and 9" },
  { id: "operation", label: "Build an operation", eyebrow: "Design the system", text: "Build repeatable production systems and learn to manage a team.", modules: "Start with Modules 1, 6, 8 and 11" },
];

export const modules = [
  ["01", "Days 1–3", "Build Your YouTube Income Plan", "Choose a direction and create your first action plan.", "Income-path canvas", "45 min"],
  ["02", "Days 4–6", "Protect Your Channel and Your Money", "Create a safer, policy-aware channel plan.", "Risk checklist", "52 min"],
  ["03", "Days 7–10", "Find a Market Worth Entering", "Research a niche using evidence, not hype.", "100+ niche ideas", "64 min"],
  ["04", "Days 11–12", "Build and Launch the Channel", "Organize a launch-ready channel.", "Launch checklist", "48 min"],
  ["05", "Days 12–14", "Understand YouTube Distribution", "Learn to diagnose performance without blaming the algorithm.", "Performance worksheet", "57 min"],
  ["06", "Days 15–17", "Build Your AI Content Engine", "Create a repeatable, responsible production workflow.", "Script assistant", "71 min"],
  ["07", "Days 17–20", "Reach Additional Language Markets", "Build a responsible localization framework.", "Localization map", "44 min"],
  ["08", "Days 21–24", "Produce Without Filming Everything", "Source and assemble lawful, original-value visuals.", "Graphics pack", "68 min"],
  ["09", "Days 25–27", "Edit Videos That Hold Attention", "Create a faster, more consistent editing system.", "10 CapCut templates", "76 min"],
  ["10", "Days 28–29", "Create Multiple Income Pathways", "Plan monetization beyond AdSense alone.", "Monetization planner", "59 min"],
  ["11", "Day 30", "Turn the Channel Into a Managed Business", "Map the move from worker to channel operator.", "Team SOPs", "63 min"],
  ["12", "Special access", "Creator Payments and Cash-Flow System", "Manage channel revenue and cash flow responsibly.", "Cash-flow planner", "41 min"],
];

export const faqs = [
  ["What happens immediately after payment?", "After payment is confirmed, you receive LMS access instructions by email. Pending payments remain on the pending screen until reviewed."],
  ["Is this practical or theoretical?", "Each recorded lesson connects to an assignment, template or decision. You still need to complete the work yourself."],
  ["Can I build a faceless channel?", "Yes. The roadmap teaches original, policy-aware production without requiring you to appear on camera."],
  ["How much time should I spend each day?", "Plan for roughly 45–90 focused minutes. Some production assignments may take longer."],
  ["Is income guaranteed?", "No. Education and support cannot guarantee views, monetization, clients, employment or income."],
  ["How do weekly sessions work?", "Members can bring questions, channels, scripts and thumbnails for implementation-focused feedback. The exact schedule appears inside the portal."],
  ["What is the refund policy?", "The final refund window and eligibility rules must be confirmed by YEB Academy before checkout launches. See the configurable Refund Policy page."],
  ["What equipment do I need?", "A phone or computer, a stable-enough connection for recorded lessons, and access to common creator tools. Start with what you have."],
];

export const outcomes = ["Selected business model", "Researched niche", "Positioned channel", "Content strategy", "Initial video pipeline", "Script and narration workflow", "Visual-production process", "Editing workflow", "Publishing calendar", "Monetization plan", "Analytics system", "Team and scaling roadmap"];
