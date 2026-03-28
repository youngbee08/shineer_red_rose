import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BiPlus, BiMinus } from "react-icons/bi";

interface FaqCardProps {
  question: string;
  answer: string;
}

const FaqCard: React.FC<FaqCardProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div 
      className={`w-full overflow-hidden transition-all duration-300 rounded-xl md:rounded-xl border ${
        open 
          ? 'border-primary/40 bg-primary/5 shadow-md shadow-primary/5' 
          : 'border-secondary-dark/50 bg-white hover:border-primary/30 shadow-sm'
      }`}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 p-5 md:p-6 text-left outline-none"
      >
        <h4 
          className={`font-display text-base md:text-lg font-bold transition-colors duration-300 pr-4 ${
            open ? 'text-primary' : 'text-neutral-dark'
          }`}
        >
          {question}
        </h4>

        <div 
          className={`flex shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
            open 
              ? 'bg-primary text-white scale-110 h-10 w-10 rotate-180 shadow-md shadow-primary/20' 
              : 'bg-primary/10 text-primary h-10 w-10 rotate-0 hover:bg-primary hover:text-white'
          }`}
        >
          {open ? (
            <BiMinus className="text-xl" />
          ) : (
            <BiPlus className="text-xl" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden px-5 md:px-6"
          >
            <div className="pb-6 pt-1 text-sm md:text-[15px] leading-relaxed text-neutral-soft font-medium">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqCard;
