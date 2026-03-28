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
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const defaultRegion = navigator.language.includes("en-US")
    ? "usa"
    : "nigeria";

  const [region, setRegion] = useState<"nigeria" | "usa">(defaultRegion);

  const handleViewMore = () => {
    setVisibleIng((prev) => prev + 3);
  };
  const isMobile = window.innerWidth < 1024;

  const navigate = useNavigate();

  const benefits: BenefitCardProps[] = [
    {
      name: "100% Vegan & Botanical Blend",
      icon: <GiLeafSwirl />,
      detail:
        "Crafted from handpicked red superfruits and herbs for a refreshing approach to holistic health.",
    },
    {
      name: "Enhanced Everyday Energy",
      icon: <GiLightningShield />,
      detail:
        "Promotes sustained vigor, sharper focus, and stronger immune defenses when taking it regularly.",
    },
    {
      name: "Uncompromised Standards",
      icon: <GiCheckMark />,
      detail:
        "Manufactured in strict FDA-registered environments using thoroughly vetted components.",
    },
    {
      name: "Cellular Antioxidant Defense",
      icon: <GiCrystalBars />,
      detail:
        "Nourishes your body deeply with a rich combination of natural antioxidants for a harmonious lifestyle.",
    },
  ];

  const howItWorks: HowItWorksCardProps[] = [
    {
      name: "Select Your Preferred Tier",
      id: "1",
      icon: <FaCartShopping />,
      detail:
        "Find the bundle that best aligns with your ambitions and finalize your purchase via our secure checkout flow.",
    },
    {
      name: "Build a Daily Habit",
      id: "2",
      icon: <GiHealthPotion />,
      detail:
        "Incorporate the formula into your daily routine and closely observe your body's positive transformation.",
    },
    {
      name: "Share, Earn & Expand",
      id: "3",
      icon: <GiLeafSwirl />,
      detail:
        "Inspire others by sharing your journey, refer new users, and steadily build your own community network.",
    },
  ];

  const ingredients: IngredientCardProps[] = [
    {
      title: "Extracted Red Rose",
      description:
        "Abundant in potent antioxidants, this extract calms inflammation, evens skin tone, and encourages cellular renewal.",
      image: assets.rose,
    },
    {
      title: "Pomegranate Seed",
      description:
        "Brimming with essential polyphenols that defend your skin against aging elements and fortify overarching cellular health.",
      image: assets.pomegranate,
    },
    {
      title: "Crimson Grapes",
      description:
        "A natural powerhouse of resveratrol, guarding cells from oxidative damage and promoting prolonged vitality.",
      image: assets.grape,
    },

    {
      title: "Himalayan Goji",
      description:
        "Packed with complex vitamins that reinforce your immune barriers, elevate endurance, and naturally stimulate energy reserves.",
      image: assets.goji,
    },
    {
      title: "Acerola Fruit",
      description:
        "An incredible source of pure Vitamin C, pivotal for immune resilience, fighting free radicals, and daily vigor.",
      image: assets.acerola,
    },
    {
      title: "Wild Red Ginseng",
      description:
        "Amplifies cognitive sharpness, provides lasting stamina, and diminishes feelings of fatigue throughout your active day.",
      image: assets.ginseng,
    },

    {
      title: "NAC (N-Acetyl Cysteine)",
      description:
        "Supercharges the production of glutathione—your body’s primary antioxidant—critical for detoxification and guarding your cells.",
      image: assets.nac,
    },

    {
      title: "Juicy Peach Kernel",
      description:
        "Supplies a delicate layer of antioxidant protection, optimizing hydration levels and ensuring a smooth digestive balance.",
      image: assets.peach,
    },
    {
      title: "Jujube (Chinese Date)",
      description:
        "A traditional remedy celebrated for establishing inner peace, steadying energy peaks, and fostering complete relaxation.",
      image: assets.jujube,
    },
    {
      title: "Sweet Locust Honey",
      description:
        "An unrefined sweetener that significantly improves nutrient uptake while supplying a smooth, jitter-free energy lift.",
      image: assets.honey,
    },
    {
      title: "Citrus Lemon Rind",
      description:
        "Delivers a clean, zesty antioxidant boost that purifies hydration channels and promotes an uplifting internal cleanse.",
      image: assets.lemon,
    },
  ];

  const howToUse: HowToUseCardProps[] = [
    {
      step: 1,
      title: "Consume One Pouch Every Day",
      description:
        "Enjoy a single serving daily to establish a strong, dependable foundation for your health journey.",
    },
    {
      step: 2,
      title: "Cultivate Consistency",
      description:
        "Sticking to a routine ensures your system can fully harness the accumulative benefits of our core ingredients.",
    },
    {
      step: 3,
      title: "Monitor Your Evolution",
      description:
        "Keep a close eye on your shifting energy levels and let your personal milestones guide your ongoing path.",
    },
  ];

  const whyChooseUs = [
    {
      icon: <GiChemicalDrop className="text-base" />,
      title: "Intentional Formulation",
      description:
        "Every single extract is intentionally sourced for its proven ability to elevate your everyday physical wellbeing.",
    },
    {
      icon: <GiHealthPotion className="text-base" />,
      title: "Supported Community Path",
      description:
        "We never let you walk alone; get access to comprehensive guidance and structural backing as you excel.",
    },
    {
      icon: <GiPadlock className="text-base" />,
      title: "Rooted in Reliability",
      description:
        "An established system backed by profound transparency, meticulous care, and unwavering consistency you can proudly share.",
    },
  ];

  const faqs = [
    {
      question: "Is this easy to incorporate into my daily routine?",
      answer:
        "Absolutely. The regimen is tailored specifically to blend seamlessly into your regular healthy lifestyle.",
    },
    {
      question: "Do I need marketing experience to become successful?",
      answer:
        "Not at all. You require zero previous background. Our onboarding steps are heavily structured to guarantee approachability.",
    },
    {
      question: "When should I expect to see my desired results?",
      answer:
        "Patience and daily adherence are critical. While bodies react differently, continuous consumption provides the best outcomes.",
    },
    {
      question: "What is the fastest method to get everything started?",
      answer:
        "Simply pick your preferred avenue—either purchasing directly or joining the affiliate sphere—and proceed with the guided prompts.",
    },
  ];

  const reviews: Review[] = [
    {
      name: "Bekezela PRN",
      remark:
        "By taking it continuously, my mother discovered newfound comfort and stamina. It fundamentally improved her sleep, leaving us entirely amazed.",
      rating: 4,
      source: "WhatsApp",
      attachment: assets.att1,
    },
    {
      name: "Samuel Osei",
      remark:
        "Only a few servings in, and my spouse noticed a drastic uptick in her vitality. It is now an irreplaceable staple in our household.",
      rating: 5,
      source: "WhatsApp",
      attachment: assets.att2,
    },
    {
      name: "Anima",
      remark:
        "Committing to it for just a week made my post-work exhaustion vanish. I feel remarkably revitalized and fundamentally more stable.",
      rating: 4,
      source: "WhatsApp",
      attachment: assets.att3,
    },
    {
      name: "Honorine Relax",
      remark:
        "Hearing a customer rave about the dramatic shift they felt after integrating Double Red Rose was profoundly encouraging.",
      rating: 5,
      source: "WhatsApp",
      attachment: assets.att4,
    },
  ];

  const dollarPricing = [
    { name: "Associate", count: 1, price: 65 },
    { name: "Promoter", count: 3, price: 195 },
    { name: "Business Builder", count: 15, price: 600, discount: 975 },
    { name: "Business Owner", count: 30, price: 1200, discount: 1950 },
  ];

  const nairaPricing = [
    { name: "Associate", count: 1, price: 73600 },
    { name: "Promoter", count: 3, price: 200000, discount: 220800 },
    { name: "Business Builder", count: 15, price: 840000, discount: 1104000 },
    { name: "Business Owner", count: 30, price: 1672000, discount: 2208000 },
  ];

  const packages = region === "nigeria" ? nairaPricing : dollarPricing;

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

  const formatPrice = (value: number) => {
    if (region === "nigeria") {
      if (value >= 1000000) {
        return `₦${(value / 1000000).toFixed(2)}M`;
      }
      return `₦${(value / 1000).toFixed(1)}K`;
    }
    return `$${value}`;
  };

  return (
    <>
      <div className="flex flex-col gap-10 lg:gap-14">
        <section
          className="relative overflow-hidden bg-[length:cover] bg-center bg-[image:var(--bg-img)] md:bg-none"
          style={
            {
              "--bg-img": `linear-gradient(90deg, rgba(120, 0, 10, 0.305) 0%, rgba(120, 0, 10, 0.258) 38%, rgba(120, 0, 10, 0.203) 100%), url(${assets.landing222})`,
            } as React.CSSProperties
          }
        >
          <div className="app-container relative grid min-h-140 grid-cols-1 items-center pb-20 pt-8 sm:pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:pb-32 lg:pt-12 z-20">
            <div className="flex max-w-2xl flex-col gap-4 sm:gap-5">
              <h1 className="font-display text-3xl font-semibold leading-[1.02] text-primary sm:text-5xl lg:text-6xl">
                Superior Nutrition for <br />
                Limitless Energy
              </h1>

              <p className="max-w-xl text-sm leading-7 text-neutral-soft sm:text-base">
                Explore an authentic red botanical infusion designed to elevate
                your antioxidant defenses, fuel your everyday drive, and inspire
                a bold new chapter of healthy living.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  onClick={() => navigate("/purchase-product")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 sm:min-w-46 cursor-pointer"
                >
                  <FaCartShopping size={15} />
                  Order Now
                </button>

                <button
                  onClick={() => navigate("/become-an-affiliate")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border  md:border-primary bg-transparent px-6 py-3 text-sm font-semibold text-white md:text-primary transition hover:bg-primary/10 sm:min-w-52 cursor-pointer"
                >
                  Partner With Us
                  <FaArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute sm:bottom-0 right-0 overflow-hidden leading-none z-10 h-full">
            <img
              src={assets.landing222}
              alt=""
              className="h-full md:object-cover object-contain"
            />
          </div>
        </section>

        <div className="app-container  flex flex-col gap-10 lg:gap-14">
          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="flex justify-between flex-col md:flex-row gap-5">
              <div className=" flex max-w-3xl flex-col items-left gap-3 text-left">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  Select A Bundle
                </h2>
                <p className="text-sm leading-7 text-neutral-soft">
                  Pick an introductory plan and embark on your ultimate wellness
                  transformation.
                </p>
              </div>

              <div className="flex justify-center md:justify-end h-max gap-3">
                <button
                  onClick={() => setRegion("nigeria")}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                    region === "nigeria"
                      ? "bg-primary text-white"
                      : "bg-secondary-dark/10 text-neutral-dark"
                  }`}
                >
                  Nigeria
                </button>

                <button
                  onClick={() => setRegion("usa")}
                  className={`px-5 py-2 rounded-xl text-sm font-semibold transition ${
                    region === "usa"
                      ? "bg-primary text-white"
                      : "bg-secondary-dark/10 text-neutral-dark"
                  }`}
                >
                  USA
                </button>
              </div>
            </div>

            <div className="relative w-full">
              <div
                ref={scrollRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto scroll-smooth py-4 scrollbar-thin"
              >
                {packages.map((pkg, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        sessionStorage.setItem(
                          "productCount",
                          String(pkg.count),
                        );
                        navigate("/purchase-product");
                      }}
                      className="md:min-w-87.5 min-w-full cursor-pointer group rounded-xl border border-secondary-dark/70 bg-white p-5 shadow-sm transition hover:shadow-md hover:-translate-y-1"
                    >
                      <h3 className="text-lg font-semibold text-primary group-hover:underline">
                        {pkg.name}
                      </h3>

                      <p className="text-sm text-neutral-soft mt-1">
                        {pkg.count} {pkg.count === 1 ? "Pack" : "Packs"}
                      </p>
                      <div className="mt-3 flex flex-col gap-1">
                        {pkg.discount && (
                          <span className="text-sm text-neutral-soft line-through">
                            {formatPrice(pkg.discount)}
                          </span>
                        )}

                        <span className="text-xl font-bold text-neutral-dark">
                          {formatPrice(pkg.price)}
                        </span>
                      </div>

                      <div className="mt-4 text-sm text-primary font-semibold">
                        Get Started
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
              <div className="w-full flex items-start justify-start gap-2">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  What's In The Blend?
                </h2>
              </div>
              <p className="text-left text-sm leading-7 text-neutral-soft">
                Discover our masterfully balanced botanical ingredients and how
                they contribute towards your total wellbeing.
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
            <div className="text-left flex max-w-3xl flex-col items-start gap-3">
              <div className="w-full flex items-start justify-start gap-2">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  Core Benefits
                </h2>
              </div>
              <p className="text-sm leading-7 text-neutral-soft">
                Uncover the primary advantages our daily formula brings to your
                overarching health goals.
              </p>
            </div>
            <div
              ref={scrollRef}
              className="flex md:flex-row flex-col gap-4 overflow-x-auto scroll-smooth p-4 scrollbar-thin "
            >
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
            <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
              <div className="w-full flex items-start justify-start gap-2">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  Effortless Daily Routine
                </h2>
              </div>
              <p className="text-left text-sm leading-7 text-neutral-soft">
                Learn how to seamlessly integrate our pouches into your everyday
                habits effortlessly.
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
            <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
              <div className="w-full flex items-start justify-start gap-2">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  The RedRose Difference
                </h2>
              </div>
              <p className="text-left text-sm leading-7 text-neutral-soft">
                Find out why our community relies on our transparent quality and
                unparalleled partner support.
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
            <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
              <div className="w-full flex items-start justify-start gap-2">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  Understanding Our Model
                </h2>
              </div>
              <p className="text-left text-sm leading-7 text-neutral-soft">
                Trace the straightforward steps from your first order through to
                inspiring others around you.
              </p>
            </div>
            <div className="relative w-full max-w-[1000px] mx-auto mt-6 md:mt-10">
              <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
                <svg
                  className="absolute top-[8%] left-[24%] w-[20%] h-[80px] overflow-visible"
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker
                      id="arrowhead1"
                      markerWidth="6"
                      markerHeight="6"
                      refX="5"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 6 3, 0 6" fill="#333" />
                    </marker>
                  </defs>
                  <path
                    d="M 0,30 Q 50,-15 100,25"
                    fill="transparent"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowhead1)"
                  />
                </svg>
                <svg
                  className="absolute top-[18%] left-[56%] w-[20%] h-[80px] overflow-visible"
                  viewBox="0 0 100 40"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <marker
                      id="arrowhead2"
                      markerWidth="6"
                      markerHeight="6"
                      refX="5"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 6 3, 0 6" fill="#333" />
                    </marker>
                  </defs>
                  <path
                    d="M 0,10 Q 50,55 100,15"
                    fill="transparent"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    markerEnd="url(#arrowhead2)"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 gap-10 sm:gap-14 lg:grid-cols-3 lg:gap-4 relative z-10 w-full place-items-center">
                {howItWorks.map((h) => (
                  <HowItWorksCard
                    key={h.id}
                    name={h.name}
                    id={h.id}
                    detail={h.detail}
                    icon={h.icon}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="relative flex flex-col gap-6 lg:gap-10">
            <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
              <div className="w-full flex items-start justify-start gap-2">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  Stories From Our Community
                </h2>
              </div>
              <p className="text-left text-sm leading-7 text-neutral-soft">
                Browse through authentic journeys experienced by those who have
                committed to our daily health regimen.
              </p>
            </div>
            <div className="relative overflow-hidden py-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8"
                >
                  {reviews.slice(index, index + visibleCount).map((r) => (
                    <motion.article
                      key={`${r.name}`}
                      whileHover={{ y: -5 }}
                      className="h-full relative overflow-hidden rounded-xl border border-primary/10 bg-white p-6 md:p-8 shadow-xl shadow-primary/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
                    >
                      <div className="absolute -top-4 -right-2 text-[120px] text-primary/5 font-serif select-none leading-none">
                        “
                      </div>

                      <div className="flex items-center gap-4 relative z-10">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/60 text-lg font-bold text-white shadow-md shadow-primary/20">
                          {getInitials(r.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-lg font-bold text-neutral-dark truncate">
                            {r.name}
                          </p>
                          <p className="text-sm font-medium text-primary/70">
                            {r.source}
                          </p>
                        </div>
                      </div>

                      <p className="mt-6 text-[15px] italic leading-relaxed text-neutral-soft relative z-10 min-h-[80px]">
                        "{r.remark}"
                      </p>

                      <div className="mt-8 flex items-center justify-between gap-3 relative z-10 pt-5 border-t border-primary/10">
                        <div className="scale-110 origin-left">
                          <Stars rating={r.rating} />
                        </div>
                        {r.attachment && (
                          <button
                            type="button"
                            onClick={() => setReviewAttachement(r.attachment)}
                            className="text-xs font-bold text-primary bg-primary/10 px-4 py-2 rounded-xl transition-colors hover:bg-primary hover:text-white"
                          >
                            Attachment
                          </button>
                        )}
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  className="h-12 w-12 rounded-xl border-2 border-primary/20 bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                >
                  <HiChevronLeft className="text-2xl" />
                </button>

                <button
                  onClick={next}
                  className="h-12 w-12 rounded-xl border-2 border-primary/20 bg-white text-primary flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm"
                >
                  <HiChevronRight className="text-2xl" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 rounded-xl transition-all duration-500 ease-out ${
                      index === i
                        ? "w-10 bg-primary shadow-sm shadow-primary/50"
                        : "w-3 bg-primary/20 hover:bg-primary/40"
                    }`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-6 lg:gap-12">
            <div className="flex max-w-3xl flex-col items-start gap-3 text-left">
              <div className="w-full flex items-start justify-start gap-2">
                <h2 className="text-2xl font-semibold text-primary lg:text-4xl">
                  Frequently Asked Inquiries
                </h2>
              </div>
              <p className="text-left text-sm leading-7 text-neutral-soft">
                Explore swift responses addressing the most common curiosities
                about our system, plans, and formulas.
              </p>
            </div>
            <div className="w-full flex flex-col gap-4 sm:gap-5 mt-2">
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
