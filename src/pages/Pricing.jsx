import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Pricing() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const pricingPlans = [
        {
            name: "Starter",
            description: "Perfect for individuals",
            monthlyPrice: 8700,
            yearlyPrice: 290,
            features: [
                "Up to 20 lbs per month",
                "Wash & fold service",
                "Free pickup & delivery",
                "2-3 day turnaround",
                "Eco-friendly detergents",
                "Email support"
            ],
            highlighted: false,
            gradient: "from-slate-700 to-slate-800",
            borderColor: "border-slate-600/50"
        },
        {
            name: "Professional",
            description: "Most popular choice",
            monthlyPrice: 17700,
            yearlyPrice: 590,
            features: [
                "Up to 50 lbs per month",
                "Wash & fold + dry cleaning",
                "Priority pickup & delivery",
                "24-hour express option",
                "Premium detergents",
                "Stain treatment included",
                "Priority support",
                "10% off additional services"
            ],
            highlighted: true,
            gradient: "from-teal-500 to-cyan-500",
            borderColor: "border-teal-500"
        },
        {
            name: "Business",
            description: "For busy professionals",
            monthlyPrice: 29700,
            yearlyPrice: 990,
            features: [
                "Unlimited laundry",
                "All services included",
                "Same-day pickup & delivery",
                "24/7 express service",
                "Dedicated account manager",
                "Custom preferences saved",
                "Premium packaging",
                "Free alterations (up to 3/month)",
                "VIP support"
            ],
            highlighted: false,
            gradient: "from-purple-600 to-indigo-600",
            borderColor: "border-purple-500/50"
        }
    ];

    const additionalServices = [
        { name: "Express Service (24h)", price: "Rs. 3,500" },
        { name: "Dry Cleaning (per item)", price: "Rs. 2,100" },
        { name: "Ironing (per item)", price: "Rs. 700" },
        { name: "Shoe Cleaning (per pair)", price: "Rs. 500" },
        { name: "Alterations", price: "From Rs. 3,500" },
        { name: "Stain Treatment", price: "Rs. 1,800" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 font-sans text-slate-100">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-950 to-transparent"></div>
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-400 border border-teal-500/30 text-sm font-bold backdrop-blur-sm shadow-lg shadow-teal-500/10 mb-8">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Transparent Pricing
                        </span>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            <span className="block bg-gradient-to-r from-white via-slate-50 to-white bg-clip-text text-transparent">
                                Simple Pricing,
                            </span>
                            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                No Hidden Fees
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
                            Choose the perfect plan for your laundry needs. All plans include free pickup and delivery.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-full p-2">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-2 rounded-full font-bold transition-all ${
                                    billingCycle === 'monthly'
                                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('yearly')}
                                className={`px-6 py-2 rounded-full font-bold transition-all relative ${
                                    billingCycle === 'yearly'
                                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-white'
                                }`}
                            >
                                Yearly
                                <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-0.5 rounded-full">
                                    Save 17%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                        {pricingPlans.map((plan, index) => (
                            <div
                                key={index}
                                className={`relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-3xl overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                                    plan.highlighted
                                        ? 'border-2 border-teal-500 shadow-2xl shadow-teal-500/30 scale-105 md:scale-110'
                                        : 'border border-slate-700/50 hover:border-slate-600 hover:-translate-y-2'
                                }`}
                            >
                                {plan.highlighted && (
                                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-center py-2 text-sm font-bold">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className={`p-8 ${plan.highlighted ? 'pt-16' : ''}`}>
                                    {/* Plan Header */}
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                                        <p className="text-slate-400 text-sm mb-6">{plan.description}</p>
                                        
                                        <div className="flex items-end justify-center gap-2">
                                            <span className="text-5xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                                Rs. {(billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice).toLocaleString()}
                                            </span>
                                            <span className="text-slate-400 text-lg mb-2">
                                                /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                                            </span>
                                        </div>
                                        
                                        {billingCycle === 'yearly' && (
                                            <p className="text-teal-400 text-sm mt-2">
                                                Rs. {(plan.yearlyPrice / 12).toLocaleString()}/month
                                            </p>
                                        )}
                                    </div>


                                    {/* Features List */}
                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-slate-300">
                                                <svg className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* CTA Button */}
                                    <Link
                                        to="/register"
                                        className={`block w-full py-4 text-center font-bold rounded-xl transition-all ${
                                            plan.highlighted
                                                ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-400 hover:to-cyan-400 shadow-lg shadow-teal-500/30'
                                                : 'bg-slate-700 text-white hover:bg-slate-600'
                                        }`}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pay Per Use Section */}
            <section className="py-24 bg-slate-950/50 border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                                Pay-Per-Use <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Options</span>
                            </h2>
                            <p className="text-lg text-slate-400">
                                Not ready for a subscription? No problem! Use our services as you need them.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {additionalServices.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-all backdrop-blur-sm"
                                >
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-white font-bold">{service.name}</h4>
                                        <span className="text-teal-400 font-black text-xl">{service.price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-slate-400 mb-6">
                                Standard wash & fold: <span className="text-teal-400 font-bold">Rs. 525/1kg</span> (minimum 10 kgs)
                            </p>
                            <Link
                                to="/register"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/30"
                            >
                                Start Your First Order
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-center text-white mb-12">
                            Frequently Asked <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
                        </h2>

                        <div className="space-y-4">
                            {[
                                {
                                    q: "Can I cancel my subscription anytime?",
                                    a: "Yes! You can cancel your subscription at any time. There are no long-term contracts or cancellation fees."
                                },
                                {
                                    q: "What if I don't use all my allocated pounds?",
                                    a: "Unused pounds roll over to the next month for up to 3 months on Professional and Business plans."
                                },
                                {
                                    q: "Do you offer discounts for businesses?",
                                    a: "Yes! We offer custom pricing for businesses with high volume needs. Contact us for a quote."
                                },
                                {
                                    q: "Is there a minimum order?",
                                    a: "For pay-per-use customers, the minimum order is 10 lbs. Subscription plans have no minimum per order."
                                }
                            ].map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-sm"
                                >
                                    <h4 className="text-white font-bold mb-2">{faq.q}</h4>
                                    <p className="text-slate-400">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}