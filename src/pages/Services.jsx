import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Services() {
    const getServiceIcon = (type) => {
        const icons = {
            washFold: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>,
            dryCleaning: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>,
            ironing: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
            shoes: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>,
            alterations: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>,
            commercial: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        };
        return icons[type];
    };

    const services = [
        {
            id: 1,
            type: "washFold",
            title: "Wash & Fold",
            price: "From Rs. 450/lb",
            description: "Professional washing, drying, and folding service. Your clothes are carefully sorted, washed with premium detergents, and neatly folded.",
            features: ["Sorted by color & fabric", "Premium detergents", "Neatly folded", "24-48 hour turnaround"],
            gradient: "from-teal-500 to-cyan-500",
            imageGradient: "from-teal-500/20 to-cyan-500/20"
        },
        {
            id: 2,
            type: "dryCleaning",
            title: "Dry Cleaning",
            price: "From Rs. 2,100/item",
            description: "Expert dry cleaning for delicate fabrics and professional attire. We use eco-friendly solvents that are gentle on clothes and the environment.",
            features: ["Delicate fabric care", "Eco-friendly solvents", "Professional pressing", "Stain treatment included"],
            gradient: "from-cyan-500 to-blue-500",
            imageGradient: "from-cyan-500/20 to-blue-500/20"
        },
        {
            id: 3,
            type: "ironing",
            title: "Ironing & Pressing",
            price: "From Rs. 700/item",
            description: "Professional ironing and pressing to keep your clothes crisp and wrinkle-free. Perfect for business attire and special occasions.",
            features: ["Wrinkle-free finish", "Professional equipment", "Starch options available", "Hanger or fold service"],
            gradient: "from-purple-500 to-pink-500",
            imageGradient: "from-purple-500/20 to-pink-500/20"
        },
        {
            id: 4,
            type: "shoes",
            title: "Shoe Cleaning",
            price: "From Rs. 500/pair",
            description: "Specialized cleaning for all types of footwear. We restore your shoes to their original glory with professional-grade cleaning products.",
            features: ["All shoe types", "Deep cleaning", "Odor elimination", "Protective coating"],
            gradient: "from-orange-500 to-red-500",
            imageGradient: "from-orange-500/20 to-red-500/20"
        },
        {
            id: 5,
            type: "alterations",
            title: "Alterations & Repairs",
            price: "From Rs. 3  ,500/item",
            description: "Expert tailoring and repair services. From hemming to zipper replacement, we handle all alterations with precision and care.",
            features: ["Professional tailoring", "Quick turnaround", "All garment types", "Quality guaranteed"],
            gradient: "from-green-500 to-emerald-500",
            imageGradient: "from-green-500/20 to-emerald-500/20"
        },
        {
            id: 6,
            type: "commercial",
            title: "Commercial Laundry",
            price: "Custom Quote",
            description: "Bulk laundry services for businesses, hotels, restaurants, and healthcare facilities. Reliable, efficient, and cost-effective solutions.",
            features: ["Volume discounts", "Scheduled pickups", "Custom requirements", "Dedicated support"],
            gradient: "from-indigo-500 to-purple-500",
            imageGradient: "from-indigo-500/20 to-purple-500/20"
        }
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            Premium Laundry Services
                        </span>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            <span className="block bg-gradient-to-r from-white via-slate-50 to-white bg-clip-text text-transparent">
                                Complete Care for
                            </span>
                            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                Every Fabric
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
                            From everyday laundry to delicate dry cleaning, we've got you covered with professional care and convenience.
                        </p>

                        <Link
                            to="/register"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-xl shadow-teal-500/40 hover:scale-105"
                        >
                            Get Started Today
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-3xl border border-slate-700/50 overflow-hidden hover:border-teal-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-500/20 backdrop-blur-sm"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Image Section with Icon */}
                                <div className={`relative h-48 bg-gradient-to-br ${service.imageGradient} flex items-center justify-center overflow-hidden`}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-transparent"></div>
                                    <div className={`relative w-20 h-20 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        {getServiceIcon(service.type)}
                                    </div>
                                    {/* Decorative Elements */}
                                    <div className="absolute top-4 right-4 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
                                    <div className="absolute bottom-4 left-4 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                                </div>

                                {/* Content */}
                                <div className="p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                                            {service.title}
                                        </h3>
                                        <span className={`text-sm font-bold px-3 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white whitespace-nowrap`}>
                                            {service.price}
                                        </span>
                                    </div>
                                    
                                    <p className="text-slate-400 mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                                                <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/register"
                                        className={`flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r ${service.gradient} text-white font-bold rounded-xl hover:shadow-lg transition-all group/btn`}
                                    >
                                        Book Service
                                        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Our Services Section */}
            <section className="py-24 bg-slate-950/50 border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Why Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Services Stand Out</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            We combine professional expertise with modern convenience to deliver exceptional results every time.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/30">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Quality Guaranteed</h3>
                            <p className="text-slate-400 text-sm">
                                100% satisfaction or your money back
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/30">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Fast Turnaround</h3>
                            <p className="text-slate-400 text-sm">
                                Most services completed within 24-48 hours
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Eco-Friendly</h3>
                            <p className="text-slate-400 text-sm">
                                Biodegradable detergents and green practices
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/30">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Free Delivery</h3>
                            <p className="text-slate-400 text-sm">
                                Pickup and delivery at no extra charge
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-slate-950 to-cyan-900/20"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Experience the <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Difference?</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of satisfied customers and get your first order with 20% OFF
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-xl shadow-teal-500/40 hover:scale-105"
                    >
                        Get Started Free
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}