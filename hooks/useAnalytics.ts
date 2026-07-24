"use client";
declare global { interface Window { dataLayer?:Record<string,unknown>[]; gtag?:(...args:unknown[])=>void; fbq?:(...args:unknown[])=>void } }
export function useAnalytics(){return{track:(event:string,data:Record<string,unknown>={})=>{window.dataLayer?.push({event,...data});window.gtag?.("event",event,data);const map:Record<string,string>={payment_modal_open:"InitiateCheckout",form_started:"Lead",registration_success:"CompleteRegistration"};if(map[event])window.fbq?.("track",map[event],data);if(process.env.NODE_ENV==="development")console.info("[analytics]",event,data)}}}
