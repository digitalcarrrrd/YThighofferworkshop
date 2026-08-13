import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Content Colony Azadi Prebooking | Abrar Nadir",
  description: "Apply for the Content Colony execution residency in Johar Town, Lahore.",
};

const applicationFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdVDZv2Ql_IyCAatysZ4Z1GGKAiIa4mCbAC43HhvLzrDK353A/viewform?usp=header";

const packages = [
  { name: "10-Day Builder", allocation: "8 seats", price: "PKR 85,000", future: "PKR 110,000", plan: "PKR 68K + 17K", featured: false },
  { name: "15-Day Pro", allocation: "4 seats", price: "PKR 120,000", future: "PKR 150,000", plan: "Full or PKR 70K + 50K", featured: true },
  { name: "Private 30-Day", allocation: "1 private room", price: "PKR 220,000", future: "PKR 280,000", plan: "Full or PKR 120K + 100K", featured: false },
];

const facilities = [
  "Accommodation according to your selected package",
  "Two meals daily plus tea, coffee and basic drinks",
  "High-speed internet and shared coworking workspace",
  "Resident-only execution sessions with Abrar Nadir",
  "Eligible live workshops and YouTube business-model training",
  "AI systems and production-workflow building",
  "Accountability reviews, networking and peer execution",
  "A practical 90-day continuation roadmap",
];

export default function ContentColonyPrebookingPage() {
  return (
    <main className={styles.page}>
      <nav className={styles.nav}><span className={styles.logo}>CONTENT COLONY</span><a href={applicationFormUrl} target="_blank" rel="noopener noreferrer">Application form</a></nav>

      <section className={styles.hero}>
        <div className={styles.eyebrow}>CONTENT COLONY • JOHAR TOWN, LAHORE</div>
        <div className={styles.offerBadge}>AZADI OFFER • AUGUST-SEPTEMBER</div>
        <h1>Stop collecting information.<br /><span>Start building the machine.</span></h1>
        <p>A focused co-live and cowork residency for creators who need the environment, systems and accountability to execute, not another folder of lessons.</p>
        <div className={styles.heroActions}><a className={styles.primary} href="#packages">See residency options</a><a className={styles.secondary} href={applicationFormUrl} target="_blank" rel="noopener noreferrer">Open application form</a></div>
        <div className={styles.proof}><span>Limited pilot allocation</span><span>Johar Town, Lahore</span><span>Application required</span></div>
      </section>

      <section className={styles.priceStory}>
        <div><span className={styles.kicker}>PREBOOK BEFORE OCTOBER</span><h2>Your early decision protects today's price.</h2></div>
        <p>Public pricing rises after the Azadi prebooking window. Apply now to be considered at the current pilot rate; payment is requested only after selection.</p>
      </section>

      <section id="packages" className={styles.section}>
        <div className={styles.heading}><span>Choose your execution window</span><h2>Three ways to enter the Colony</h2><p>Every option is built around focused output. The difference is time, depth and privacy.</p></div>
        <div className={styles.cards}>
          {packages.map((item) => (
            <article key={item.name} className={`${styles.card} ${item.featured ? styles.featured : ""}`}>
              {item.featured && <div className={styles.popular}>BEST EXECUTION WINDOW</div>}
              <div className={styles.allocation}>{item.allocation}</div><h3>{item.name}</h3>
              <div className={styles.price}>{item.price}</div>
              <div className={styles.future}>October/public price <s>{item.future}</s></div>
              <div className={styles.installment}>Payment plan: {item.plan}</div>
              <a href={applicationFormUrl} target="_blank" rel="noopener noreferrer">Apply for this option</a>
            </article>
          ))}
        </div>
        <p className={styles.paymentNote}>Submitting an application does not guarantee selection. Do not make a payment until the Content Colony team approves your application and contacts you on WhatsApp.</p>
      </section>

      <section id="included" className={`${styles.section} ${styles.included}`}>
        <div className={styles.heading}><span>NOT A HOSTEL. AN EXECUTION ENVIRONMENT.</span><h2>What your residency includes</h2></div>
        <div className={styles.facilities}>{facilities.map((facility, index) => <div key={facility}><b>{String(index + 1).padStart(2, "0")}</b><span>{facility}</span></div>)}</div>
      </section>

      <section className={styles.early}>
        <span>EARLY PARTICIPATION</span><h2>Selected applicants may start before their official residency.</h2>
        <p>You may be invited for coworking, networking, selected workshops, planning and a daily 40-minute Abrar execution session. These early participation days do not reduce your official residency days.</p>
      </section>

      <footer className={styles.footer}><span>CONTENT COLONY • ABRAR NADIR</span><span>Johar Town, Lahore</span></footer>
    </main>
  );
}
