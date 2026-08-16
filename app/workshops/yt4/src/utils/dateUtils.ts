// Date and schedule utilities for the YouTube Empire Builders workshop
// Target Timezone: Asia/Karachi (PKT, UTC +5)

export interface WorkshopStatus {
  batchDate: string; // YYYY-MM-DD
  displayDate: string; // E.g., "Tuesday, 21 July 2026"
  isToday: boolean;
  cutoffTime: Date; // The exact Date object for the 7:00 PM PKT cutoff
  isClosedForToday: boolean;
}

// Convert a standard Date to PKT (UTC+5) components
export function getPKTComponents(date: Date = new Date()) {
  // Get UTC time
  const utcTime = date.getTime() + (date.getTimezoneOffset() * 60000);
  // Add 5 hours for Pakistan Standard Time
  const pktTime = new Date(utcTime + (3600000 * 5));
  
  return {
    year: pktTime.getFullYear(),
    month: pktTime.getMonth(), // 0-indexed
    date: pktTime.getDate(),
    day: pktTime.getDay(), // 0 (Sun) - 6 (Sat)
    hours: pktTime.getHours(),
    minutes: pktTime.getMinutes(),
    seconds: pktTime.getSeconds(),
    rawDate: pktTime
  };
}

// Format date into elegant display format
export function formatPKTDisplayDate(year: number, month: number, date: number, dayIndex: number): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  return `${days[dayIndex]}, ${date} ${months[month]} ${year}`;
}

export function getWorkshopStatus(now: Date = new Date()): WorkshopStatus {
  const pkt = getPKTComponents(now);
  
  // Cutoff is 7:00 PM PKT (Hour 19, Minute 0, Second 0)
  const isClosedToday = pkt.hours >= 19;
  
  let targetYear = pkt.year;
  let targetMonth = pkt.month;
  let targetDate = pkt.date;
  let targetDay = pkt.day;
  
  if (isClosedToday) {
    // Workshop date shifts to tomorrow
    const tomorrow = new Date(pkt.rawDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    targetYear = tomorrow.getFullYear();
    targetMonth = tomorrow.getMonth();
    targetDate = tomorrow.getDate();
    targetDay = tomorrow.getDay();
  }
  
  // Format target date as YYYY-MM-DD
  const mm = String(targetMonth + 1).padStart(2, "0");
  const dd = String(targetDate).padStart(2, "0");
  const batchDate = `${targetYear}-${mm}-${dd}`;
  const displayDate = formatPKTDisplayDate(targetYear, targetMonth, targetDate, targetDay);
  
  // Calculate the exact cutoff Date object in the user's local timeline
  // We want 7:00 PM PKT on the target day (today if before 7pm, tomorrow if after)
  // Let's create it by finding the distance from "now" in user timezone
  const cutoffPkt = new Date(pkt.rawDate);
  cutoffPkt.setHours(19, 0, 0, 0); // 7:00 PM PKT today
  
  if (isClosedToday) {
    cutoffPkt.setDate(cutoffPkt.getDate() + 1); // 7:00 PM PKT tomorrow
  }
  
  // The actual time difference in milliseconds
  const pktTimeDiff = cutoffPkt.getTime() - pkt.rawDate.getTime();
  const cutoffLocalTime = now.getTime() + pktTimeDiff;
  const cutoffTime = new Date(cutoffLocalTime);

  return {
    batchDate,
    displayDate,
    isToday: !isClosedToday,
    cutoffTime,
    isClosedForToday: isClosedToday
  };
}

// Simple pad helper
export function padZero(num: number): string {
  return String(num).padStart(2, "0");
}

// Calculate countdown fields
export function getCountdownFields(target: Date, current: Date = new Date()) {
  const diffMs = target.getTime() - current.getTime();
  if (diffMs <= 0) {
    return { hours: "00", minutes: "00", seconds: "00", completed: true };
  }
  
  const totalSecs = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSecs / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  
  return {
    hours: padZero(hours),
    minutes: padZero(minutes),
    seconds: padZero(seconds),
    completed: false
  };
}
