import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Star,
} from "lucide-react";

export const Footer: React.FC = () => {
  const companyLinks = [
    "Our Story",
    "Products",
    "Vendors",
    "Farmers",
    "Food Marketplace",
    "Agro Equipments",
    "Post-Harvest Losses",
    "Storage & Cold Chain",
    "About",
    "Careers",
    "Partnerships",
    "Community Impact",
  ];

  const marketplaceLinks = [
    "Fresh Vegetables",
    "Fresh Fruits",
    "Tubers & Grains",
    "Livestock & Poultry",
    "Dairy & Eggs",
    "Processed Foods",
    "Farm Inputs",
    "Agro Machinery",
    "Bulk Orders",
    "Food Delivery",
  ];

  const supportLinks = [
    "FAQs",
    "Blog",
    "Documentation",
    "Contact",
    "Vendor Support",
    "Farmer Support",
    "Food Safety Guide",
    "Terms of Use",
    "Privacy Policy",
    "Report an Issue",
  ];

  return (
    <footer className="bg-white text-gray-900">
      <div className="relative">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(2,6,23,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(2,6,23,0.06)_1px,transparent_1px)] [background-size:220px_220px]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 max-sm:py-12">
          <div className="border-y border-slate-200 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <img
                    src="/cefmart-logo1.png"
                    alt="CEFMART Logo"
                    className="h-full w-auto object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold tracking-wide">Cefmart</h3>
              </div>

              <div className="flex items-center space-x-3">
                <div className="h-16 w-16 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.18)]">
                  <div className="h-12 w-12 rounded-full border border-emerald-500/60 flex items-center justify-center">
                    <Star className="h-6 w-6 text-emerald-600" />
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="uppercase tracking-[0.2em] text-xs text-gray-500">
                    Overall rating
                  </div>
                  <div className="text-lg font-semibold text-gray-900">4.9 / 5</div>
                </div>
              </div>

              <div className="space-y-3 text-gray-700 text-sm">
                <div className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-emerald-600" />
                  <div>
                    <p>A108 Adam Street</p>
                    <p>Lagos, NG 100001</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <p>+234 589 55488 55</p>
                </div>

                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                  <p>info@cefmart.com</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.35em] text-gray-500">
                Company
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {companyLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-emerald-700 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.35em] text-gray-500">
                Marketplace
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {marketplaceLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-emerald-700 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-[0.35em] text-gray-500">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-gray-700">
                {supportLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-emerald-700 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          </div>

          <div className="border-b border-slate-200" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-8 text-sm text-gray-700">
            <a
              href="#"
              className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-3 hover:border-emerald-500/70 hover:text-emerald-700 transition-colors"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-3 hover:border-emerald-500/70 hover:text-emerald-700 transition-colors"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-3 hover:border-emerald-500/70 hover:text-emerald-700 transition-colors"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
            <a
              href="#"
              className="flex items-center justify-center gap-2 border border-slate-200 rounded-lg py-3 hover:border-emerald-500/70 hover:text-emerald-700 transition-colors"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>

          <div className="border-b border-slate-200" />

          <div className="py-6 text-center text-xs text-gray-500">
            © 2026 Cefmart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
