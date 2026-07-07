export function signature() {
  if (typeof window === "undefined" || process.env.NODE_ENV !== "production") return;
  console.log(
    "%c[ ADAIR SYSTEMS ]%c  direction > generation\n%cCurious how it's built? hello@adair.systems",
    "color:#2DD4C2;font-family:monospace;font-weight:bold",
    "color:#9B84F5;font-family:monospace",
    "color:#7e849a;font-family:monospace"
  );
}
