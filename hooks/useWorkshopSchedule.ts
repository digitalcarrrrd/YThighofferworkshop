"use client";
import { useEffect,useState } from "react";
import { pktDateToInstant,pktParts } from "@/lib/utils";
export type Schedule={batchDateString:string;batchDateDisplay:string;isRegistrationOpen:boolean;registrationCutoff:Date;label:"today"|"tomorrow";labelUrdu:"Aaj Raat"|"Kal Raat"};
function compute():Schedule{
  const p=pktParts(); const after=p.hour>=19; const base=pktDateToInstant(p.year,p.month,p.day,12); if(after)base.setUTCDate(base.getUTCDate()+1);
  const bp=pktParts(base); const iso=`${bp.year}-${String(bp.month).padStart(2,"0")}-${String(bp.day).padStart(2,"0")}`;
  return {batchDateString:iso,batchDateDisplay:new Intl.DateTimeFormat("en-PK",{timeZone:"Asia/Karachi",weekday:"long",day:"numeric",month:"long",year:"numeric"}).format(base),isRegistrationOpen:true,registrationCutoff:pktDateToInstant(bp.year,bp.month,bp.day,19),label:after?"tomorrow":"today",labelUrdu:after?"Kal Raat":"Aaj Raat"};
}
export function useWorkshopSchedule(){const [schedule,setSchedule]=useState<Schedule|null>(null);useEffect(()=>{const tick=()=>setSchedule(compute());tick();const id=setInterval(tick,10000);return()=>clearInterval(id)},[]);return{schedule,mounted:schedule!==null}}
