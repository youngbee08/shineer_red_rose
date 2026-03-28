import React, { useEffect } from "react";
import { FiDownload, FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

type AttachmentModalProps = {
  image: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  allowDownload?: boolean;
};

const AttachmentModal: React.FC<AttachmentModalProps> = ({
  image,
  isOpen,
  onClose,
  title = "Attachment Preview",
  allowDownload = false,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={onClose}
        >
          {/* Controls */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center gap-3 z-50"
          >
            {allowDownload && image && (
              <a
                href={image}
                download
                className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/25 hover:scale-105 transition-all outline-none border border-white/20 backdrop-blur-md"
                aria-label="Download attachment"
                title="Download"
                onClick={(e) => e.stopPropagation()}
              >
                <FiDownload className="text-lg md:text-xl" />
              </a>
            )}

            <button
              type="button"
              onClick={onClose}
              className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/25 hover:scale-105 transition-all outline-none border border-white/20 backdrop-blur-md"
              aria-label="Close modal"
              title="Close"
            >
              <FiX className="text-xl md:text-2xl" />
            </button>
          </motion.div>

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, type: "spring", bounce: 0.25 }}
            className="relative z-10 w-[95%] max-w-5xl h-full max-h-[85vh] flex flex-col justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {image ? (
              <div className="relative flex flex-col items-center">
                <img
                  src={image}
                  alt={title || "Attachment"}
                  className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "";
                    e.currentTarget.alt = "Unable to load attachment";
                  }}
                />
                
                {/* Title overlay floating below image */}
                <div className="absolute -bottom-12 left-0 right-0 flex justify-center translate-y-4">
                  <span className="text-white/80 font-medium text-sm md:text-base tracking-wider bg-black/40 px-5 py-2 rounded-xl backdrop-blur-md border border-white/10 shadow-lg">
                    {title}
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-24 px-12 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 text-center flex flex-col gap-4">
                <span className="text-4xl">🖼️</span>
                <span className="text-lg text-white/60 font-medium tracking-wide">
                  No attachment available
                </span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AttachmentModal;
