import React from "react";
import type { BenefitCardProps } from "../../lib/interfaces";

const BenefitCard: React.FC<BenefitCardProps> = ({ name, icon, detail}) => {

  return (
    <div
      className={`
        group relative overflow-hidden 
        p-6 md:p-8 shrink-0 transition-transform duration-300 hover:scale-[1.02]
        rounded-xl min-w-[270px] md:min-w-[370px] lg:min-w-[470px] h-[40vh] min-h-[300px] max-h-[400px]
        flex flex-col justify-end shadow-md border border-primary shadow-primary/20
      `}
    >
      <div
        className="absolute top-6 right-6 text-[100px] md:text-[160px] text-primary/20 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12"
      >
        {icon}
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <h3 className="font-display text-4xl md:text-5xl font-extrabold text-primary tracking-tight leading-tight">
          {name}
        </h3>
        
        <p className="text-primary/70 text-base md:text-lg font-medium leading-relaxed max-w-[90%] mt-2">
          {detail}
        </p>
      </div>
    </div>
  );
};

export default BenefitCard;
