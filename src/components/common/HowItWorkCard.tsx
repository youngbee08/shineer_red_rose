import React from "react";
import type { HowItWorksCardProps } from "../../lib/interfaces";

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  name,
  id,
  detail,
}) => {
  return (
    <div className="relative pl-12 lg:pl-0">
      <span className="absolute left-4 top-0 h-full w-px bg-linear-to-b from-primary/20 via-primary/10 to-transparent lg:hidden" />
      <div className="absolute left-0 top-5 lg:static">
        <div className="relative">
          <span className="absolute -inset-2 rounded-full bg-primary/12 blur-md" />
          <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-[0_12px_28px_-18px_rgba(231,0,11,0.9)]">
            {id}
          </span>
        </div>
      </div>
      <div className="rounded-3xl border border-secondary-dark/70 bg-white p-5 shadow-[0_18px_45px_-30px_rgba(15,14,20,0.12)] transition duration-300 hover:-translate-y-0.5 sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          Step {String(id).padStart(2, "0")}
        </p>
        <h4 className="mt-3 font-display text-base font-extrabold text-tetiary lg:text-lg">
          {name}
        </h4>
        <p className="mt-2 text-sm leading-7 text-neutral-soft">{detail}</p>
      </div>
    </div>
  );
};

export default HowItWorksCard;
