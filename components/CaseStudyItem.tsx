"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import PreviewImage from "./PreviewImage";
import { createPortal } from "react-dom";

const captions: Record<string, string> = {
  "/project-images/PolyVision 2.png": "Live market feed, filters, and trader leaderboard",
  "/project-images/PolyVision 3.png": "Trader profiles ranked by profit and loss",
  "/project-images/PolyVision 4.png": "Market categories, prices, and liquidity",
  "/project-images/AcreLogic 1.png": "Planning entry screen",
  "/project-images/AcreLogic 2.png": "Crop catalog with search and growing requirements",
  "/project-images/AcreLogic 3.png": "Map-based bed layout and dimension controls",
  "/project-images/TDT 1.png": "Client dashboard with training and nutrition targets",
  "/project-images/TDT 2.png": "Assigned workout, sets, repetitions, and coaching cues",
  "/project-images/TDT 3.png": "Daily nutrition targets and food logging",
  "/project-images/TDT 4.png": "Food search, portion controls, and nutrient totals",
  "/project-images/TDT 6.png": "Training service booking options",
  "/project-images/TDT 7.png": "Training history calendar and session details",
  "/project-images/RAPP 2.png": "Consulting vision and service overview",
  "/project-images/RAPP 3.png": "Service navigation and detailed offering",
  "/project-images/RAPP 4.png": "Grant strategy content and supporting graphic",
  "/project-images/RAPP 5.png": "Team profiles and contact section"
};

type Props = {
  index: string; kicker: string; title: string; outcome?: string;
  tags?: string[]; images?: string[]; id: string; layers: string[]; children: ReactNode;
};

function ScreenshotViewer({ images, title, initial, onClose }: {
  images: string[]; title: string; initial: number; onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(initial);
  const move = (step: number) => setActive(i => (i + step + images.length) % images.length);
  useEffect(() => {
    const element = dialog.current!;
    const trigger = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      trigger?.focus();
    };
  }, []);
  return createPortal(
    <dialog ref={dialog} className="case-dialog" aria-label={`${title} screenshot viewer`}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={event => {
        if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
      }}>
      <div className="case-dialog__toolbar">
        <span aria-live="polite">{title} · {active + 1} / {images.length}</span>
        <button type="button" onClick={onClose} autoFocus aria-label="Close screenshot viewer">Close ×</button>
      </div>
      <img className="case-dialog__image" src={images[active]} alt={`${title}: ${captions[images[active]]}`} />
      {images.length > 1 && <div className="case-dialog__controls">
        <button type="button" onClick={() => move(-1)}>← Previous</button>
        <a href={images[active]} target="_blank" rel="noreferrer">Open full image ↗</a>
        <button type="button" onClick={() => move(1)}>Next →</button>
      </div>}
    </dialog>, document.body
  );
}

export default function CaseStudyItem({id,index,kicker,title,outcome,tags=[],images=[],layers,children}:Props) {
  const [active,setActive]=useState<number|null>(null);
  const phones=id==="tdt-training";
  const [selected,select]=useState(id==="acrelogic"?2:0);
  const lead=phones?[0,1,3]:[selected];
  return <article id={id} className="work-spread">
    <header><small>{index} / {kicker}</small><h3>{title}</h3><p>{children}</p></header>
    <div className="work-grid"><div>
      <div className={phones?"work-lead phones":"work-lead"}>{lead.map(i=><button type="button" key={i} onClick={()=>setActive(i)} aria-haspopup="dialog" aria-label={"Enlarge "+captions[images[i]]}><PreviewImage sizes={phones?"190px":undefined} src={images[i]} loading="lazy" alt={captions[images[i]]}/></button>)}</div>
      <p className="gallery-caption" aria-live="polite">{phones?"Client dashboard / Workout / Nutrition":captions[images[selected]]} · Select image to enlarge</p>
      <div className="work-index">{images.map((src,i)=>phones && lead.includes(i)?null:<button type="button" key={src} aria-pressed={phones?undefined:selected===i} aria-haspopup={phones?"dialog":undefined} aria-label={(phones?"Enlarge ":"Preview ")+captions[src]} onClick={()=>phones?setActive(i):select(i)}><PreviewImage thumbnail src={src} alt="" loading="lazy" /><small>{String(i+1).padStart(2,"0")}</small><span>{captions[src]}</span><i aria-hidden="true">{phones?"⤢":selected===i?"✓":"→"}</i></button>)}</div>
    </div><div className="work-notes"><small>SYSTEM LAYERS</small><dl>{layers.map((v,i)=><div key={v}><dt>{["Interface","Service","Data"][i]}</dt><dd>{v}</dd></div>)}</dl><small>WORKFLOW OUTCOME</small><p>{outcome}</p><div className="layer-tags">{tags.map(t=><span key={t}>{t}</span>)}</div></div></div>
    {active!==null&&<ScreenshotViewer images={images} title={title} initial={active} onClose={()=>setActive(null)}/>}
  </article>;
}
