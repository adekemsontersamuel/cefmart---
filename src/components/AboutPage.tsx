import React from "react";
import type { Page } from "../types/navigation";
import {
  Globe,
  Sparkles,
  ArrowRight,
  Landmark,
  Building2,
  Cpu,
} from "lucide-react";

interface AboutPageProps {
  navigateTo: (page: Page, productId?: string, category?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigateTo }) => {
  const lossImpact = [
    "Reduced farmer income and increased rural poverty",
    "Artificial food scarcity and inflation in urban markets",
    "Wasted labor, capital, and natural resources",
  ];

  const platformOutcomes = [
    "Reduce spoilage through faster market linkage",
    "Improve demand forecasting with structured data",
    "Strengthen rural-to-urban supply chains",
    "Increase farmer profitability and traceability",
    "Support financial inclusion through transaction records",
  ];

  const partners = [
    {
      name: "CEFTER",
      subtitle: "Center for Food Technology and Research",
      icon: <Landmark className="h-6 w-6 text-[#ef5b4f]" />,
      description:
        "A flagship research center of Benue State University driving food systems research, rural economic interventions, and agricultural productivity.",
    },
    {
      name: "Alpha N&S Technologies",
      subtitle: "Engineering & Infrastructure Partner",
      icon: <Cpu className="h-6 w-6 text-green-600" />,
      description:
        "Alpha N&S Technologies is an engineering and technology company founded to build scalable solutions that solve fundamental structural problems across commerce, EdTech, and digital infrastructure.",
    },
    {
      name: "Cityhackz",
      subtitle: "Commerce Innovation Arm",
      icon: <Building2 className="h-6 w-6 text-slate-700" />,
      description:
        "Cityhackz is Nigeria's first indigenous virtual marketplace, pioneering the digitisation of local markets through artificial intelligence, software engineering, and research-driven insights. Our mission is to bridge African commerce with the global economy, empowering local traders, students, and entrepreneurs with the technology, tools, and research needed to thrive.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f5f7] font-['Manrope','Segoe_UI',sans-serif] text-slate-800">
      <section className="px-4 py-12 md:px-8 md:py-16">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <div className="flex h-full flex-col space-y-5">
            <h1 className="font-['Sora','Manrope',sans-serif] text-4xl font-bold leading-tight text-[#ef5b4f] md:text-5xl">
              Who We Are
            </h1>
            <p className="text-lg leading-relaxed text-slate-700">
              The Center for Food Technology and Research (CEFTER) at Benue
              State University, in strategic collaboration with Alpha N&S
              Technologies through
              <span className="font-semibold text-slate-900"> Cityhackz</span>,
              Nigeria’s first indigenous research-driven virtual marketplace,
              continues to advance Nigeria’s agricultural transformation using
              applied research, structured market data, and unified commerce
              technology.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Benue State is widely recognized as the{" "}
              <span className="font-semibold">Food Basket of the Nation</span>,
              yet post-harvest losses remain a major structural challenge across
              Nigeria. Annual losses for perishable agricultural produce are
              frequently estimated between{" "}
              <span className="font-semibold">30% and 50%</span>, significantly
              reducing farmer incomes, disrupting supply chains, and weakening
              market stability.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              In response, CEFTER is partnering strategically with Alpha N&S
              Technologies, leveraging the{" "}
              <span className="font-semibold text-slate-900">
                Cityhackz Unified Marketplace Infrastructure
              </span>
              to build{" "}
              <span className="font-semibold text-slate-900">CEFmart</span>, a
              research-backed agro-commerce platform designed to transform how
              food moves efficiently from farm clusters to structured markets.
            </p>

            <p className="mt-6 text-lg leading-relaxed text-slate-700">
              Through indigenous innovation combined with modern digital
              systems, real-time data visibility, and commerce intelligence,
              this partnership aims to reduce waste, increase farmer
              profitability, enhance transparency, and strengthen Benue State’s
              role in Nigeria’s national food security framework.
            </p>

            <div className="mt-16 space-y-4 rounded-2xl bg-white p-6 shadow-sm">
              {lossImpact.map((item) => (
                <p
                  key={item}
                  className="text-sm font-medium leading-relaxed text-slate-600"
                >
                  • {item}
                </p>
              ))}
            </div>

            <button
              className="mt-16 inline-flex w-fit items-center rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
              onClick={() => navigateTo("products")}
            >
              Explore Marketplace
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/70 bg-white shadow-xl">
            <img
              src="/brand1.png"
              alt="Cefmart market research and work environment"
              className="h-[520px] w-full object-cover md:h-[580px] lg:h-[620px]"
            />
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 md:px-8">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-[#e7e9ee] bg-[#f8fafc] p-6 shadow-sm">
            <img
              src="/brand2.jpg"
              alt="Cefmart work environment"
              className="h-[230px] w-full rounded-2xl object-cover md:h-[270px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/35 via-transparent to-transparent" />
          </div>

          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-green-700">
              <Sparkles className="h-4 w-4" />
              Built for Modern Trade
            </div>
            <h2 className="font-['Sora','Manrope',sans-serif] text-4xl font-bold leading-tight text-[#ef5b4f] md:text-5xl">
              Our Technology
            </h2>
            <p className="text-lg leading-relaxed text-slate-700">
              CEFmart connects rural farmers, aggregators, traders, processors,
              retailers, and institutional buyers through a structured digital
              system that improves visibility, pricing transparency, and
              distribution efficiency.
            </p>
            <p className="text-lg leading-relaxed text-slate-700">
              This is more than a storefront. The platform combines marketplace
              infrastructure, data intelligence, and vendor tooling to reduce
              food spoilage, improve demand forecasting, and strengthen
              rural-to-urban supply chains at scale.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {platformOutcomes.map((outcome) => (
                <div
                  key={outcome}
                  className="rounded-xl border border-[#e7e9ee] bg-[#f8fafc] px-4 py-3 text-sm font-semibold text-slate-600"
                >
                  {outcome}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#ebedf1] px-4 py-16 md:px-8 md:py-20">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-center font-['Sora','Manrope',sans-serif] text-4xl font-bold text-[#ef5b4f] md:text-5xl">
            Our Partners
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-center text-lg leading-relaxed text-slate-700">
            CEFmart exists at the intersection of agriculture, technology, and
            economic development. Our model is powered by institutional
            research, indigenous innovation, and scalable engineering.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-6 md:mt-14 md:grid-cols-3 md:gap-8 md:[grid-auto-rows:1fr]">
            {partners.map((partner) => (
              <article
                key={partner.name}
                className="flex h-full min-h-[340px] flex-col rounded-2xl border border-white/70 bg-white p-7 shadow-sm md:min-h-[370px] md:p-8"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4f5f7] p-3">
                  {partner.icon}
                </div>
                <h3 className="min-h-[3.5rem] font-['Sora','Manrope',sans-serif] text-xl font-bold text-slate-900">
                  {partner.name}
                </h3>
                <p className="mt-2 min-h-[2.75rem] text-sm font-semibold text-[#ef5b4f]">
                  {partner.subtitle}
                </p>
                <p className="mt-5 flex-1 text-[0.95rem] leading-7 text-slate-600">
                  {partner.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold text-slate-600">
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              <Globe className="mr-2 inline h-4 w-4 text-green-600" />
              From Farm to Market
            </span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              Research to Revenue
            </span>
            <span className="rounded-full bg-white px-4 py-2 shadow-sm">
              Benue to West Africa
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
