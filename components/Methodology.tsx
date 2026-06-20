"use client";

import { motion } from "framer-motion";
import { FileCode2, Rocket, ShieldCheck, Workflow } from "lucide-react";

const stages = [
  {
    number: "01",
    icon: FileCode2,
    title: "Specify the system",
    body: "Business requirements become an executable architecture brief: boundaries, data contracts, constraints, acceptance criteria, and the order of operations."
  },
  {
    number: "02",
    icon: Workflow,
    title: "Orchestrate specialist agents",
    body: "Focused agents advance product, interface, backend, data, and testing workstreams in parallel with tightly controlled context and responsibilities."
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Integrate and govern",
    body: "I reconcile outputs, resolve architectural conflicts, review security boundaries, and enforce one coherent engineering standard across the entire build."
  },
  {
    number: "04",
    icon: Rocket,
    title: "Validate and deploy",
    body: "The system is tested against real workflows, refined at the integration points, and released with the maintainability expected of production software."
  }
];

const operatingPrinciples = [
  { label: "Parallel", value: "Multiple engineering workstreams" },
  { label: "Governed", value: "Human review at every boundary" },
  { label: "Accountable", value: "One technical director" }
];

export function Methodology() {
  return (
    <section className="relative border-y border-white/[0.07] py-24 sm:py-28" id="methodology">
      <span className="section-crosshair section-crosshair-top" aria-hidden="true">
        +
      </span>

      <div className="mx-auto w-[var(--container)]">
        <div className="grid items-end gap-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.76, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mono-tag text-xs text-cyan-100/70">[ AGENTIC METHODOLOGY ]</span>
            <h2 className="mt-6 max-w-[13ch] text-4xl font-extrabold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              Direction is the engineering multiplier.
            </h2>
          </motion.div>

          <motion.p
            className="m-0 max-w-2xl text-base leading-7 text-slate-300/75 sm:text-lg sm:leading-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            I translate business intent into executable system specifications, direct specialized AI agents across the stack, and integrate their work into one production-grade platform.
          </motion.p>
        </div>

        <motion.div
          className="mt-14 grid overflow-hidden rounded-[8px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.025)),rgba(7,7,15,0.72)] shadow-[0_36px_120px_rgba(0,0,0,0.38),0_0_72px_rgba(100,92,255,0.08)] backdrop-blur-2xl lg:grid-cols-[0.9fr_1.1fr]"
          initial={{ opacity: 0, y: 42 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex flex-col justify-between border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
            <div>
              <span className="mono-tag text-xs text-slate-400">[ OPERATING MODEL ]</span>
              <h3 className="mt-8 max-w-[12ch] text-3xl font-extrabold leading-[1.08] text-white sm:text-4xl">
                AI provides parallel execution. I provide technical judgment.
              </h3>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-300/70">
                The advantage is not generated code. It is disciplined orchestration: the right agents, the right context, explicit system constraints, and senior review at every integration point.
              </p>
            </div>

            <div className="mt-10 border-l-2 border-cyan-300/55 pl-5 text-sm leading-6 text-slate-300/75">
              Faster iteration without outsourcing architecture, security, or accountability to the model.
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {stages.map((stage, index) => {
              const Icon = stage.icon;

              return (
                <motion.article
                  className="grid gap-5 p-7 sm:grid-cols-[48px_1fr] sm:p-8"
                  key={stage.number}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.55 }}
                  transition={{ duration: 0.62, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.055] text-cyan-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                    <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="mono-tag text-[0.68rem] text-cyan-200/60">{stage.number}</span>
                      <h4 className="m-0 text-lg font-bold text-white">{stage.title}</h4>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300/68">{stage.body}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-4 grid overflow-hidden rounded-[8px] border border-white/[0.08] bg-white/[0.025] md:grid-cols-3 md:divide-x md:divide-white/[0.08]">
          {operatingPrinciples.map((principle) => (
            <div className="border-b border-white/[0.08] px-6 py-5 last:border-b-0 md:border-b-0" key={principle.label}>
              <span className="mono-tag text-[0.68rem] text-cyan-200/60">{principle.label}</span>
              <strong className="mt-2 block text-sm font-semibold text-slate-200">{principle.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
