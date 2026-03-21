import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

interface FaqCardProps {
  question: string;
  answer: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-[1.5rem] border border-primary/15 bg-white shadow-[0_12px_30px_-24px_rgba(15,14,20,0.12)]">
        <div className="px-4 sm:px-5">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between gap-4 py-4 text-left"
          >
            <h4 className="font-display text-sm font-bold text-tetiary sm:text-base">
              {question}
            </h4>

            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white transition duration-200">
              {open ? (
                <BiChevronUp className="text-base" />
              ) : (
                <BiChevronDown className="text-base" />
              )}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="border-t border-primary/10 pb-4 pt-3 text-xs leading-6 text-neutral-soft sm:text-sm">
                  {answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default FaqCard;
