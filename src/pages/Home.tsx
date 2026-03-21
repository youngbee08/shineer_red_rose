import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import assets from "../assets/assets";
import { FaArrowRight } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import {
  GiChemicalDrop,
  GiHealthPotion,
  GiPadlock,
  GiLeafSwirl,
  GiLightningShield,
  GiCheckMark,
  GiCrystalBars,
} from "react-icons/gi";

import { useNavigate } from "react-router-dom";
import type {
  BenefitCardProps,
  HowItWorksCardProps,
  HowToUseCardProps,
  IngredientCardProps,
  Review,
} from "../lib/interfaces";
import BenefitCard from "../components/common/BenefitCard";
import HowItWorksCard from "../components/common/HowItWorkCard";
import IngredientCard from "../components/common/IngredientsCard";
import HowToUseCard from "../components/common/HowToUseCard";
import WhyChooseCard from "../components/common/WhyChooseCard";
import FaqCard from "../components/common/FaqCard";
import Stars from "../components/common/Stars";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import AttachmentModal from "../components/Modals/AttachementModal";

const Home: React.FC = () => {
  const [reviewAttachement, setReviewAttachement] = useState("");
  const [visibleIng, setVisibleIng] = useState(3);
  const handleViewMore = () => {
    setVisibleIng((prev) => prev + 3);
  };
  const isMobile = window.innerWidth < 1024;

  const navigate = useNavigate();

  const benefits: BenefitCardProps[] = [
    {
      name: "Pure, Plant-Based Formula",
      icon: <GiLeafSwirl className="text-base" />,
      detail:
        "Made with carefully selected red botanicals and superfruits for clean daily wellness support.",
    },
    {
      name: "Daily Vitality Boost",
      icon: <GiLightningShield className="text-base" />,
      detail:
        "Supports natural energy, mental clarity, and immune strength with consistent use.",
    },
    {
      name: "Quality You Can Trust",
      icon: <GiCheckMark className="text-base" />,
      detail:
        "Produced with tested ingredients in GMP-certified, FDA-registered facilities.",
    },
    {
      name: "Antioxidant Wellness Support",
      icon: <GiCrystalBars className="text-base" />,
      detail:
        "Helps support daily wellness with antioxidant-focused ingredients for balanced living.",
    },
  ];

  const howItWorks: HowItWorksCardProps[] = [
    {
      name: "Choose Your Package",
      id: "1",
      detail:
        "Select the package that fits your goals and complete your order through the guided checkout process.",
    },
    {
      name: "Use It Consistently",
      id: "2",
      detail:
        "Start your daily routine with confidence and stay consistent as you monitor how your body responds over time.",
    },
    {
      name: "Refer and Grow",
      id: "3",
      detail:
        "Share your experience, recommend the product to others, and grow your network through a trusted referral pathway.",
    },
  ];

  const ingredients: IngredientCardProps[] = [
    {
      title: "Red Rose Extract",
      description:
        "Rich in antioxidants with anti-inflammatory properties to soothe skin, reduce redness, and promote vitality and cellular wellness.",
      image: assets.rose,
    },
    {
      title: "Pomegranate",
      description:
        "Packed with polyphenols and antioxidants that support healthy aging, skin protection, and overall cellular defense.",
      image: assets.pomegranate,
    },
    {
      title: "Red Grapes",
      description:
        "Source of resveratrol and polyphenols that help protect cells, combat oxidative stress, and support long-term wellness.",
      image: assets.grape,
    },

    {
      title: "Goji Berry",
      description:
        "Loaded with vitamins and antioxidants to support immune function, boost natural energy, and enhance resilience.",
      image: assets.goji,
    },
    {
      title: "Acerola Cherry",
      description:
        "A potent natural source of vitamin C that bolsters immune health, fights oxidative stress, and promotes daily vitality.",
      image: assets.acerola,
    },
    {
      title: "Red Ginseng Extract",
      description:
        "Supports mental focus, stamina, energy levels, and clearer cognitive performance throughout the day.",
      image: assets.ginseng,
    },

    {
      title: "N-Acetyl Cysteine (NAC)",
      description:
        "Boosts glutathione production — the body's master antioxidant — for enhanced cellular protection and defense against oxidative stress.",
      image: assets.nac,
    },

    {
      title: "Peach Extract",
      description:
        "Provides gentle antioxidant support while aiding hydration, digestive comfort, and overall balance.",
      image: assets.peach,
    },
    {
      title: "Chinese Date (Jujube)",
      description:
        "Traditionally used to promote energy equilibrium, calmness, relaxation, and holistic wellbeing.",
      image: assets.jujube,
    },
    {
      title: "Locust Honey",
      description:
        "Natural sweetener that supports nutrient absorption, gentle energy release, and overall vitality.",
      image: assets.honey,
    },
    {
      title: "Lemon Extract",
      description:
        "Delivers refreshing antioxidant support to aid hydration, digestive freshness, and a clean internal feel.",
      image: assets.lemon,
    },
  ];

  const howToUse: HowToUseCardProps[] = [
    {
      step: 1,
      title: "Use One Sachet Daily",
      description:
        "Take one sachet each day as directed to build a steady and reliable wellness routine.",
    },
    {
      step: 2,
      title: "Make It a Routine",
      description:
        "Consistent daily use helps your body respond better to the product's key ingredients over time.",
    },
    {
      step: 3,
      title: "Track Your Progress",
      description:
        "Pay attention to how you feel and stay guided by your personal wellness goals as you continue.",
    },
  ];

  const whyChooseUs = [
    {
      icon: <GiChemicalDrop className="text-base" />,
      title: "Purposeful Ingredient Selection",
      description:
        "Each formula is built around thoughtfully selected ingredients chosen for daily wellness support.",
    },
    {
      icon: <GiHealthPotion className="text-base" />,
      title: "Guided Partner Experience",
      description:
        "You are not left alone; guidance, structure, and support are available as you grow.",
    },
    {
      icon: <GiPadlock className="text-base" />,
      title: "Built on Trust",
      description:
        "The brand is shared with confidence because it is presented with clarity, consistency, and care.",
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

  const reviews: Review[] = [
    {
      name: "Bekezela PRN",
      remark:
        "After staying consistent, my mum felt more comfortable, stronger, and able to rest better. We were truly encouraged by the change.",
      rating: 4,
      source: "WhatsApp",
      attachment: assets.att1,
    },
    {
      name: "Samuel Osei",
      remark:
        "After a few sachets, my wife felt more active and noticeably better. It has become a valuable part of our home routine.",
      rating: 5,
      source: "WhatsApp",
      attachment: assets.att2,
    },
    {
      name: "Anima",
      remark:
        "I stayed consistent for several days and felt less drained after work, with a more balanced feeling overall.",
      rating: 4,
      source: "WhatsApp",
      attachment: assets.att3,
    },
    {
      name: "Honorine Relax",
      remark:
        "A client shared encouraging progress after making Double Red Rose part of her routine, and the feedback was genuinely uplifting.",
      rating: 5,
      source: "WhatsApp",
      attachment: assets.att4,
    },
  ];

  const [index, setIndex] = useState(0);

  const visibleCount =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? 3
      : typeof window !== "undefined" && window.innerWidth >= 768
        ? 2
        : 1;

  const total = reviews.length;

  const next = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const getInitials = (value: string) =>
    value
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  const displayCount = isMobile ? visibleIng : ingredients.length;

  return (
    <>
      <div className="flex flex-col gap-10 lg:gap-14">
        <section
          className="relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(120, 0, 10, 0.84) 0%, rgba(120, 0, 10, 0.74) 38%, rgba(120, 0, 10, 0.38) 100%), url(${assets.landscape})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_38%)]" />

          <div className="app-container relative z-10 grid min-h-140 grid-cols-1 items-center pb-20 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pb-32 lg:pt-12">
            <div className="flex max-w-2xl flex-col gap-4 sm:gap-5">
              <h1 className="font-display text-3xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
                Premium Wellness for <br />
                Everyday Vitality
              </h1>

              <p className="max-w-xl text-sm leading-7 text-white/90 sm:text-base">
                Discover a trusted red botanical formula created to support
                antioxidant balance, daily energy, and a more confident wellness
                routine for modern living.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  onClick={() => navigate("/purchase-product")}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-white/90 sm:min-w-46 cursor-pointer"
                >
                  <FaCartShopping size={15} />
                  Buy Now
                </button>

                <button
                  onClick={() => navigate("/become-an-affiliate")}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:min-w-52 cursor-pointer"
                >
                  Join the Network
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
            <svg
              viewBox="0 0 1440 120"
              className="w-full h-30"
              preserveAspectRatio="none"
            >
              <path
                d="M0,60 C300,120 600,0 900,60 C1200,120 1400,20 1440,60 L1440,120 L0,120 Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        <div className="app-container flex flex-col gap-10 lg:gap-14">
          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2">
                <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                  What This Formula Supports
                </h2>
              </div>
              <p className="text-sm leading-7 text-neutral-soft text-center">
                Start with the core value of the product and the everyday
                wellness support it is designed to provide.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:gap-4 lg:grid-cols-2">
              {benefits.map((benefit, index) => (
                <BenefitCard
                  name={benefit.name}
                  icon={benefit.icon}
                  detail={benefit.detail}
                  key={index}
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2">
                <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                  Inside the Formula
                </h2>
              </div>
              <p className="text-center text-sm leading-7 text-neutral-soft">
                Explore the ingredient blend behind the formula and the wellness
                role each component is known to support.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {ingredients.slice(0, displayCount).map((ingredient, index) => (
                <IngredientCard
                  key={index}
                  title={ingredient.title}
                  image={ingredient.image}
                  description={ingredient.description}
                />
              ))}
            </div>
            {isMobile && visibleIng < ingredients.length && (
              <div className="flex justify-end lg:hidden">
                <button
                  onClick={handleViewMore}
                  className="flex justify-end  text-primary font-semibold transition duration-300 underline"
                >
                  View More
                </button>
              </div>
            )}
          </section>
          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2">
                <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                  Simple Daily Use
                </h2>
              </div>
              <p className="text-center text-sm leading-7 text-neutral-soft">
                Understand how to make the product part of a steady, practical
                wellness routine.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {howToUse.map((item) => (
                <HowToUseCard
                  key={item.step}
                  step={item.step}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2">
                <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                  Why People Trust RedRose
                </h2>
              </div>
              <p className="text-center text-sm leading-7 text-neutral-soft">
                See what makes the experience feel dependable, guided, and easy
                to recommend to others.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item) => (
                <WhyChooseCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </section>
          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2">
                <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                  How the Opportunity Works
                </h2>
              </div>
              <p className="text-center text-sm leading-7 text-neutral-soft">
                Follow a simple path from purchase to product use and then into
                sharing the experience with others.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7 lg:place-items-center">
              {howItWorks.map((h) => (
                <HowItWorksCard
                  key={h.id}
                  name={h.name}
                  id={h.id}
                  detail={h.detail}
                />
              ))}
            </div>
          </section>
          <section className="relative flex flex-col gap-6 lg:gap-10">
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
              <div className="w-full flex items-center justify-center gap-2">
                <h2 className="text-2xl font-semibold text-neutral-dark lg:text-4xl">
                  Real Customer Feedback
                </h2>
              </div>
              <p className="text-center text-sm leading-7 text-neutral-soft">
                Read a few encouraging experiences shared by people who stayed
                consistent with the product in their daily routine.
              </p>
            </div>
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
                >
                  {reviews.slice(index, index + visibleCount).map((r) => (
                    <motion.article
                      key={`${r.name}`}
                      whileHover={{ y: -3 }}
                      className="h-full rounded-[1.75rem] border border-secondary-dark/70 bg-white p-5 shadow-[0_16px_36px_-30px_rgba(15,14,20,0.16)] transition sm:p-6"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                          {getInitials(r.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-base font-extrabold text-tetiary truncate">
                            {r.name}
                          </p>
                          <p className="text-xs text-neutral-soft">
                            {r.source}
                          </p>
                        </div>
                      </div>

                      <p className="mt-5 text-sm leading-7 text-neutral-soft">
                        "{r.remark}"
                      </p>

                      <div className="mt-5 flex items-end justify-between gap-3">
                        <div className="flex shrink-0 flex-col items-end gap-2">
                          <Stars rating={r.rating} />
                          <button
                            type="button"
                            onClick={() => setReviewAttachement(r.attachment)}
                            className="text-xs font-semibold text-primary transition hover:underline"
                          >
                            View Attachment
                          </button>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="h-10 w-10 rounded-full border border-secondary-dark/70 bg-white flex items-center justify-center hover:bg-primary hover:text-white transition"
                >
                  <HiChevronLeft className="text-xl" />
                </button>

                <button
                  onClick={next}
                  className="h-10 w-10 rounded-full border border-secondary-dark/70 bg-white flex items-center justify-center hover:bg-primary hover:text-white transition"
                >
                  <HiChevronRight className="text-xl" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={[
                      "h-2.5 rounded-full transition-all duration-300",
                      index === i
                        ? "w-6 bg-primary"
                        : "w-2.5 bg-secondary-dark",
                    ].join(" ")}
                  />
                ))}
              </div>
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
                Get quick answers to the most common questions about product
                use, consistency, and getting started.
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
      <AttachmentModal
        image={reviewAttachement}
        isOpen={reviewAttachement ? true : false}
        onClose={() => setReviewAttachement("")}
        allowDownload
      />
    </>
  );
};

export default Home;
