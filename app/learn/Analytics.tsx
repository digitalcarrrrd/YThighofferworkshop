"use client";
export function track(event: string, detail?: string) {
  window.dispatchEvent(new CustomEvent("yeb:analytics", { detail: { event, detail } }));
}
