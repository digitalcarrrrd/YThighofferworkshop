export function cn(...values: Array<string | false | null | undefined>) { return values.filter(Boolean).join(" "); }
export function pktParts(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Karachi",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",hourCycle:"h23"}).formatToParts(now);
  const get=(t:Intl.DateTimeFormatPartTypes)=>Number(parts.find(p=>p.type===t)?.value);
  return {year:get("year"),month:get("month"),day:get("day"),hour:get("hour"),minute:get("minute"),second:get("second")};
}
export function pktDateToInstant(year:number,month:number,day:number,hour:number) { return new Date(Date.UTC(year,month-1,day,hour-5,0,0)); }
