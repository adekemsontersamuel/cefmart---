import React from "react";
import type { Page } from "../types/navigation";
import {
  Users,
  Leaf,
  Truck,
  Shield,
  Heart,
  CheckCircle,
  Cpu,
  Landmark,
  GraduationCap,
  TrendingUp,
  Award,
  Globe,
  Sprout,
  Package,
  Store,
} from "lucide-react";

interface AboutPageProps {
  navigateTo: (page: Page, productId?: string, category?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigateTo }) => {
  const heroStats = [
    {
      value: "3M+",
      label: "Kg Produce Delivered",
      icon: <Package className="h-8 w-8" />,
    },
    {
      value: "300+",
      label: "Jobs Created",
      icon: <Users className="h-8 w-8" />,
    },
  ];

  const stats = [
    {
      value: "500+",
      label: "Happy Customers",
      icon: <Users className="h-6 w-6" />,
    },
    {
      value: "100+",
      label: "Trusted Vendors",
      icon: <Store className="h-6 w-6" />,
    },
    {
      value: "24/7",
      label: "Support Available",
      icon: <Shield className="h-6 w-6" />,
    },
    {
      value: "100%",
      label: "Fresh & Organic",
      icon: <Leaf className="h-6 w-6" />,
    },
  ];

  const values = [
    {
      icon: <Sprout className="h-16 w-16 text-green-600" />,
      title: "Farm-to-Table Direct",
      description:
        "Zero middlemen. Connect directly with local farmers for the freshest produce at the best prices, supporting agriculture at its source.",
    },
    {
      icon: <Heart className="h-16 w-16 text-green-600" />,
      title: "Community Empowerment",
      description:
        "Every purchase supports farming families and strengthens rural economies across Nigeria, creating sustainable livelihoods.",
    },
    {
      icon: <CheckCircle className="h-16 w-16 text-green-600" />,
      title: "Quality Guaranteed",
      description:
        "Multi-stage verification ensures only premium-grade, fresh products reach your doorstep with our satisfaction guarantee.",
    },
    {
      icon: <Globe className="h-16 w-16 text-green-600" />,
      title: "Sustainable Practices",
      description:
        "Eco-friendly packaging and responsible farming practices for a healthier planet and conscious consumption.",
    },
  ];

  const partners = [
    {
      name: "Alpha N&S Technologies",
      role: "Technology Infrastructure Partner",
      description:
        "Delivering enterprise-grade AI, cloud infrastructure, and real-time analytics powering our digital marketplace.",
      icon: <Cpu className="h-14 w-14 text-blue-600" />,
      borderColor: "border-blue-200",
      bgColor: "bg-blue-50",
    },
    {
      name: "Cefmart Marketplace",
      role: "E-Commerce Platform",
      description:
        "The beating heart of our ecosystem—connecting indigenous vendors with customers across Nigeria and beyond.",
      icon: <Leaf className="h-14 w-14 text-green-600" />,
      borderColor: "border-green-200",
      bgColor: "bg-green-50",
    },
    {
      name: "Fr. Adasu University",
      role: "Research & Academic Partner",
      description:
        "Joint initiatives in sustainable agriculture research, agritech innovation, and student entrepreneurship programs.",
      icon: <GraduationCap className="h-14 w-14 text-indigo-600" />,
      borderColor: "border-indigo-200",
      bgColor: "bg-indigo-50",
    },
    {
      name: "Benue State Government",
      role: "Strategic Government Partner",
      description:
        "Policy support and economic initiatives to promote indigenous agriculture and digital commerce in Benue State.",
      icon: <Landmark className="h-14 w-14 text-emerald-600" />,
      borderColor: "border-emerald-200",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section - Clean & Modern */}
      <section className="relative bg-gray-50 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Connecting Farms to Families Across Nigeria
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From Benue to the world, CEFMART is redefining agro-commerce with an
            emphasis on quality, variety, and convenience. We are on a mission
            to deliver exceptional fresh produce right to your doorstep—wherever
            you are.
          </p>
        </div>
      </section>

      {/* Hero Image with Stats Overlay */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            {/* Image Placeholder with Gradient Overlay */}
            <div className="relative bg-gradient-to-br from-green-500 to-emerald-700 h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white p-8">
                <Leaf className="h-32 w-32 mx-auto mb-6 opacity-40" />
                <h3 className="text-4xl font-bold mb-4">
                  Farm Fresh Excellence
                </h3>
                <p className="text-xl opacity-90">
                  From our fields to your table
                </p>
              </div>
            </div>

            {/* Stats Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="max-w-5xl mx-auto grid grid-cols-2 gap-8">
                {heroStats.map((stat, index) => (
                  <div key={index} className="text-center text-white">
                    <div className="flex items-center justify-center mb-2 opacity-80">
                      {stat.icon}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm md:text-base opacity-90">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section - Dark Background */}
      <section className="bg-gray-900 text-white py-20 px-4 mt-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            At CEFMART, our mission is to deliver exceptional fresh produce by
            focusing on quality, variety, and sustainability. We are committed
            to providing farm-fresh, delicious food with outstanding service,
            creating value for our customers and driving growth. As we continue
            to innovate and expand, we aim to build a strong and enduring brand
            that stands out for its excellence and impact.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 hover:bg-green-600 hover:text-white transition-all group">
                  <div className="text-green-600 group-hover:text-white transition-colors">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose CEFMART?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're revolutionizing how Nigeria shops for fresh produce through
              innovation, integrity, and community impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-6">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Guarantees */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                100% Secure
              </h3>
              <p className="text-gray-600">
                Bank-grade encryption protects every transaction and your
                personal data.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Truck className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Same-day delivery available. Your produce arrives garden-fresh
                at your door.
              </p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <Award className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Quality Guaranteed
              </h3>
              <p className="text-gray-600">
                Not satisfied? Full refund or replacement with our satisfaction
                guarantee.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Alpha N&S Technologies Highlight */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="flex items-center space-x-3 text-blue-400 mb-4">
                <Cpu className="h-6 w-6" />
                <span className="font-bold tracking-wider uppercase text-sm">
                  Technology Partner
                </span>
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Powered by Alpha N&S Technologies
              </h2>

              <p className="text-lg text-slate-300 leading-relaxed">
                Our platform runs on enterprise-grade infrastructure from Alpha
                N&S Technologies, delivering real-time inventory management,
                AI-powered recommendations, secure payment processing, and 99.9%
                uptime reliability.
              </p>

              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200">
                    Cloud-native architecture for infinite scalability
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200">
                    Machine learning for smart product matching
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                  <span className="text-slate-200">
                    Advanced fraud detection and prevention
                  </span>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="https://alphans.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-white border-2 border-white/30 bg-white/10 hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold transition-all"
                >
                  Visit Alpha N&S Tech
                  <TrendingUp className="ml-2 h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border-2 border-white/20 p-12 text-center">
                <Cpu className="h-32 w-32 mx-auto text-white/90 mb-6" />
                <h3 className="text-4xl font-bold text-white mb-4">
                  ALPHA N&S
                </h3>
                <p className="text-white/80 text-lg">
                  Building Digital Infrastructure for Africa
                </p>
                <div className="flex justify-center space-x-2 mt-8">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Strategic Partners
            </h2>
            <p className="text-xl text-gray-600">
              Collaboration drives innovation and creates lasting impact
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <div
                key={index}
                className={`bg-white p-10 rounded-2xl border-2 ${partner.borderColor} shadow-md hover:shadow-xl transition-all duration-300`}
              >
                <div className="flex items-start space-x-6">
                  <div
                    className={`flex-shrink-0 ${partner.bgColor} p-5 rounded-2xl border ${partner.borderColor}`}
                  >
                    {partner.icon}
                  </div>

                  <div className="flex-1 space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {partner.name}
                    </h3>
                    <div className="text-green-600 text-sm font-bold uppercase tracking-wide">
                      {partner.role}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Experience Farm-Fresh Quality?
          </h2>
          <p className="text-green-50 text-xl mb-10 leading-relaxed">
            Join thousands of satisfied customers who trust CEFMART for premium
            quality, unbeatable freshness, and community-driven values.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              className="bg-white text-green-700 hover:bg-green-50 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl transition-all text-lg"
              onClick={() => navigateTo("products")}
            >
              Start Shopping Now
            </button>
            <button
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-4 rounded-full text-lg transition-all"
              onClick={() => navigateTo("register")}
            >
              Become a Vendor
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
