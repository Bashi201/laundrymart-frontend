import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 font-sans text-slate-100">
            {/* Use unified Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="relative pt-32 pb-40 lg:pt-48 lg:pb-64 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 via-transparent to-cyan-900/40"></div>
                    <div className="absolute top-20 left-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-sm font-bold mb-8 backdrop-blur-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>
                            #1 Laundry Service in Town
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight tracking-tight">
                            <span className="bg-gradient-to-r from-white via-teal-100 to-white bg-clip-text text-transparent">
                                Fresh Clothes,
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                Zero Stress.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light leading-relaxed max-w-2xl mx-auto">
                            We pick up, clean, and deliver your laundry in 24 hours. Experience the ultimate convenience today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                to="/register"
                                className="px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105 flex items-center justify-center group"
                            >
                                Get Started Free
                                <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                            <Link
                                to="/pricing"
                                className="px-10 py-5 bg-slate-800/50 backdrop-blur-md border border-slate-700/50 text-white text-lg font-bold rounded-xl hover:bg-slate-800/70 hover:border-teal-500/50 transition-all flex items-center justify-center"
                            >
                                View Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-slate-950/50 backdrop-blur-sm border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Why Choose <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">LaundryMart</span>?
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            We don't just clean clothes; we care for them. Here's why thousands trust us.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-teal-500/20 text-center hover:border-teal-500/40 hover:shadow-xl hover:shadow-teal-500/10 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-teal-500/30">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Free Pickup & Delivery</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Don't leave your house. We collect your dirty laundry and return it fresh and folded, absolutely free.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-purple-500/20 text-center hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/30">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">24h Turnaround</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Use our Express Service to get your clothes back in as little as 24 hours. Because time is money.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-10 rounded-3xl border border-cyan-500/20 text-center hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-2 transition-all duration-300 group">
                            <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-cyan-500/30">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">Quality Guarantee</h3>
                            <p className="text-slate-400 leading-relaxed">
                                Not happy with the results? We'll re-wash your clothes for free. No questions asked.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="py-24 overflow-hidden">
                <div className="container mx-auto px-6 space-y-32">
                    {/* Feature Row 1 */}
                    <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full md:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden border border-teal-500/30 shadow-2xl shadow-teal-500/20 transform hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20"></div>
                                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <svg className="w-24 h-24 text-teal-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                Experience the <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Difference</span>
                            </h2>
                            <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                There's nothing quite like the scent of freshly cleaned laundry. We use premium, eco-friendly detergents that are tough on stains but gentle on your fabrics and senses. Your clothes will look great and smell even better.
                            </p>
                            <Link to="/services" className="text-teal-400 font-bold hover:text-teal-300 flex items-center group">
                                Learn about our detergents 
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Feature Row 2 */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                        <div className="w-full md:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 transform hover:scale-105 transition-transform duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"></div>
                                <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <svg className="w-24 h-24 text-cyan-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                                Expert Care, <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Guaranteed</span>
                            </h2>
                            <p className="text-lg text-slate-300 leading-relaxed mb-8">
                                Our team is trained to handle all types of fabrics with the utmost care. From delicate silks to heavy comforters, we ensure every item is returned to you in perfect condition. We treat your laundry like it's our own.
                            </p>
                            <Link to="/about" className="text-cyan-400 font-bold hover:text-cyan-300 flex items-center group">
                                Meet our team 
                                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-teal-900/20 via-slate-950 to-cyan-900/20 border-y border-teal-500/20">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        Ready to Save Time?
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Join thousands of satisfied customers who've made the switch to hassle-free laundry.
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
                    >
                        Start Your First Order
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>
            </section>

            {/* Modern Footer */}
                <Footer />

            {/* Welcome Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-teal-500/30">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 p-2 bg-slate-800/80 backdrop-blur rounded-full hover:bg-slate-700 transition-colors z-10 border border-slate-700"
                        >
                            <svg className="w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 h-32 flex items-center justify-center relative overflow-hidden">
                            <div className="relative z-10 flex items-center gap-3">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                <h3 className="text-3xl font-black text-white drop-shadow-lg">Special Offer!</h3>
                            </div>
                        </div>

                        <div className="p-8 text-center">
                            <p className="text-xl text-slate-200 mb-2">
                                Get <span className="font-black text-teal-400 text-2xl">20% OFF</span> your first order!
                            </p>
                            <p className="text-slate-400 mb-8 text-sm">
                                Use code <span className="font-mono bg-slate-800 px-3 py-1 rounded text-teal-400 font-bold border border-teal-500/30">FRESH20</span> at checkout.
                            </p>

                            <Link
                                to="/register"
                                className="block w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50"
                                onClick={() => setShowPopup(false)}
                            >
                                Claim Offer Now
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}