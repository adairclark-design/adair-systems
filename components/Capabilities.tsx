import { SectionHeading } from "./SectionHeading";
const capabilities = [
  {
    meta: "[ FRONTEND & PRODUCT ]",
    title: "Product interfaces & applications",
    body: "I build responsive web and mobile experiences with Next.js, React, TypeScript, and deliberate CSS and motion systems.",
    stat: "Web · Mobile · PWA",
    className: "md:col-span-2"
  },
  {
    meta: "[ BACKEND & REAL-TIME ]",
    title: "APIs & connected systems",
    body: "I implement Python and Node.js services, REST and WebSocket APIs, authentication, and real-time data ingestion.",
    stat: "FastAPI · Node.js · APIs",
    className: "md:col-span-1"
  },
  {
    meta: "[ DATA & LOGIC ]",
    title: "Data architecture & rule engines",
    body: "I design database schemas and implement rule-based decisions, automated alerts, and domain-specific calculation pipelines.",
    stat: "Schemas · Rules · Calculations",
    className: "md:col-span-1"
  },
  {
    meta: "[ SYSTEMS & RELEASE ]",
    title: "Architecture through deployment",
    body: "I turn business requirements into system boundaries and data contracts, then build, integrate, test, and deploy the implementation.",
    stat: "Contracts · Tests · Deployment",
    className: "md:col-span-2"
  }
];

const artifacts = [
  [["Surface","Next.js / React Native"],["State","Typed view props"],["Layout","Responsive CSS"]],
  [["Boundary","Request / response contracts"],["Transport","REST / WebSocket"],["Runtime","Python / Node.js"]],
  [["Structure","Relational records"],["Constraints","Keys / relationships"],["Logic","Rules / calculations"]],
  [["Contract","Acceptance criteria"],["Verification","Integration tests"],["Release","Static / cloud"]]
];
export function Capabilities() {
  return (
    <section className="capabilities-section" id="capabilities" data-reveal>
      <span className="section-crosshair section-crosshair-top" aria-hidden="true">
        +
      </span>
      <div className="capabilities-heading">
        <SectionHeading label="Capabilities" title="Engineering across the stack." />
      </div>
      <div className="bento-grid grid-cols-1 md:grid-cols-3">
        {capabilities.map((capability, index) => (
          <article data-reveal style={{ '--rv': `${index * 70}ms` } as React.CSSProperties}
            className={`bento-card magic-card ${capability.className}`}
            key={capability.title}
          >
            <span className="mono-tag bento-meta">{capability.meta}</span>
            <h3>{capability.title}</h3>
            <p>{capability.body}</p>
            <dl className="tech-matrix">{artifacts[index].map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><span className="bento-stat">{capability.stat}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
