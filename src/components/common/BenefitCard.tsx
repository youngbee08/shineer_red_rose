import React from "react";
import type { BenefitCardProps } from "../../lib/interfaces";

const BenefitCard: React.FC<BenefitCardProps> = ({ name, icon, detail }) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl border border-gray-200/80 
        bg-white p-6 shadow-sm transition-all duration-300 
        hover:shadow-md hover:border-gray-300/90 
        focus-within:shadow-md focus-within:border-gray-300/90
        md:p-7
      `}
    >
      <div className="mb-5 md:mb-0 flex items-start gap-5 lg:flex-row flex-col">
        <div
          className={`
            inline-flex h-14 w-14 shrink-0 items-center justify-center 
            rounded-lg bg-primary/10 text-primary transition-colors 
            group-hover:bg-primary/15
          `}
        >
          <div className="text-2xl md:text-3xl">{icon}</div>
        </div>

        <div className="flex-1">
          <h3
            className={`
              font-display text-lg font-semibold leading-tight text-gray-900 
              md:text-xl
            `}
          >
            {name}
          </h3>
          <p
            className={`
              mt-2.5 text-sm leading-relaxed text-gray-600 
              md:mt-3 md:text-base
            `}
          >
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;
