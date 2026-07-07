// @ts-nocheck
"use client";

import { useEffect, useState } from "react";

/**
 * NavClock — live local-time telemetry for the nav.
 *
 * Renders nothing until mounted (avoids server/client hydration
 * mismatch on the time), but the CSS reserves its width so the nav
 * never shifts. Digits use tabular-nums (set in interactions.css)
 * so the readout never jitters as seconds tick.
 *
 * label: short mono station code shown before the time.
 * Set it to your base of operations, e.g. "PDX" / "LOCAL" / "UTC-8".
 */

export default function NavClock({ label = "LOCAL" }) {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <span className="navclock" aria-hidden="true">
      {now && (
        <>
          <span className="navclock__label">{label}</span>
          <span className="navclock__time">
            {pad(now.getHours())}:{pad(now.getMinutes())}:{pad(now.getSeconds())}
          </span>
        </>
      )}
    </span>
  );
}
