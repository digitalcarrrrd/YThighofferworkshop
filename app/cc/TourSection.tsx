"use client";

import ColonyTour3D from "@/components/colony/ColonyTour3D";

export function TourSection() {
  const handleApplyClick = () => {
    const el = document.getElementById("apply");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return <ColonyTour3D onApplyClick={handleApplyClick} />;
}
