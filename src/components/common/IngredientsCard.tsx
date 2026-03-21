import React from "react";
import type { IngredientCardProps } from "../../lib/interfaces";

const IngredientCard: React.FC<IngredientCardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl
        shadow-sm transition-all duration-300 ease-out
        hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5
        aspect-[7/5] sm:aspect-[3/4] md:aspect-[1/1]
      `}
    >
      <img
        src={image}
        alt={`${title} – natural ingredient`}
        className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110`}
        loading="lazy"
      />

      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 group-hover:via-black/60`}
      />

      <div className="relative z-10 flex h-full flex-col justify-end p-4 sm:p-5 md:p-6 text-white">
        <h4 className="font-display text-base font-semibold leading-tight drop-shadow-md sm:text-lg md:text-xl">
          {title}
        </h4>
        <p className="mt-1.5 text-xs leading-5 opacity-90 drop-shadow-sm sm:mt-2 sm:text-sm sm:leading-6 md:text-base md:leading-7">
          {description}
        </p>
      </div>
    </div>
  );
};

export default IngredientCard;
