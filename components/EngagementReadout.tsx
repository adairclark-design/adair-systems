"use client";

import { useState } from "react";
const products = [
  {name:"PolyVision", file:"PolyVision 2.png", title:"Market activity", scope:"Market feeds · Alert delivery", alt:"PolyVision market feed with filters and trader leaderboard"},
  {name:"AcreLogic", file:"AcreLogic 3.png", title:"Field planning", scope:"Spatial layout · Planning rules", alt:"AcreLogic field map with editable planting blocks and bed dimensions"},
  {name:"TDT Training", file:"TDT 4.png", title:"Nutrition tracking", scope:"Food logging · Nutrient totals", alt:"TDT mobile food log showing a portion calculation and daily nutrient totals"}
];
export default function EngagementReadout() {
  const [selected, select] = useState(0);
  const product = products[selected];
  return <section className="product-stage" aria-label="Selected product previews">
    <div className="stage-heading"><span>PRODUCT PREVIEW</span><span>0{selected+1} / 03</span></div>
    <div className="stage-frame">
      <div className="stage-chrome"><span aria-hidden="true">● ● ●</span><span>{product.name} / {product.title}</span></div>
      <div className={'stage-screen'+(selected===2?' stage-mobile':'')}><img key={product.file} src={'/project-images/'+product.file} alt={product.alt} fetchPriority={selected===0?'high':'auto'}/></div>
      <p aria-live="polite">{product.scope}</p>
    </div>
    <div className="stage-switch" role="group" aria-label="Choose a product">{products.map((p,i)=><button type="button" key={p.name} aria-pressed={selected===i} onClick={()=>select(i)}>{p.name}</button>)}</div>
  </section>;
}
