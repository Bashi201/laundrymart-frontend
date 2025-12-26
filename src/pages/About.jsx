import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function About() {
    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            initial: "SJ",
            gradient: "from-teal-500 to-cyan-500"
        },
        {
            name: "Michael Chen",
            role: "Operations Director",
            initial: "MC",
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            name: "Emily Rodriguez",
            role: "Customer Success Lead",
            initial: "ER",
            gradient: "from-purple-500 to-pink-500"
        },
        {
            name: "David Kim",
            role: "Quality Assurance Manager",
            initial: "DK",
            gradient: "from-green-500 to-emerald-500"
        }
    ];

    const values = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: "Quality First",
            description: "Every item is treated with meticulous care and attention to detail.",
            gradient: "from-teal-500 to-cyan-500"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Eco-Conscious",
            description: "We use biodegradable detergents and sustainable practices to protect our planet.",
            gradient: "from-green-500 to-emerald-500"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Always Reliable",
            description: "Count on us for consistent, timely service that fits your schedule.",
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: "Customer Delight",
            description: "Your satisfaction is our priority. We go above and beyond every time.",
            gradient: "from-purple-500 to-pink-500"
        }
    ];

    const stats = [
        { number: "10,000+", label: "Happy Customers" },
        { number: "50,000+", label: "Orders Completed" },
        { number: "24h", label: "Express Service" },
        { number: "99.9%", label: "Satisfaction Rate" }
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            About LaundryMart
                        </span>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            <span className="block bg-gradient-to-r from-white via-slate-50 to-white bg-clip-text text-transparent">
                                Making Laundry Day
                            </span>
                            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                Your Best Day
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            Founded in 2020, we've revolutionized laundry services with convenience, quality, and care at the heart of everything we do.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm hover:border-teal-500/30 transition-all"
                            >
                                <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-slate-400 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 bg-slate-950/50 border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-center mb-12">
                            Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Story</span>
                        </h2>
                        
                        <div className="space-y-6 text-lg text-slate-300 leading-relaxed">
                            <p>
                                LaundryMart was born from a simple frustration: why was doing laundry still such a time-consuming chore in the 21st century? Our founder, Sarah Johnson, spent years juggling a demanding career while trying to keep up with household responsibilities. She knew there had to be a better way.
                            </p>
                            <p>
                                In 2020, we launched with a mission to give people their time back. What started as a small operation with one delivery van has grown into a trusted service serving thousands of customers across the city. But despite our growth, we've never lost sight of what matters most: treating every garment with care and every customer with respect.
                            </p>
                            <p>
                                Today, we're proud to be the city's leading laundry service, combining cutting-edge technology with old-fashioned attention to detail. From our eco-friendly practices to our 24-hour express service, everything we do is designed to make your life easier while taking exceptional care of your clothes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Values</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            These core principles guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-8 rounded-3xl border border-slate-700/50 hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm text-center"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                    <div className="text-white">{value.icon}</div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-slate-950/50 border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Meet Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Team</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Passionate professionals dedicated to making your laundry experience exceptional
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-3xl border border-slate-700/50 overflow-hidden hover:border-teal-500/30 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm"
                            >
                                {/* Avatar Section */}
                                <div className="relative h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10"></div>
                                    <div className={`relative w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-full flex items-center justify-center text-white font-black text-3xl shadow-2xl ring-4 ring-slate-800`}>
                                        {member.initial}
                                    </div>
                                </div>
                                
                                {/* Info Section */}
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                                    <p className="text-teal-400 text-sm font-medium">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-slate-950 to-cyan-900/20"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                        Ready to Join Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Family?</span>
                    </h2>
                    <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        Experience the LaundryMart difference. Get your first order with 20% OFF
                    </p>
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-lg font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all duration-300 shadow-xl shadow-teal-500/40 hover:scale-105"
                    >
                        Get Started Today
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
//test