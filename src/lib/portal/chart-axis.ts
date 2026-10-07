/** Integer metrics must never acquire fractional or duplicate axis labels. */
export function integerAxisTicks(min: number, max: number): number[] {
  const low = Math.floor(min);
  const high = Math.max(Math.ceil(max), low + 1);
  const span = high - low;
  return [...new Set([
    high,
    Math.round(low + span * 2 / 3),
    Math.round(low + span / 3),
    low,
  ])];
}
