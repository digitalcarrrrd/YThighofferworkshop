import type { Metadata } from "next";
import StudentPortalClient from "./StudentPortalClient";

export const metadata: Metadata = {
  title: "Student Client Portal | YT Empire Builders Academy",
  description:
    "Official Student Onboarding & Client Portal. Access your 12 core modules, AI prompts swipe file, 90-day content calendar, and VIP community mentorship.",
  alternates: {
    canonical: "https://www.abrarnadir.com/portal",
  },
};

export default function StudentPortalPage() {
  return <StudentPortalClient />;
}
