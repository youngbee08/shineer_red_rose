import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER = "13175313547";

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const onChange =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const canSend = useMemo(
    () => !!(form.fullName.trim() && form.email.trim() && form.message.trim()),
    [form.fullName, form.email, form.message],
  );

  const buildWhatsAppLink = () => {
    const text =
      `Hello, my name is ${form.fullName || "-"}.\n\n` +
      `Email: ${form.email || "-"}\n` +
      `Subject: ${form.subject || "General inquiry"}\n\n` +
      `Message:\n${form.message || "-"}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSend) {
      toast.error("Please fill your name, email, and message.");
      return;
    }

    toast.success("Opening WhatsApp...");
    window.open(buildWhatsAppLink(), "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen  font-sans">
      <section className="pt-16 pb-10 px-6 flex flex-col items-center text-center">
        <h1 className="font-display text-[2.75rem] md:text-6xl font-black text-primary tracking-tight leading-none mb-4">
          Contact Us
        </h1>
        <p className="text-base md:text-lg font-bold text-neutral-dark max-w-xl">
          Any questions or remarks? Just write us a message!
        </p>
      </section>

      {/* Form Section */}
      <section className="px-6 flex justify-center pb-28 relative z-10 w-full">
        <form
          onSubmit={onSubmit}
          className="w-full max-w-[800px] flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col text-left">
              <label className="text-sm font-bold text-neutral-600 mb-1 ml-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={onChange("email")}
                placeholder="Enter a valid email address"
                className="border border-primary/60 text-neutral-800 placeholder:text-neutral-500 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="text-sm font-bold text-neutral-600 mb-1 ml-1">
                Name
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={onChange("fullName")}
                placeholder="Enter your Name"
                className="border border-primary/60 text-neutral-800 placeholder:text-neutral-500 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm font-bold text-neutral-600 mb-1 ml-1">
              Subject
            </label>
            <input
              type="text"
              value={form.subject}
              onChange={onChange("subject")}
              placeholder="Enter the subject"
              className="border border-primary/60 text-neutral-800 placeholder:text-neutral-500 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all"
            />
          </div>

          <div className="flex flex-col text-left">
            <label className="text-sm font-bold text-neutral-600 mb-1 ml-1">
              Message
            </label>
            <textarea
              rows={5}
              value={form.message}
              onChange={onChange("message")}
              placeholder="Your message..."
              className="border border-primary/60 text-neutral-800 placeholder:text-neutral-500 rounded-xl px-6 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-sm font-medium transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canSend}
            className={`mt-2 w-full font-bold tracking-[0.2em] uppercase rounded-xl py-4 text-[13px] transition-all duration-300 ${
              canSend
                ? "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                : "bg-primary/50 text-white cursor-not-allowed shadow-none"
            }`}
          >
            SUBMIT
          </button>
        </form>
      </section>

      <section className="relative w-full  bg-primary/10 pt-12 mt-8 grow">
        <div className="absolute left-0 right-0 top-0 w-full flex justify-center gap-12 md:gap-32 -translate-y-[45%]">
          <Link
            to={`tel:+${WHATSAPP_NUMBER}`}
            className="flex flex-col items-center w-52 text-center group"
          >
            <div className="w-22 h-22 md:w-24 md:h-24 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105">
              <FaPhoneAlt size={34} />
            </div>
            <h3 className="font-extrabold text-neutral-800 tracking-wider uppercase text-xs md:text-[13px] mt-5 mb-1.5">
              Phone (Landline)
            </h3>
            <p className="text-[13px] text-neutral-600 font-medium">
              +{WHATSAPP_NUMBER}
            </p>
          </Link>

          <Link
            to={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            className="flex flex-col items-center w-52 text-center group"
          >
            <div className="w-22 h-22 md:w-24 md:h-24 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105 pl-1">
              <FaWhatsapp size={40} />
            </div>
            <h3 className="font-extrabold text-neutral-800 tracking-wider uppercase text-xs md:text-[13px] mt-5 mb-1.5">
              WhatsApp
            </h3>
            <p className="text-[13px] text-neutral-600 font-medium leading-snug px-2">
              Fastest Response
            </p>
          </Link>
        </div>

        <div className="h-20"></div>
      </section>
    </div>
  );
};

export default Contact;
