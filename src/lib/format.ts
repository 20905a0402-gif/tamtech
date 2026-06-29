/** Deterministic KES formatting — avoids SSR/client locale hydration mismatches */
export function formatKES(amount: number): string {
  const safe = Number.isFinite(amount) ? Math.round(amount) : 0;
  return safe.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
