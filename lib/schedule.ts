const WEEKDAY_INDEX = { Sunday: 0, Saturday: 6 } as const;

/** Date of the third given weekday in a month (month is 0-based). */
export function thirdWeekdayOf(year: number, month: number, weekday: keyof typeof WEEKDAY_INDEX): Date {
  const first = new Date(year, month, 1);
  const offset = (WEEKDAY_INDEX[weekday] - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + 14);
}

/** Next event date on or after `from` (the event day itself counts until it ends). */
export function nextEventDate(from: Date, weekday: keyof typeof WEEKDAY_INDEX): Date {
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const candidate = thirdWeekdayOf(today.getFullYear(), today.getMonth(), weekday);
  if (candidate >= today) return candidate;
  return thirdWeekdayOf(today.getFullYear(), today.getMonth() + 1, weekday);
}
