"use client";

import { SectionHeading } from "./SectionHeading";
import { useState } from "react";

export function Footer() {
  const [status, setStatus] = useState("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hello@adair.systems");
    } catch { setStatus("Select the address to copy it manually."); return; }
    setStatus("Address copied.");

  };

  return <footer className="contact-panel"><SectionHeading label="Contact" title="Have a system to build?" /><p>Tell me about the role, the product, or the workflow you need to connect.</p><div className="contact-actions"><a href="mailto:hello@adair.systems">hello@adair.systems ↗</a><button onClick={handleCopyEmail} >Copy address</button><span role="status">{status}</span></div><div className="contact-base"><span>© {new Date().getFullYear()} Adair Systems</span><a href="https://github.com/adairclark-design">GitHub ↗</a><a href="https://www.linkedin.com/in/adair-clark-0380b9239">LinkedIn ↗</a></div></footer>;
}
