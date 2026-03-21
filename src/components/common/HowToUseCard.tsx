import React from "react";
import type { HowToUseCardProps } from "../../lib/interfaces";

const HowToUseCard: React.FC<HowToUseCardProps> = ({
  step,
  title,
  description,
}) => {
  return (
    <div className="group h-full rounded-3xl border border-secondary-dark/70 bg-white p-5 shadow-[0_16px_40px_-30px_rgba(15,14,20,0.12)] transition duration-300 hover:-translate-y-0.5">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-white shadow-[0_12px_28px_-18px_rgba(231,0,11,0.9)]">
        {step}
      </span>

      <h4 className="mt-4 font-display text-base font-extrabold text-tetiary">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-7 text-neutral-soft">{description}</p>
    </div>
  );
};

export default HowToUseCard;
