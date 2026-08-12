import type { Metadata } from "next";
import UploadedLandingPage from "./src/App";
import "./src/index.css";

export const metadata: Metadata = {
  title: "YouTube Empire Builders Workshop | Abrar Nadir",
  description:
    "Build and launch a faceless YouTube channel with Abrar Nadir's complete live workshop system.",
};

export default function Yt2Page() {
  return <UploadedLandingPage />;
}
