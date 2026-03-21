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
      icon: <BiLeaf className="text-base" />,
      detail:
        "Built around carefully selected red botanicals and superfruits without unnecessary extras.",
    },
    {
      name: "Reliable Production Standards",
      icon: <GiFactory className="text-base" />,
      detail:
        "Prepared with quality-minded processes designed to support consistency and trust in every order.",
    },
    {
      name: "Made for Everyday Use",
      icon: <GiAlarmClock className="text-base" />,
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
    <div className="flex flex-col gap-10 lg:gap-14">
      <section className="bg-primary flex items-center justify-center py-7 text-center lg:py-17">
        <div className="flex max-w-3xl flex-col gap-2 px-4 lg:gap-3">
          <h1 className="font-display text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
            About Double RedRose
          </h1>

          <p className="text-xs leading-7 text-white/90 sm:text-sm lg:text-base lg:leading-8">
            Double Red Rose is a wellness supplement designed to support the
            body at the cellular level, helping reduce oxidative stress and
            promote glutathione production for stronger immunity, better
            detoxification, and overall wellness.
          </p>
        </div>
      </section>

      <div className="app-container flex flex-col gap-10 lg:gap-14">
        <section className="flex flex-col gap-8 lg:gap-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <div className="flex w-full items-center justify-center gap-2">
              <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                What the Formula Is Designed to Support
              </h2>
            </div>
            <p className="text-center text-sm leading-7 text-neutral-soft">
              Designed to support your body from within through targeted
              cellular wellness.
            </p>
          </div>

          <div className="flex flex-col lg:items-center justify-between gap-10 lg:flex-row">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 ">
              {formulaSupport.map((item, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-secondary-dark/60 p-4 transition hover:border-primary"
                >
                  <h4 className="text-sm font-semibold text-neutral-dark lg:text-base">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs text-neutral-soft lg:text-sm">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold text-neutral-dark lg:text-4xl">
              Why the Product Experience Feels Different
            </h2>
            <p className="mt-2 text-sm text-neutral-soft lg:text-base">
              The principles that guide everything we do and every product we
              create.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-4">
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
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <div className="w-full flex items-center justify-center gap-2">
              <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                Questions People Ask
              </h2>
            </div>
            <p className="text-center text-sm leading-7 text-neutral-soft">
              Get quick answers to the most common questions about product use,
              consistency, and getting started.
            </p>
          </div>
          <div className="w-full mx-auto flex flex-col gap-3">
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
