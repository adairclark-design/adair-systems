"use client";

import PreviewImage from "./PreviewImage";
import { useState } from "react";
const products = [
  {
    id: "tdt-training",
    name: "TDT Training",
    title: "Nutrition tracking",
    scope: "Food logging · Nutrient totals",
    phones: [
      { src: "/project-images/TDT 1.png", alt: "Client dashboard" },
      { src: "/project-images/TDT 2.png", alt: "Workout prescription" },
      { src: "/project-images/TDT 4.png", alt: "Food portion and nutrient totals" },
    ],
  },
  {
    id: "polyvision",
    name: "PolyVision",
    file: "PolyVision 2.png",
    title: "Market activity",
    scope: "Market feeds · Alert delivery",
    alt: "PolyVision market feed with filters and trader leaderboard",
  },
  {
    id: "acrelogic",
    name: "AcreLogic",
    file: "AcreLogic 3.png",
    title: "Field planning",
    scope: "Spatial layout · Planning rules",
    alt: "AcreLogic field map with editable planting blocks and bed dimensions",
  },
];
export default function EngagementReadout() {
  const [selected, select] = useState(0);
  const product = products[selected];
  const isPhones = Boolean(product.phones);
  return <section className="product-stage" aria-label="Selected product previews">
    <div className="stage-heading"><span>PRODUCT PREVIEW</span><span>0{selected+1} / 03</span></div>
    <div className="stage-frame">
      <div className="stage-chrome"><span aria-hidden="true">● ● ●</span><span>{product.name} / {product.title}</span></div>
      <div key={selected} className={"stage-screen stage-enter"+(isPhones?" phones stage-mobile":"")}>{product.phones?product.phones.map((phone)=><PreviewImage sizes="160px" key={phone.src} src={phone.src} alt={phone.alt} fetchPriority={selected===0?"high":"auto"}/>):<PreviewImage src={"/project-images/"+product.file} alt={product.alt} fetchPriority={selected===0?"high":"auto"}/>}</div>
      <div className="stage-detail" aria-live="polite"><div className="layer-tags">{product.scope.split(" · ").map(t=><span key={t}>{t}</span>)}</div><a href={"#"+product.id}>Inspect system ↓</a></div>
    </div>
    <div className="stage-switch" role="group" aria-label="Choose a product">{products.map((p,i)=><button type="button" key={p.name} aria-pressed={selected===i} onClick={()=>select(i)}>{p.name}</button>)}</div>
  </section>;
}
