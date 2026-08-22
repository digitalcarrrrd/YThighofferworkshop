export interface PaymentDetails {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  iban: string;
  easypaisaNumber: string;
  jazzcashNumber: string;
  easypaisaTitle: string;
  jazzcashTitle: string;
}

export interface Bonus {
  title: string;
  description: string;
  value: number;
}

export interface WorkshopConfig {
  brandName: string;
  presenterName: string;
  timezone: string;
  workshopStartHour: number;
  workshopEndHour: number;
  registrationCutoffHour: number;
  capacity: number;
  price: number;
  currency: string;
  totalValue: number;
  foundingRegistrationLimit: number;
  whatsappSupportNumber: string;
  whatsappGroupUrl: string;
  refundPolicy: string;
  transferPolicy: string;
  paymentVerificationText: string;
  paymentDetails: PaymentDetails;
  bonuses: Bonus[];
}

export const workshopConfig: WorkshopConfig = {
  brandName: "YouTube Empire Builders",
  presenterName: "Abrar Nadir",
  timezone: "Asia/Karachi",
  workshopStartHour: 20, // 8:00 PM
  workshopEndHour: 22,   // 10:00 PM
  registrationCutoffHour: 19, // 7:00 PM
  capacity: 100,
  price: 1999,
  currency: "PKR",
  totalValue: 15499,
  foundingRegistrationLimit: 500,
  whatsappSupportNumber: "+923296158206",
  whatsappGroupUrl: "https://chat.whatsapp.com/GzYEB100Example",
  refundPolicy: "Workshop ki seat non-refundable hai. Lekin agar aap kisi wajah se join nahi kar paate, toh aap apni seat ko agle batch mein shift karwa sakte hain.",
  transferPolicy: "Seat shift karne ke liye workshop shuru hone se kam se kam 2 ghante pehle (6:00 PM tak) humare WhatsApp par batana zaroori hai.",
  paymentVerificationText: "Payment verify hone ke baad final confirmation aur live class ka Zoom link aapke WhatsApp number par bhej diya jayega.",
  paymentDetails: {
    bankName: "Meezan Bank Limited",
    accountTitle: "Abrar Nadir",
    accountNumber: "02340105829103",
    iban: "PK73MEZN0002340105829103",
    easypaisaNumber: "03001234567",
    easypaisaTitle: "Abrar Nadir",
    jazzcashNumber: "03157654321",
    jazzcashTitle: "Abrar Nadir"
  },
  bonuses: [
    {
      title: "AI Prompts Pack — 50+ Custom Prompts",
      description: "Niche research, script writing, aur title generation ke liye super-optimized prompts.",
      value: 3000
    },
    {
      title: "YouTube Niche Research Matrix Template",
      description: "Profitable and low-competition niches validate karne ka step-by-step sheet.",
      value: 2000
    },
    {
      title: "90-Day Content Calendar & Planner",
      description: "Aapke pehle 3 mahine ke content ko organize karne aur consistency maintain karne ka custom tool.",
      value: 2500
    },
    {
      title: "Private WhatsApp Group — 7 Days Support",
      description: "Direct Q&A support aur doosre action-takers ke sath networking ka private space.",
      value: 5000
    },
    {
      title: "Workshop HD Recording — 24 Hours Access",
      description: "Pure session ki high-quality recording taake aap kisi bhi point ko dobara seekh sakein.",
      value: 2999
    }
  ]
};
