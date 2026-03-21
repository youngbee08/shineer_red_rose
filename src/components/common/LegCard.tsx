import type React from "react";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { Link } from "react-router-dom";
import type { LegCardProps } from "../../lib/interfaces";

const LegCard: React.FC<LegCardProps> = ({
  title,
  description,
  cta,
  href,
  onClick,
  icon,
}) => {
  return (
    <div className="group h-full rounded-4xl border border-secondary-dark/70 bg-white p-5 shadow-[0_16px_34px_-28px_rgba(15,14,20,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-30px_rgba(15,14,20,0.18)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-neutral-dark">
            {title}
          </h3>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-primary">
          {icon ? icon : <HiArrowTrendingUp className="text-xl" />}
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sm leading-7 text-neutral-soft">{description}</p>
      </div>

      <div className="mt-6">
        {href ? (
          <Link
            to={href}
            target="_blank"
            className=" py-2 items-center justify-center rounded-[1.75rem] bg-primary px-8 text-base font-semibold text-white transition hover:brightness-110 inline-flex w-full"
            download={cta === "Download PDF" && true}
          >
            {cta}
          </Link>
        ) : (
          <button
            type="button"
            onClick={onClick}
            className=" py-2 items-center justify-center rounded-[1.75rem] bg-primary px-8 text-base font-semibold text-white transition hover:brightness-110 inline-flex w-full"
          >
            {cta}
          </button>
        )}
      </div>
    </div>
  );
};

export default LegCard;
