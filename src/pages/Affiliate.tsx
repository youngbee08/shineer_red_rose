import React from "react";
import BenefitCard from "../components/common/BenefitCard";
import type { BenefitCardProps } from "../lib/interfaces";

import LegCard from "../components/common/LegCard";
import FaqCard from "../components/common/FaqCard";
import { HiOutlineDocumentText } from "react-icons/hi";
import { GiMoneyStack, GiToolbox, GiCheckMark } from "react-icons/gi";

const Affiliate: React.FC = () => {
  const values: BenefitCardProps[] = [
    {
      name: "Income-Focused Opportunity",
      icon: <GiMoneyStack className="text-base" />,
      detail:
        "Start with a product people can understand and build income gradually through consistent sharing.",
    },
    {
      name: "Simple Tools to Get Started",
      icon: <GiToolbox className="text-base" />,
      detail:
        "Use ready-made materials and a clearer structure to begin promoting with more confidence.",
    },
    {
      name: "A Product You Can Stand Behind",
      icon: <GiCheckMark className="text-base" />,
      detail:
        "It is easier to recommend a product when the quality story, formula focus, and message feel trustworthy.",
    },
  ];

  const faqs = [
    {
      question: "Can a beginner start as an affiliate?",
      answer:
        "Yes. The process is structured to be approachable, even if this is your first time building with a referral model.",
    },
    {
      question: "Do I need to use the product first?",
      answer:
        "Using the product helps you speak more confidently from personal experience, which often makes sharing easier.",
    },
    {
      question: "What do I need before joining?",
      answer:
        "A clear decision to begin, a willingness to stay consistent, and the readiness to follow the available guidance.",
    },
    {
      question: "How do I choose the right placement?",
      answer:
        "You can choose the leg that best suits your strategy, depending on whether you want faster momentum or balance.",
    },
  ];

  return (
    <div className="flex flex-col gap-10 lg:gap-14">
      <section className="bg-primary flex items-center justify-center py-7 text-center lg:py-17">
        <div className="flex max-w-3xl flex-col gap-2 px-4 lg:gap-3">
          <h1 className="font-display text-xl font-extrabold text-white sm:text-2xl lg:text-3xl">
            Build with the RedRose Opportunity
          </h1>

          <p className="text-xs leading-7 text-white/90 sm:text-sm lg:text-base lg:leading-8">
            Understand the affiliate opportunity at a glance, what you gain, how
            to start, and the exact steps to begin earning.{" "}
          </p>
        </div>
      </section>

      <div className="app-container flex flex-col gap-10 lg:gap-14">
        <section className="flex flex-col gap-8 lg:gap-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <div className="flex w-full items-center justify-center gap-2">
              <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                What You Are Joining
              </h2>
            </div>
            <p className="text-center text-sm leading-7 text-neutral-soft">
              Start here to understand the opportunity before choosing your
              placement or downloading the compensation details.
            </p>
          </div>

          <div className="flex flex-col lg:items-center justify-between gap-10 lg:flex-row">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:">
              {[
                {
                  title: "Product-Led Entry",
                  desc: "Begin with a product that is easier to understand, use, and recommend.",
                },
                {
                  title: "Network Growth",
                  desc: "Grow by sharing your experience and expanding your referral reach steadily.",
                },
                {
                  title: "Structured Placement",
                  desc: "Choose where you want to enter so your growth strategy feels intentional.",
                },
                {
                  title: "Long-Term Potential",
                  desc: "Build momentum over time through consistency, trust, and clearer follow-through.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-3xl border border-secondary-dark/60 p-4 transition hover:border-primary"
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
              Why This Opportunity Is Easy to Share
            </h2>
            <p className="mt-2 text-sm text-neutral-soft lg:text-base">
              Clear benefits that make it simple to understand, trust, and
              confidently recommend.
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
            <div className="flex w-full items-center justify-center gap-2">
              <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                Choose Your Placement
              </h2>
            </div>
            <p className="text-center text-sm leading-7 text-neutral-soft">
              Pick the entry path that best fits the kind of growth strategy you
              want to build from the start, or download the full compensation
              plan to see all details.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <LegCard
              title="Left Leg"
              description="Position yourself in the primary spillover leg for maximum team momentum."
              cta="Join Left Leg"
              href="https://www.affluenceglobaldream.com/en/olawolu66/us/agl/ref-member/LEFT"
            />

            <LegCard
              title="Right Leg"
              description="Ideal for balanced team building and effectively maximizing personal bonus overrides."
              cta="Join Right Leg"
              href="https://www.affluenceglobaldream.com/en/olawolu66/us/agl/ref-member/RIGHT"
            />

            <LegCard
              title="Compensation Guide"
              description="See the reward structure clearly and download the full guide to make an informed decision."
              cta="Download PDF"
              href="/complan.pdf"
              icon={<HiOutlineDocumentText className="text-xl" />}
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:gap-12">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
            <div className="flex w-full items-center justify-center gap-2">
              <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                Common Questions
              </h2>
            </div>
            <p className="text-center text-sm leading-7 text-neutral-soft">
              Answer the usual questions first so visitors know what to expect
              before they take action.
            </p>
          </div>
          <div className="mx-auto flex w-full flex-col gap-3">
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

export default Affiliate;
