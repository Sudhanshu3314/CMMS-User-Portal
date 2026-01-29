const MenuShimmer = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 px-2 sm:px-0">

            {/* Lunch Shimmer Card */}
            <div className="group animate-fade-in-left">
                <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-emerald-200/50 overflow-hidden">
                    {/* Soft Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50 pointer-events-none"></div>

                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 md:w-64 h-16 sm:h-24 md:h-32 bg-emerald-200/30 blur-3xl rounded-full"></div>

                    <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                        {/* Header Shimmer */}
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-3 sm:mb-4 md:mb-6 lg:mb-8 pb-2 sm:pb-3 md:pb-4 lg:pb-6 border-b-2 border-emerald-200/50">
                            {/* Icon Shimmer */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-emerald-300 rounded-lg sm:rounded-xl md:rounded-2xl blur-lg opacity-30"></div>
                                <div className="relative p-1.5 sm:p-2 md:p-3 lg:p-4 bg-gradient-to-br from-emerald-400/40 to-teal-500/40 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg shimmer">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"></div>
                                </div>
                            </div>

                            {/* Title Shimmer */}
                            <div className="flex-1 min-w-0">
                                <div className="h-5 sm:h-6 md:h-8 lg:h-10 w-20 sm:w-24 md:w-32 lg:w-36 bg-gradient-to-r from-emerald-200/60 to-teal-200/60 rounded-lg mb-0.5 sm:mb-1 md:mb-2 shimmer"></div>
                                <div className="h-2 sm:h-3 md:h-4 w-16 sm:w-20 md:w-24 lg:w-28 bg-emerald-100/60 rounded shimmer"></div>
                            </div>

                            {/* Count Badge Shimmer */}
                            <div className="flex-shrink-0">
                                <div className="w-8 sm:w-10 md:w-12 lg:w-14 h-5 sm:h-6 md:h-7 lg:h-8 bg-emerald-100/80 rounded-full border border-emerald-200 shimmer"></div>
                            </div>
                        </div>

                        {/* Menu Items Shimmer */}
                        <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
                            {[...Array(9)].map((_, index) => (
                                <li
                                    key={index}
                                    className="relative flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-r from-emerald-50/80 to-teal-50/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-emerald-200/40"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Emoji Placeholder */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-emerald-200/50 rounded-full shimmer"></div>
                                    </div>

                                    {/* Text Shimmer */}
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="h-3 sm:h-4 md:h-5 bg-gradient-to-r from-emerald-200/60 to-teal-200/60 rounded shimmer"
                                            style={{ width: `${60 + Math.random() * 30}%` }}
                                        ></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 to-emerald-400/0"></div>
                </div>
            </div>

            {/* Dinner Shimmer Card */}
            <div className="group animate-fade-in-right">
                <div className="relative h-full bg-white/90 backdrop-blur-xl rounded-xl sm:rounded-2xl md:rounded-3xl shadow-xl border border-purple-200/50 overflow-hidden">
                    {/* Soft Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-pink-50/30 to-indigo-50/50 pointer-events-none"></div>

                    {/* Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 sm:w-48 md:w-64 h-16 sm:h-24 md:h-32 bg-purple-200/30 blur-3xl rounded-full"></div>

                    <div className="relative p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10">
                        {/* Header Shimmer */}
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-3 sm:mb-4 md:mb-6 lg:mb-8 pb-2 sm:pb-3 md:pb-4 lg:pb-6 border-b-2 border-purple-200/50">
                            {/* Icon Shimmer */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute inset-0 bg-purple-300 rounded-lg sm:rounded-xl md:rounded-2xl blur-lg opacity-30"></div>
                                <div className="relative p-1.5 sm:p-2 md:p-3 lg:p-4 bg-gradient-to-br from-purple-500/40 to-pink-500/40 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg shimmer">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8"></div>
                                </div>
                            </div>

                            {/* Title Shimmer */}
                            <div className="flex-1 min-w-0">
                                <div className="h-5 sm:h-6 md:h-8 lg:h-10 w-24 sm:w-28 md:w-36 lg:w-40 bg-gradient-to-r from-purple-200/60 to-pink-200/60 rounded-lg mb-0.5 sm:mb-1 md:mb-2 shimmer"></div>
                                <div className="h-2 sm:h-3 md:h-4 w-20 sm:w-24 md:w-28 lg:w-32 bg-purple-100/60 rounded shimmer"></div>
                            </div>

                            {/* Count Badge Shimmer */}
                            <div className="flex-shrink-0">
                                <div className="w-8 sm:w-10 md:w-12 lg:w-14 h-5 sm:h-6 md:h-7 lg:h-8 bg-purple-100/80 rounded-full border border-purple-200 shimmer"></div>
                            </div>
                        </div>

                        {/* Menu Items Shimmer */}
                        <ul className="space-y-2 sm:space-y-2.5 md:space-y-3 lg:space-y-4">
                            {[...Array(5)].map((_, index) => (
                                <li
                                    key={index}
                                    className="relative flex items-start gap-2 sm:gap-2.5 md:gap-3 lg:gap-4 p-2 sm:p-3 md:p-4 lg:p-5 bg-gradient-to-r from-purple-50/80 to-pink-50/80 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl border border-purple-200/40"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Emoji Placeholder */}
                                    <div className="relative flex-shrink-0">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 bg-purple-200/50 rounded-full shimmer"></div>
                                    </div>

                                    {/* Text Shimmer */}
                                    <div className="flex-1 min-w-0">
                                        <div
                                            className="h-3 sm:h-4 md:h-5 bg-gradient-to-r from-purple-200/60 to-pink-200/60 rounded shimmer"
                                            style={{ width: `${60 + Math.random() * 30}%` }}
                                        ></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Bottom Accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400/0 via-purple-400/50 to-purple-400/0"></div>
                </div>
            </div>

            <style jsx="true">{`
                @keyframes shimmer {
                    0% {
                        background-position: -200% 0;
                    }
                    100% {
                        background-position: 200% 0;
                    }
                }

                .shimmer {
                    background: linear-gradient(
                        90deg,
                        rgba(255, 255, 255, 0) 0%,
                        rgba(255, 255, 255, 0.4) 50%,
                        rgba(255, 255, 255, 0) 100%
                    );
                    background-size: 200% 100%;
                    animation: shimmer 2s infinite;
                }

                @keyframes fade-in-left {
                    from {
                        opacity: 0;
                        transform: translateX(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fade-in-right {
                    from {
                        opacity: 0;
                        transform: translateX(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .animate-fade-in-left {
                    animation: fade-in-left 0.6s ease-out;
                }

                .animate-fade-in-right {
                    animation: fade-in-right 0.6s ease-out;
                }
            `}</style>
        </div>
    );
};

export default MenuShimmer;
