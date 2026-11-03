import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import HeroDepth from "./HeroDepth";
import EngagementReadout from "./EngagementReadout";

export function Hero() {
  return <HeroDepth>
    <div className="intro-copy">
      <p className="identity"><i aria-hidden="true" />Adair Clark · Full-Stack &amp; Systems Engineer</p>
      <h1>I design, build,<br/><em>and ship.</em></h1>
      <p className="intro-summary">I build product interfaces, backend services, and data systems—and connect them into software people can use.</p>
      <div className="intro-actions">
        <a href="mailto:hello@adair.systems?subject=Software%20Engineering">Discuss a role or project <ArrowUpRight size={16}/></a>
        <a href="#featured-architecture">Explore selected work <ArrowDownRight size={16}/></a>
      </div>
      <p className="intro-stack">Next.js <b>·</b> TypeScript <b>·</b> Python <b>·</b> FastAPI</p>
    </div>
    <EngagementReadout />
  </HeroDepth>;
}
