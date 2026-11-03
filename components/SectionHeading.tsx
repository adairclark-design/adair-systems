export function SectionHeading({ label, title }: { label: string; title: string }) {
  return <header className="studio-heading"><span>{label}</span><h2>{title}</h2></header>;
}
