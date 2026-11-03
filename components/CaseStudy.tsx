import { SectionHeading } from "./SectionHeading";
import CaseStudyItem from "@/components/CaseStudyItem";

const caseStudies = [
  {
    eyebrow: "Real-time market systems",
    title: "PolyVision Integration",
    description: "I built market data ingestion, API integration, alert delivery, and the interface for monitoring live market activity.",
    id: "polyvision",
    layers: ["Feed filters control which market updates appear alongside the trader ranking.", "Market ingestion supplies the monitoring view; alert delivery is a separate output.", "Market records carry price and liquidity; trader rankings use profit and loss."],
    outcome: "Follow a market move from the feed to its market and trader context.",
    tags: ["Data ingestion", "API architecture", "Real-time interfaces"],
    images: [
      "/project-images/PolyVision 2.png",
      "/project-images/PolyVision 3.png",
      "/project-images/PolyVision 4.png"
    ]
  },
  {
    eyebrow: "Agricultural planning software",
    title: "AcreLogic",
    description: "I built a planning interface that connects agricultural data, search, and business rules in one application.",
    id: "acrelogic",
    layers: ["The crop catalog exposes growing requirements; the map editor captures planting blocks and their dimensions.", "Planning rules translate block dimensions into a bed layout.", "Crop requirements describe what can be planted; field geometry describes the space available."],
    outcome: "Plan the beds against the field layout with crop requirements at hand.",
    tags: ["Data architecture", "Planning rules", "Data-rich UX"],
    images: [
      "/project-images/AcreLogic 1.png",
      "/project-images/AcreLogic 2.png",
      "/project-images/AcreLogic 3.png",
    ]
  },
  {
    eyebrow: "Training & nutrition platform",
    title: "TDT Training",
    description: "I built onboarding, workout tracking, and training and nutrition workflows across a connected client platform.",
    id: "tdt-training",
    layers: ["The client dashboard brings assigned workouts and daily nutrition targets into one view.", "Portion changes recalculate nutrients before a food entry contributes to daily totals.", "Workout prescriptions describe sets and repetitions; food entries track amounts against daily targets."],
    outcome: "Compare logged food with the daily target alongside the prescribed training.",
    tags: ["Full-stack development", "Calculation pipelines", "Client workflows"],
    images: [
      "/project-images/TDT 1.png",
      "/project-images/TDT 2.png",
      "/project-images/TDT 3.png",
      "/project-images/TDT 4.png",
      "/project-images/TDT 6.png",
      "/project-images/TDT 7.png"
    ]
  },
  {
    eyebrow: "B2B web platform",
    title: "RappConsulting",
    description: "I designed and implemented the responsive site, content structure, and contact flows for an executive consulting practice.",
    id: "rappconsulting",
    layers: ["A responsive page hierarchy separates service detail, grant strategy and team profiles.", "Contact links connect service pages to an inquiry path.", "Service descriptions and team biographies are editorial content."],
    outcome: "Move from a consulting need to a relevant offering and a way to get in touch.",
    tags: ["Responsive interfaces", "Content architecture", "B2B web development"],
    images: [
      "/project-images/RAPP 2.png",
      "/project-images/RAPP 3.png",
      "/project-images/RAPP 4.png",
      "/project-images/RAPP 5.png"
    ]
  }
];

export function CaseStudy() {
  return (
    <section className="featured-section" id="featured-architecture" data-reveal>
      <span className="section-crosshair section-crosshair-top" aria-hidden="true">
        +
      </span>
      <div className="featured-heading">
        <SectionHeading label="Selected work" title="Systems in production." />
        <p>Four systems, from market monitoring to field planning. Select a screen to inspect the work.</p>
      </div>
      <div className="relative z-[1] mx-auto w-[var(--container)]">
        {caseStudies.map((project, index) => (
          <CaseStudyItem
            key={project.title}
            index={String(index + 1).padStart(2, '0')}
            kicker={project.eyebrow}
            title={project.title}
            outcome={project.outcome}
            tags={project.tags}
            images={project.images}
            id={project.id} layers={project.layers}
          >
            {project.description}
          </CaseStudyItem>
        ))}
      </div>
    </section>
  );
}
