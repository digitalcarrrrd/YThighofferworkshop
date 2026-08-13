import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Content Colony Azadi Prebooking | Abrar Nadir",
  description: "Apply for the Content Colony execution residency in Johar Town, Lahore.",
};

const applicationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdVDZv2Ql_IyCAatysZ4Z1GGKAiIa4mCbAC43HhvLzrDK353A/viewform?usp=header";

const packages = [
  {
    name: "10-Day Founding Builder",
    allocation: "8 Founding Seats",
    price: "PKR 85K",
    future: "PKR 110K",
    payment: "PKR 68K on confirmation + PKR 17K before Day 1",
    continuation: "5 structured execution calls / month for 90 days",
    featured: false,
    includes: [
      "10 official Residency days",
      "Shared accommodation",
      "2 meals/day",
      "Cowork + workshops",
      "Resident execution sessions",
      "AI + YouTube operating-system building",
      "90-day roadmap",
      "5 structured execution calls/month for 90 days",
    ],
  },
  {
    name: "15-Day Founding Pro",
    allocation: "4 Founding Seats",
    price: "PKR 120K",
    future: "PKR 150K",
    payment: "PKR 120K upfront OR PKR 70K + PKR 50K",
    continuation: "7 structured execution calls / month for 90 days",
    featured: true,
    includes: [
      "Everything in Builder",
      "5 extra Residency days",
      "More execution cycles",
      "Deeper system implementation",
      "Priority allocation",
      "More review and correction",
      "7 structured execution calls/month for 90 days",
    ],
  },
  {
    name: "30-Day Private Founder",
    allocation: "1 Private Room",
    price: "PKR 220K",
    future: "PKR 280K",
    payment: "PKR 220K upfront OR PKR 120K + PKR 100K",
    continuation: "10 structured execution calls / month for 90 days",
    featured: false,
    includes: [
      "Private room",
      "30-day Residency",
      "Multiple production cycles",
      "Deeper AI workflows + SOPs",
      "Delegation and team architecture",
      "Strategic reviews",
      "10 structured execution calls/month for 90 days",
    ],
  },
];

const systemFlow = [
  "Market Research",
  "Niche Discovery",
  "Content DNA",
  "Topic Intelligence",
  "Titles & Packaging",
  "Research",
  "Scripting",
  "Voice",
  "Visual Production",
  "Editing Workflow",
  "Quality Control",
  "Publishing",
  "Analytics",
  "Iteration",
];

const fitCards = [
  { title: "Focus", text: "Temporarily remove yourself from the distractions and routines that keep breaking your execution." },
  { title: "Build", text: "Turn scattered knowledge into repeatable workflows, SOPs, prompts, automation and operating decisions." },
  { title: "Network", text: "Live around selected builders with experience in channels, AI, editing, automation, research, teams and business." },
];

const outcomeCards = [
  { title: "01 - Business Clarity", text: "Understand the economics, opportunity, market, niche, audience, format and production decisions behind the channel business." },
  { title: "02 - Systems Building", text: "Develop reusable research, topic, script, visual, editing, publishing and analytics workflows." },
  { title: "03 - Execution", text: "Work on real channels and systems. Build, review, correct and repeat until you can make more decisions independently." },
];

const afterStay = [
  { title: "Independent Builder", text: "Continue the 90-day roadmap with included continuation support." },
  { title: "Extension Eligible", text: "Selected residents may be offered 3-, 7- or 14-day physical extensions based on performance and capacity." },
  { title: "Advanced Opportunity", text: "Exceptional residents may later be considered for selected collaborations, projects or advanced programs. Nothing is guaranteed by purchasing Residency." },
];

function applicationLink() {
  return applicationFormUrl;
}

export default function ContentColonyPrebookingPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}><span className={styles.logo}>CONTENT COLONY</span><a href={applicationFormUrl} target="_blank" rel="noopener noreferrer">Application form</a></nav>

      <section className={styles.hero}>
        <div className={styles.eyebrow}>CONTENT COLONY • JOHAR TOWN, LAHORE</div>
        <div className={styles.offerBadge}>AZADI OFFER • AUGUST-SEPTEMBER</div>
        <h1>The Founding Residency</h1>
        <h2>Stop collecting information. Start building the machine.</h2>
        <p>A residential execution environment for selected YouTube operators, AI creators and builders who want to treat YouTube Automation as a real business, not a quick-income experiment.</p>
        <div className={styles.heroActions}><a className={styles.primary} href={applicationFormUrl} target="_blank" rel="noopener noreferrer">Apply to pre-book</a><a className={styles.secondary} href="#offers">See founding offers</a></div>
        <div className={styles.proof}><span>8 x 10-Day Seats</span><span>4 x 15-Day Seats</span><span>1 x Private 30-Day Room</span></div>
        <p className={styles.smallProof}>Already on our wishlist? This is not another interest form. Apply only if you are genuinely prepared to reserve a seat after approval.</p>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={styles.heading}><span>The idea</span><h2>This is not a hostel. And it is not another YouTube course.</h2><p>Content Colony exists for the gap between "I know this" and "I can actually operate this." Accommodation, meals and workspace remove friction. The real product is protected focus, systems, execution, networking and accountability.</p></div>
        <div className={styles.cards}>{fitCards.map((card) => <article key={card.title} className={styles.card}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.heading}><span>The outcome</span><h2>Build a YouTube Content Operating System.</h2><p>The objective is not to personally become faster at every task. It is to build a repeatable system where strategy, AI, prompts, workflows, SOPs, automation, people and quality control work together.</p></div>
        <div className={styles.flow}>{systemFlow.map((item) => <span key={item}>{item}</span>)}</div>
        <div className={styles.cards}>{outcomeCards.map((card) => <article key={card.title} className={styles.card}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={styles.heading}><span>Founding advantage</span><h2>Your access can begin before your Residency does.</h2></div>
        <div className={styles.notice}>
          <p>If you pre-book and your profile matches the current Founding environment, the team may invite you to start participating before your official Residency begins.</p>
          <p>You may be invited to work from the Colony, use designated coworking areas, network, attend selected workshops, participate in community planning and join a daily 40-minute group execution session with Abrar focused on what you are already building.</p>
          <p><strong>These early participation days do not consume your official 10, 15 or 30 Residency days.</strong></p>
          <p>Your complete systems-building and structured Residency experience begins only from your separately confirmed official Day 1.</p>
        </div>
      </section>

      <section id="offers" className={styles.section}>
        <div className={styles.heading}><span>Founding allocation</span><h2>Choose the depth of your Residency.</h2><p>Each package has a different depth of stay, review intensity and continuation support. Your application helps us understand which package is the right fit.</p></div>
        <div className={styles.priceGrid}>
          {packages.map((item) => (
            <article key={item.name} className={`${styles.priceCard} ${item.featured ? styles.featured : ""}`}>
              {item.featured && <div className={styles.popular}>BEST EXECUTION WINDOW</div>}
              <div className={styles.allocation}>{item.allocation}</div><h3>{item.name}</h3>
              <div className={styles.price}>{item.price}</div>
              <div className={styles.future}>Future standard: <s>{item.future}</s></div>
              <ul>{item.includes.map((point) => <li key={point}>{point}</li>)}</ul>
              <p className={styles.installment}><strong>Payment:</strong> {item.payment}</p>
              <a href={applicationLink()} target="_blank" rel="noopener noreferrer">Apply for {item.name.replace(" Founding", "")}</a>
            </article>
          ))}
        </div>
        <p className={styles.paymentNote}>Submitting an application does not guarantee selection. Do not make a payment until the Content Colony team approves your application and contacts you on WhatsApp.</p>
      </section>

      <section className={`${styles.section} ${styles.white}`}>
        <div className={styles.heading}><span>After the stay</span><h2>Your physical package ends. Your execution relationship does not.</h2></div>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead><tr><th>Package</th><th>Physical Residency</th><th>90-Day Continuation</th></tr></thead>
            <tbody>{packages.map((item) => <tr key={item.name}><td>{item.name}</td><td>{item.name.includes("10-Day") ? "10 days" : item.name.includes("15-Day") ? "15 days" : "30 days"}</td><td>{item.continuation}</td></tr>)}</tbody>
          </table>
        </div>
        <p className={styles.supportNote}>Touchpoints can include accountability, channel clinics, analytics discussions, production reviews, group execution and package-specific priority/private reviews. They are structured support sessions, not unlimited private access.</p>
        <div className={styles.cards}>{afterStay.map((card) => <article key={card.title} className={styles.card}><h3>{card.title}</h3><p>{card.text}</p></article>)}</div>
      </section>

      <section className={styles.finalCta}>
        <span>Private LMS pre-booking</span>
        <h2>Apply only if you are ready to reserve.</h2>
        <p>We already have a wishlist. This form is specifically for people saying: "If my profile is accepted, I am ready to reserve a Founding allocation."</p>
        <a href={applicationFormUrl} target="_blank" rel="noopener noreferrer">Open application form</a>
      </section>

      <footer className={styles.footer}><span>CONTENT COLONY • ABRAR NADIR</span><span>Johar Town, Lahore</span></footer>
    </main>
  );
}
