import { SectionHeading } from "./SectionHeading";
const stages=[
 ["Specify","Define the workflow, boundaries and acceptance criteria.","System contract"],
 ["Build","Connect the interface, service and data layer for one complete workflow.","Working slice"],
 ["Test","Exercise the normal path, invalid inputs and recovery across those boundaries.","Integration checks"],
 ["Ship","Verify the release against the contract and document how to operate it.","Verified release"]
];
export function Methodology(){return <section id="methodology" className="process"><SectionHeading label="Engineering process" title="From contract to release." /><ol>{stages.map(([name,body,artifact],i)=><li key={name}><small>0{i+1} / {name.toUpperCase()}</small><h3>{artifact}</h3><p>{body}</p></li>)}</ol></section>}
