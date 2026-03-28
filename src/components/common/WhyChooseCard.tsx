import React from "react";
import type { WhyChooseCardProps } from "../../lib/interfaces";

const WhyChooseCard: React.FC<WhyChooseCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="group h-full rounded-xl border border-secondary-dark/70 bg-white p-6 shadow-[0_18px_45px_-30px_rgba(15,14,20,0.12)] transition duration-300 hover:-translate-y-0.5">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/10 bg-linear-to-br from-primary/12 to-white text-primary">
        {icon}
      </div>

      <h4 className="mt-4 font-display text-lg font-extrabold text-tetiary">
        {title}
      </h4>

      <p className="mt-2 text-sm leading-7 text-neutral-soft">{description}</p>
    </div>
  );
};

export default WhyChooseCard;
