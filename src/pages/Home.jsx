import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function Home() {
    const [showPopup, setShowPopup] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 font-sans text-slate-100">
            {/* Navbar */}
            <Navbar />

            {/* Enhanced Hero Section */}
            <header className="relative pt-32 pb-40 lg:pt-48 lg:pb-72 overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-900/30 via-slate-950 to-transparent"></div>
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                    <div className="absolute bottom-1/4 left-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '3s' }}></div>
                    
                    {/* Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl mx-auto">
                        {/* Badge */}
                        <div className="flex justify-center mb-8" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
                            <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 text-teal-400 border border-teal-500/30 text-sm font-bold backdrop-blur-sm shadow-lg shadow-teal-500/10">
                                <svg className="w-4 h-4 animate-spin-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                Trusted by 10,000+ Customers
                            </span>
                        </div>

                        {/* Main Heading */}
                        <div className="text-center mb-10">
                            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 leading-[0.9] tracking-tight">
                                <span className="block bg-gradient-to-r from-white via-slate-50 to-white bg-clip-text text-transparent drop-shadow-2xl">
                                    Laundry Made
                                </span>
                                <span className="block bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-400 bg-clip-text text-transparent animate-gradient">
                                    Effortless
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-4">
                                Premium laundry service with <span className="text-teal-400 font-semibold">free pickup & delivery</span> in 24 hours
                            </p>
                            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
                                More time for what matters. Let us handle your laundry while you focus on life.
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link
                                to="/register"
                                className="group relative px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-2xl hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-2xl shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 flex items-center justify-center overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center">
                                    Get Started Free
                                    <svg className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                            <Link
                                to="/services"
                                className="group px-10 py-5 bg-slate-800/50 backdrop-blur-xl border-2 border-slate-700/50 text-white text-lg font-bold rounded-2xl hover:bg-slate-800/70 hover:border-teal-500/50 transition-all duration-300 flex items-center justify-center"
                            >
                                Explore Services
                                <svg className="ml-2 h-5 w-5 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
                            <div className="text-center p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 hover:border-teal-500/30 transition-all duration-300">
                                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">24h</div>
                                <div className="text-sm text-slate-400 font-medium">Turnaround</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 hover:border-cyan-500/30 transition-all duration-300">
                                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">10k+</div>
                                <div className="text-sm text-slate-400 font-medium">Happy Customers</div>
                            </div>
                            <div className="text-center p-6 rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800/50 hover:border-purple-500/30 transition-all duration-300">
                                <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent mb-2">Free</div>
                                <div className="text-sm text-slate-400 font-medium">Pickup & Delivery</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute bottom-10 left-10 animate-float hidden lg:block" style={{ animationDelay: '0s' }}>
                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl backdrop-blur-sm border border-teal-500/30 flex items-center justify-center transform rotate-12">
                        <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <div className="absolute top-40 right-20 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-cyan-500/30 flex items-center justify-center">
                        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-24 bg-slate-950/50 backdrop-blur-sm border-y border-slate-800/50 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-teal-950/10 to-transparent"></div>
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-teal-400 font-bold text-sm uppercase tracking-wider mb-4 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            උසස් සේවාවක්, <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">පහසු මිලකට</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Experience the difference of professional laundry care with convenience at its core
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-10 rounded-3xl border border-teal-500/20 text-center hover:border-teal-500/50 hover:shadow-2xl hover:shadow-teal-500/20 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-teal-500/40">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Free Pickup & Delivery</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Schedule online and we'll collect your laundry from your doorstep. Get it back fresh, clean, and neatly folded.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-10 rounded-3xl border border-cyan-500/20 text-center hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-cyan-500/40">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">24-Hour Express</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Need it fast? Our express service guarantees your clothes back in just 24 hours, perfectly cleaned and pressed.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-10 rounded-3xl border border-purple-500/20 text-center hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-500 backdrop-blur-sm overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl shadow-purple-500/40">
                                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">Eco-Friendly Care</h3>
                                <p className="text-slate-400 leading-relaxed">
                                    Premium biodegradable detergents that are tough on stains but gentle on fabrics and the environment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4 block">Simple Process</span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                            How It <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Works</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Getting started is as easy as 1-2-3
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {/* Step 1 */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm hover:border-teal-500/30 transition-all duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-teal-500/40">
                                    1
                                </div>
                                <div className="mt-8">
                                    <div className="w-16 h-16 bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 border border-teal-500/20">
                                        <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Schedule Pickup</h3>
                                    <p className="text-slate-400">
                                        Choose a convenient time for us to collect your laundry from your location.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-cyan-500/40">
                                    2
                                </div>
                                <div className="mt-8">
                                    <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 border border-cyan-500/20">
                                        <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">We Clean</h3>
                                    <p className="text-slate-400">
                                        Our experts clean, wash, and fold your clothes with premium care and attention.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-purple-500/40">
                                    3
                                </div>
                                <div className="mt-8">
                                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                                        <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">Fast Delivery</h3>
                                    <p className="text-slate-400">
                                        Receive your fresh, clean laundry delivered right to your doorstep in 24 hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 bg-slate-950/50 border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-teal-400 font-bold text-sm uppercase tracking-wider mb-4 block">Testimonials</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                            Loved by <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Thousands</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Testimonial 1 */}
                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm hover:border-teal-500/30 transition-all duration-300">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                "මේ ආයතනය හරිම ගුණාත්මක සේවාවක් සපයනවා. මගේ සතියේ රෙදි සෝදන්න යන වෙලාව සම්පූර්ණයෙන්ම ඉතුරු කරගන්න පුළුවන් උනා"
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    SM
                                </div>
                                <div className="ml-4">
                                    <div className="text-white font-bold">කුමාරි සේනානායක</div>
                                    <div className="text-slate-400 text-sm">Marketing Manager</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                "Best laundry service I've ever used. The 24-hour turnaround is perfect for my busy schedule. Highly recommend!"
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    JD
                                </div>
                                <div className="ml-4">
                                    <div className="text-white font-bold">James Davidson</div>
                                    <div className="text-slate-400 text-sm">Entrepreneur</div>
                                </div>
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-3xl border border-slate-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300">
                            <div className="flex items-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 leading-relaxed">
                                "මම මීට කලින් ගණුදෙනු කරපු කිසිම ආයතනයක් මේ තරම් හොඳ සේවාවක් මට දීලා නෑ. පාවිච්චි කරන ඩිටර්ජන්ට් පරිසර හිතකාමී නිසා බය නැතුව කාලයක් උනත් සේවාව ලබාගන්න පුළුවන්"
                            </p>
                            <div className="flex items-center">
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                    EW
                                </div>
                                <div className="ml-4">
                                    <div className="text-white font-bold">සෝමලතා ගුණවර්ධන</div>
                                    <div className="text-slate-400 text-sm">Teacher</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-900/30 via-slate-950 to-cyan-900/30"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/20 rounded-full blur-[150px]"></div>
                </div>

                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                        Ready to Transform Your
                        <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                            Laundry Experience?
                        </span>
                    </h2>
                    <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of satisfied customers and get your first order with <span className="text-teal-400 font-bold">20% OFF</span>
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xl font-bold rounded-2xl hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-2xl shadow-teal-500/40 hover:shadow-teal-500/60 hover:scale-105 group"
                    >
                        ඔබේ පළමු ඇණවුමට
                        <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                    <p className="text-slate-400 mt-6 text-sm">
                        Use code <span className="font-mono bg-slate-800 px-3 py-1 rounded text-teal-400 font-bold border border-teal-500/30">FRESH20</span> at checkout
                    </p>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Welcome Popup */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPopup(false)}></div>
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-teal-500/30 animate-scaleIn">
                        <button
                            onClick={() => setShowPopup(false)}
                            className="absolute top-4 right-4 p-2 bg-slate-800/80 backdrop-blur rounded-full hover:bg-slate-700 transition-colors z-10 border border-slate-700 group"
                        >
                            <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="bg-gradient-to-br from-teal-600 to-cyan-600 h-40 flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                            <div className="relative z-10 flex items-center gap-3">
                                <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                <h3 className="text-4xl font-black text-white drop-shadow-lg">Special Offer!</h3>
                            </div>
                        </div>

                        <div className="p-8 text-center">
                            <p className="text-2xl text-slate-200 mb-2">
                                Get <span className="font-black text-transparent text-4xl bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text">20% OFF</span>
                            </p>
                            <p className="text-xl text-slate-200 mb-4">your first order!</p>
                            <p className="text-slate-400 mb-8 text-sm">
                                Use code <span className="font-mono bg-slate-800 px-3 py-1 rounded text-teal-400 font-bold border border-teal-500/30 text-base">FRESH20</span> at checkout
                            </p>

                            <Link
                                to="/register"
                                className="block w-full py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-2xl hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 hover:scale-105"
                                onClick={() => setShowPopup(false)}
                            >
                                Claim Your Discount Now
                            </Link>
                            <p className="text-slate-500 text-xs mt-4">Limited time offer • New customers only</p>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(5deg); }
                }
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scaleIn {
                    from { transform: scale(0.9); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 5s ease infinite;
                }
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
                .animate-scaleIn {
                    animation: scaleIn 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}
