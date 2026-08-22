import type { Metadata } from "next";
import UploadedLandingPage from "./src/App";
import "./src/index.css";

export const metadata: Metadata = {
  title: "YouTube Empire Builders Live Workshop | Abrar Nadir",
  description:
    "Build and launch a profitable faceless YouTube channel with Abrar Nadir's live interactive workshop.",
  alternates: {
    canonical: "https://www.abrarnadir.com/workshops/yt4",
  },
};

export default function Yt4Page() {
  return <UploadedLandingPage />;
}

