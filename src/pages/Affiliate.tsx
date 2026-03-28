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
      icon: <GiMoneyStack />,
      detail:
        "Start with a product people can understand and build income gradually through consistent sharing.",
    },
    {
      name: "Simple Tools to Get Started",
      icon: <GiToolbox />,
      detail:
        "Use ready-made materials and a clearer structure to begin promoting with more confidence.",
    },
    {
      name: "A Product You Can Stand Behind",
      icon: <GiCheckMark />,
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
    <div className="flex flex-col gap-10 lg:gap-14 pb-20">
      <section className="relative overflow-hidden bg-linear-to-br from-primary to-primary/80 flex items-center justify-center py-16 text-center lg:py-24 shadow-inner">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-xl blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-xl blur-3xl -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10 flex max-w-3xl flex-col items-center gap-4 px-6 md:gap-5">
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl drop-shadow-md tracking-tight">
            The RedRose Opportunity
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base lg:text-lg font-medium drop-shadow-sm">
            Understand the affiliate opportunity at a glance. Discover what you gain, how
            to launch your journey, and the exact steps to begin earning today.
          </p>
        </div>
      </section>

      <div className="app-container flex flex-col gap-12 lg:gap-20">
        <section className="flex flex-col gap-6 lg:gap-10">
          <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
            <h2 className="text-2xl font-semibold text-primary lg:text-4xl tracking-tight">
              What You Are Joining
            </h2>
            <p className="text-left text-sm leading-7 text-neutral-soft">
              Start here to completely grasp the opportunity before choosing your
              placement or analyzing the comprehensive compensation details.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 grow">
            {[
              {
                title: "Product-Led Entry",
                desc: "Begin with a premium product that is intrinsically easier to understand, consume, and recommend.",
              },
              {
                title: "Network Growth",
                desc: "Elevate your income potential organically by sharing authentic experiences and expanding your referral reach steadily.",
              },
              {
                title: "Structured Placement",
                desc: "Dictate explicitly where you want to enter the network so your growth strategy always feels utterly intentional.",
              },
              {
                title: "Long-Term Potential",
                desc: "Manifest deep momentum over time built through total consistency, high trust, and clearer follow-through.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-primary/10 bg-white p-6 md:p-8 shadow-xl shadow-primary/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
              >
                <div className="flex flex-col gap-1">
                  <h4 className="text-base font-bold text-neutral-dark lg:text-lg">
                    {item.title}
                  </h4>
                  <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-soft">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:gap-10">
          <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
            <h2 className="text-2xl font-semibold text-primary lg:text-4xl tracking-tight">
              Why This Model Excels
            </h2>
            <p className="text-left text-sm leading-7 text-neutral-soft">
              Inherent structural benefits that ensure it remains incredibly simple 
              to comprehend, embrace, and confidently promote.
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

        <section className="flex flex-col gap-6 lg:gap-10">
          <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
            <h2 className="text-2xl font-semibold text-primary lg:text-4xl tracking-tight">
              Take Your Position
            </h2>
            <p className="text-left text-sm leading-7 text-neutral-soft">
              Determine the entry path that meticulously aligns with the specific growth strategy you
              envision right from the starting line.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <LegCard
              title="Left Leg"
              description="Position yourself decisively into the primary spillover leg for maximized team momentum."
              cta="Join Left Leg"
              href="https://www.affluenceglobaldream.com/en/orente12/us/agl/ref-member/LEFT"
            />

            <LegCard
              title="Right Leg"
              description="Ideal for constructing a highly balanced organization and successfully amplifying personal bonus overrides."
              cta="Join Right Leg"
              href="https://www.affluenceglobaldream.com/en/orente12/us/agl/ref-member/RIGHT"
            />

            <LegCard
              title="Compensation Guide"
              description="Examine the complete reward framework intimately in the detailed guide to make an informed decision."
              cta="Download PDF Document"
              href="/complan.pdf"
              icon={<HiOutlineDocumentText className="text-xl" />}
            />
          </div>
        </section>

        <section className="flex flex-col gap-6 lg:gap-12 pl-2">
          <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
            <h2 className="text-2xl font-semibold text-primary lg:text-4xl tracking-tight">
              Essential Explanations
            </h2>
            <p className="text-left text-sm leading-7 text-neutral-soft">
              Resolving the customary queries upfront guarantees every aspiring affiliate proceeds with 
              unwavering confidence.
            </p>
          </div>
          <div className="w-full max-w-4xl flex flex-col gap-4 sm:gap-5 mt-2">
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
