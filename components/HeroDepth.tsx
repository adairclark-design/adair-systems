import type { ReactNode } from "react";
import { BackgroundField } from "./BackgroundField";

export default function HeroDepth({children}: {children: ReactNode}) {
  return <section className="studio-hero" id="home">
    <BackgroundField />
    <div className="studio-layout">{children}</div>
  </section>;
}
