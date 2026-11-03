"use client";

import { useSyncExternalStore } from "react";
import { DAY_NAMES, formatTime, getOpenStatus, groupedHours, nowInDubai } from "@/lib/hours";

/** Ticks once a minute on the client; null during server render so markup stays static. */
function subscribe(cb: () => void) {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
}
const minuteNow = () => Math.floor(Date.now() / 60_000);
const serverNow = () => null;

function useMinute() {
  return useSyncExternalStore(subscribe, minuteNow, serverNow);
}

export function OpenBadge({ className = "" }: { className?: string }) {
  const minute = useMinute();
  const base = `inline-flex min-h-8 items-center gap-2 rounded-full border px-3.5 py-1 text-sm font-semibold ${className}`;
  if (minute === null) {
    return (
      <span className={`${base} border-cream/20 text-muted`} aria-hidden>
        <span className="size-2 rounded-full bg-muted/50" />
        Today&rsquo;s hours
      </span>
    );
  }
  const s = getOpenStatus(new Date(minute * 60_000));
  if (s.open) {
    return (
      <span className={`${base} border-veg/60 bg-char/70 text-cream`} role="status">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-veg opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-veg" />
        </span>
        Open now · until {s.closesAt}
      </span>
    );
  }
  const when = s.today ? s.opensAt : `${DAY_NAMES[s.opensDay]} ${s.opensAt}`;
  return (
    <span className={`${base} border-chili/70 bg-char/70 text-cream`} role="status">
      <span className="size-2 rounded-full bg-chili" />
      Closed · opens at {when}
    </span>
  );
}

export function HoursTable() {
  const minute = useMinute();
  const today = minute === null ? -1 : nowInDubai(new Date(minute * 60_000)).day;
  const groups = groupedHours();
  return (
    <table className="w-full text-left text-sm sm:text-[0.95rem]">
      <caption className="sr-only">Opening hours (Dubai time)</caption>
      <tbody>
        {groups.map((g) => {
          const isToday = g.days.includes(today);
          return (
            <tr
              key={g.label}
              className={`border-b border-cream/10 last:border-0 ${isToday ? "bg-turmeric text-char" : ""}`}
              aria-current={isToday ? "date" : undefined}
            >
              <th scope="row" className="py-3 pr-2 pl-3 align-top font-bold whitespace-nowrap">
                {g.label}
                {isToday ? <span className="mt-0.5 block text-[0.7rem] font-bold tracking-widest uppercase sm:mt-0 sm:ml-2 sm:inline">Today</span> : null}
              </th>
              <td className="py-3 pr-3 text-right tabular-nums">
                {g.windows.map((w) => (
                  <span key={w.open} className="block whitespace-nowrap">
                    {formatTime(w.open)} – {formatTime(w.close)}
                  </span>
                ))}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
