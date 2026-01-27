import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white w-full overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div
                    className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

                    {/* Left Section: Branding */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 text-center lg:text-left"
                    >
                        <motion.div
                            className="inline-block"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                                <span className="inline-block mr-2 text-3xl sm:text-4xl lg:text-5xl">🍽️</span>
                                <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-teal-400 bg-clip-text text-transparent">
                                    IGIDR Canteen Meal
                                </span>
                            </h2>
                        </motion.div>

                        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Designed to simplify meal operations and enhance your dining experience with ease and efficiency.
                        </p>

                        {/* Quick Links - Mobile/Tablet */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-6 mt-6 lg:mt-8"
                        >
                            <Link
                                to="/about"
                                className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors duration-300 relative group"
                            >
                                About Us
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-teal-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                            <Link
                                to="https://igidrcmp.netlify.app/" target="_blank"
                                className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors duration-300 relative group"
                            >
                                Menu
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-teal-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                            <Link
                                to="/contact"
                                className="text-xs sm:text-sm text-slate-400 hover:text-teal-400 transition-colors duration-300 relative group"
                            >
                                Contact Us
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-teal-400 group-hover:w-full transition-all duration-300" />
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Section: Info & Credits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="lg:col-span-5 text-center lg:text-right space-y-4 sm:space-y-5"
                    >
                        {/* Copyright */}
                        <div className="space-y-2">
                            <p className="text-xs sm:text-sm lg:text-base text-slate-300 font-medium">
                                © {currentYear}{" "}
                                <span className="font-bold bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                                    IGIDR
                                </span>
                                . All rights reserved.
                            </p>

                            {/* Developer Credit */}
                            <motion.p
                                className="text-[10px] sm:text-xs lg:text-sm text-slate-400"
                                whileHover={{ scale: 1.02 }}
                            >
                                Crafted with 💜 by{" "}
                                <Link
                                    target="_blank"
                                    to="https://sites.google.com/igidr.ac.in/kamadhenu/computer-center"
                                    className="text-teal-400 hover:text-teal-300 font-semibold transition-colors duration-300 relative group inline-block"
                                >
                                    Computer Centre
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-400 to-violet-400 group-hover:w-full transition-all duration-300" />
                                </Link>
                                {" "}for the IGIDR community
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                
            </div>

            {/* Bottom Glow Effect */}
            <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent"
                animate={{
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </footer>
    );
}

export default Footer;