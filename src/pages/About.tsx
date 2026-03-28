import React from "react";
import BenefitCard from "../components/common/BenefitCard";
import type { BenefitCardProps } from "../lib/interfaces";
import { GiFactory, GiAlarmClock } from "react-icons/gi";
import FaqCard from "../components/common/FaqCard";
import { BiLeaf } from "react-icons/bi";

const About: React.FC = () => {
  const values: BenefitCardProps[] = [
    {
      name: "Clean Ingredient Focus",
      icon: <BiLeaf />,
      detail:
        "Built around carefully selected red botanicals and superfruits without unnecessary extras.",
    },
    {
      name: "Reliable Production Standards",
      icon: <GiFactory />,
      detail:
        "Prepared with quality-minded processes designed to support consistency and trust in every order.",
    },
    {
      name: "Made for Everyday Use",
      icon: <GiAlarmClock />,
      detail:
        "Created to fit naturally into a regular routine so wellness support feels practical and sustainable.",
    },
  ];

  const faqs = [
    {
      question: "Can this fit into a daily wellness routine?",
      answer:
        "Yes. It is designed to be part of a consistent wellness lifestyle when used as directed.",
    },
    {
      question: "Can beginners join the affiliate opportunity?",
      answer:
        "Yes. You do not need prior experience to begin, and the process is structured to be approachable.",
    },
    {
      question: "How long should I stay consistent with use?",
      answer:
        "Consistency matters most. Individual experiences vary, but ongoing routine use is encouraged.",
    },
    {
      question: "What is the easiest way to get started?",
      answer:
        "Start by choosing your preferred path, product purchase or affiliate signup, and follow the guided steps.",
    },
  ];

  const formulaSupport = [
    {
      title: "Cellular Support",
      desc: "Helps support the body against daily oxidative stress and internal imbalance.",
    },
    {
      title: "Antioxidant Defense",
      desc: "Supports the body's natural response to free radicals and wellness stressors.",
    },
    {
      title: "Glutathione Support",
      desc: "Encourages support for one of the body's key antioxidant systems.",
    },
    {
      title: "Everyday Vitality",
      desc: "Designed to fit into a routine that supports steady wellness and daily energy.",
    },
  ];

  return (
    <div className="flex flex-col gap-10 lg:gap-14 pb-20">
      <section className="relative overflow-hidden bg-linear-to-br from-primary to-primary/85 flex items-center justify-center py-16 text-center lg:py-24 shadow-inner">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-xl blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-xl blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 px-6 md:gap-5">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl drop-shadow-sm tracking-tight">
            About Double RedRose
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg font-medium drop-shadow-sm">
            Double Red Rose is a premium wellness supplement precisely crafted
            to support your body at the cellular level, helping minimize
            oxidative stress and ignite natural vitality.
          </p>
        </div>
      </section>

      <div className="app-container flex flex-col gap-12 lg:gap-20">
        <section className="flex flex-col gap-6 lg:gap-10">
          <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
            <h2 className="text-2xl font-semibold text-primary lg:text-4xl tracking-tight">
              What The Formula Supports
            </h2>
            <p className="text-left text-sm leading-7 text-neutral-soft">
              Designed to nourish your body from within through targeted
              cellular wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 grow">
            {formulaSupport.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-primary/10 bg-white p-6 md:p-8 shadow-xl shadow-primary/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-4 w-4 rounded-xl bg-primary/20" />
                  <h4 className="text-base font-bold text-neutral-dark lg:text-lg">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm font-medium leading-relaxed text-neutral-soft">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:gap-10">
          <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
            <h2 className="text-2xl font-semibold text-primary lg:text-4xl tracking-tight">
              Why The Experience Is Different
            </h2>
            <p className="text-left text-sm leading-7 text-neutral-soft">
              The foundational principles that heavily dictate everywhere we
              source and every product we finalize.
            </p>
          </div>
          <div className="flex md:flex-row flex-col gap-4 overflow-x-auto scroll-smooth py-2 scrollbar-thin">
            {values.map((value, index) => (
              <BenefitCard
                name={value.name}
                icon={value.icon}
                detail={value.detail}
                key={index}
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
            <h2 className="text-2xl font-semibold text-primary lg:text-4xl tracking-tight">
              Questions People Ask
            </h2>
            <p className="text-left text-sm leading-7 text-neutral-soft">
              Get quick precise answers to the most common questions regarding
              product integration and getting everything started.
            </p>
          </div>
          <div className="w-full  flex flex-col gap-4 sm:gap-5 mt-2">
            {faqs.map((faq) => (
              <FaqCard
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
