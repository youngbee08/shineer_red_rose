import React, { useMemo, useState } from "react";
import { toast } from "sonner";

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
      `Subject: ${form.subject || "General enquiry"}\n\n` +
      `Message:\n${form.message || "-"}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSend) {
      toast.error("Please fill your name, email, and message.");
      return;
    }

    window.open(buildWhatsAppLink(), "_blank");
  };

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <section className="bg-primary flex items-center justify-center py-7 text-center lg:py-17">
        <div className="flex max-w-3xl flex-col gap-2 px-4 lg:gap-3">
          <h1 className="font-display text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
            Contact RedRose Support
          </h1>

          <p className="text-xs leading-7 text-white/90 sm:text-sm lg:text-base lg:leading-8">
            Easily reach out for product guidance, order help, or affiliate
            support.
          </p>
        </div>
      </section>

      <div className="app-container flex flex-col gap-10 lg:gap-14">
        <section className="flex flex-col gap-8 lg:gap-14">
          <div className="mx-auto max-w-3xl flex flex-col items-center gap-3 text-center">
            <h2 className="text-2xl lg:text-4xl font-extrabold text-neutral-dark">
              Send Your Details
            </h2>
            <p className="text-sm lg:text-base text-neutral-soft leading-relaxed">
              Fill out the form below so your message is structured and ready
              before continuing on WhatsApp.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="mx-auto w-full max-w-2xl flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-soft">
                  Full Name
                </label>
                <input
                  value={form.fullName}
                  onChange={onChange("fullName")}
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-soft">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={onChange("email")}
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-soft">
                Subject
              </label>
              <input
                value={form.subject}
                onChange={onChange("subject")}
                placeholder="How can i join the community?"
                className="mt-2 w-full rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-neutral-soft">
                Message
              </label>
              <textarea
                rows={6}
                value={form.message}
                onChange={onChange("message")}
                placeholder="How does the..."
                className="mt-2 w-full resize-none rounded-xl border border-secondary-dark/70 bg-white px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <button
              type="submit"
              disabled={!canSend}
              className={`mt-2 w-full rounded-xl px-5 py-3 text-sm font-bold shadow-md transition ${canSend ? "bg-primary text-white hover:brightness-110" : "bg-primary/60 text-white/90 cursor-not-allowed"}`}
            >
              Send message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
