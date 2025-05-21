export function timeAgo(dateString: string): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  const now = new Date();
  const secondsDiff = Math.round(
    (new Date(dateString).getTime() - now.getTime()) / 1000
  );

  const intervals: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];

  for (const [unit, secondsInUnit] of intervals) {
    const delta = Math.round(secondsDiff / secondsInUnit);
    if (Math.abs(delta) >= 1) {
      return rtf.format(delta, unit);
    }
  }

  return rtf.format(0, "second");
}
