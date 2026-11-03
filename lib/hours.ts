import { site } from "@/config/site";

export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "18:30" -> "6:30 PM", "24:30" -> "12:30 AM" */
export function formatTime(hhmm: string) {
  const total = toMin(hhmm) % (24 * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  const suffix = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function windowsFor(day: number) {
  return site.hours.find((d) => d.day === day)?.windows ?? [];
}

/** Current weekday + minutes past midnight in the restaurant's time zone. */
export function nowInDubai(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: site.timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; opensAt: string; opensDay: number; today: boolean };

export function getOpenStatus(date = new Date()): OpenStatus {
  const { day, minutes } = nowInDubai(date);

  // Late windows from yesterday that run past midnight.
  const yesterday = (day + 6) % 7;
  for (const w of windowsFor(yesterday)) {
    const close = toMin(w.close);
    if (close > 1440 && minutes < close - 1440) return { open: true, closesAt: formatTime(w.close) };
  }
  for (const w of windowsFor(day)) {
    if (minutes >= toMin(w.open) && minutes < toMin(w.close)) return { open: true, closesAt: formatTime(w.close) };
  }
  // Next opening: later today, else the following days.
  for (let offset = 0; offset < 7; offset++) {
    const d = (day + offset) % 7;
    const next = windowsFor(d).find((w) => offset > 0 || toMin(w.open) > minutes);
    if (next) return { open: false, opensAt: formatTime(next.open), opensDay: d, today: offset === 0 };
  }
  return { open: false, opensAt: "", opensDay: day, today: true };
}

/** Days grouped for display, e.g. "Mon – Thu". */
export function groupedHours() {
  const order = [1, 2, 3, 4, 5, 6, 0];
  const short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const groups: { label: string; days: number[]; windows: { open: string; close: string }[] }[] = [];
  for (const d of order) {
    const w = windowsFor(d);
    const last = groups.at(-1);
    if (last && JSON.stringify(windowsFor(last.days[0])) === JSON.stringify(w)) last.days.push(d);
    else groups.push({ label: "", days: [d], windows: w });
  }
  for (const g of groups) {
    g.label = g.days.length > 1 ? `${short[g.days[0]]} – ${short[g.days.at(-1)!]}` : short[g.days[0]];
  }
  return groups;
}
