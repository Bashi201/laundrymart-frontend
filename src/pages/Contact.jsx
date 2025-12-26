import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const getContactIcon = (type) => {
        const icons = {
            phone: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>,
            email: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>,
            location: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>,
            hours: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        };
        return icons[type];
    };

    const contactInfo = [
        {
            type: "phone",
            title: "Phone",
            details: ["+94 11 234 5678", "Mon-Fri: 8AM-8PM"],
            gradient: "from-teal-500 to-cyan-500"
        },
        {
            type: "email",
            title: "Email",
            details: ["support@laundrymart.lk", "24/7 Support"],
            gradient: "from-cyan-500 to-blue-500"
        },
        {
            type: "location",
            title: "Location",
            details: ["123 Galle Road", "Colombo 03, Sri Lanka"],
            gradient: "from-purple-500 to-pink-500"
        },
        {
            type: "hours",
            title: "Business Hours",
            details: ["Mon-Fri: 7AM-9PM", "Sat-Sun: 8AM-8PM"],
            gradient: "from-green-500 to-emerald-500"
        }
    ];

    const faqs = [
        {
            q: "How quickly can I get my laundry back?",
            a: "Our standard service is 48 hours, but we offer express 24-hour service for urgent needs."
        },
        {
            q: "What areas do you service?",
            a: "We currently serve all of Manhattan, Brooklyn, and Queens. Check our coverage map for specific neighborhoods."
        },
        {
            q: "Do I need to be home for pickup and delivery?",
            a: "No! You can leave your laundry in a designated spot, and we'll return it the same way. Many customers use our secure bag system."
        },
        {
            q: "What if I'm not satisfied with the service?",
            a: "We offer a 100% satisfaction guarantee. If you're not happy, we'll re-clean your items for free or provide a full refund."
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
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            We're Here to Help
                        </span>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                            <span className="block bg-gradient-to-r from-white via-slate-50 to-white bg-clip-text text-transparent">
                                Get in Touch
                            </span>
                            <span className="block bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                With Us
                            </span>
                        </h1>
                        
                        <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                            Have questions? We're here to help you 24/7. Reach out and we'll get back to you as soon as possible.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 relative">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-all backdrop-blur-sm text-center"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                    <div className="text-white">{getContactIcon(info.type)}</div>
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2">{info.title}</h3>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-slate-400 text-sm">{detail}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map Section */}
            <section className="py-24 bg-slate-950/50 border-y border-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                                Send Us a <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Message</span>
                            </h2>
                            <p className="text-slate-400 mb-8">
                                Fill out the form below and we'll get back to you within 24 hours.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2">
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                            placeholder="john@example.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-slate-300 mb-2">
                                            Phone
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                            placeholder="+94 71 234 5678"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                                        placeholder="How can we help?"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="6"
                                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors resize-none"
                                        placeholder="Tell us more about your inquiry..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-xl hover:from-teal-400 hover:to-cyan-400 transition-all shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 flex items-center justify-center gap-2"
                                >
                                    {submitted ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Map/Additional Info */}
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
                                Visit Our <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">Location</span>
                            </h2>
                            
                            {/* Map Placeholder */}
                            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-3xl border border-slate-700/50 overflow-hidden mb-8 h-80 flex items-center justify-center backdrop-blur-sm">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-slate-400 text-lg">
                                        123 Galle Road<br />
                                        Colombo 03, Sri Lanka
                                    </p>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-3xl border border-slate-700/50 p-8 backdrop-blur-sm">
                                <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
                                <div className="grid grid-cols-4 gap-4">
                                    {[
                                        { name: 'Facebook', icon: 'F' },
                                        { name: 'Twitter', icon: 'T' },
                                        { name: 'Instagram', icon: 'I' },
                                        { name: 'LinkedIn', icon: 'L' }
                                    ].map((social, index) => (
                                        <button
                                            key={index}
                                            className="w-full aspect-square bg-slate-800/50 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 border border-slate-700 hover:border-teal-500 rounded-xl flex items-center justify-center text-slate-400 hover:text-white font-bold text-xl transition-all"
                                        >
                                            {social.icon}
                                        </button>
                                    ))}
                                </div>
                            </div>
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
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-2xl border border-slate-700/50 p-6 backdrop-blur-sm hover:border-teal-500/30 transition-all"
                                >
                                    <h4 className="text-white font-bold mb-3 flex items-start gap-3">
                                        <svg className="w-6 h-6 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {faq.q}
                                    </h4>
                                    <p className="text-slate-400 ml-9">{faq.a}</p>
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