import { cacheLife } from "next/cache";

// Cached so the page stays static under Cache Components; the year is recomputed at most daily.
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
