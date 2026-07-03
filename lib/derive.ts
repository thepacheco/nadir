import type { Alert, Company } from "./types";

export function fmtClock(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
}

export function alertKey(company: Company, alert: Alert): string {
  return `${company.id}|${alert.title}`;
}

export function sevAnim(color: string): string {
  return color === "#C7452F" ? "nadirPulseRed 1.6s infinite" : "nadirPulseAmber 2.2s infinite";
}

export function initialToast(company: Company, clock: number, dismissed: Record<string, boolean>): Alert | null {
  const crit = company.alerts.filter((a) => a.color === "#C7452F" && a.at <= clock)[0] || company.alerts[0];
  if (crit && !dismissed[alertKey(company, crit)]) return crit;
  return null;
}
