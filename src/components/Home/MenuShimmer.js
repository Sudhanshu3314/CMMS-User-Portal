const MenuShimmer = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">

            {/* Lunch Shimmer */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl p-4 sm:p-6 md:p-10 border border-blue-100
                bg-gradient-to-b from-[rgba(18,219,0,0.12)] via-white/60 to-[rgba(18,219,0,0.12)]
                backdrop-blur-xl glass-shimmer"
            >
                {/* Header */}
                <div className="flex items-center mb-4">
                    <div className="w-9 h-9 rounded-full glass shimmer mr-3" />
                    <div className="h-7 w-48 rounded-md glass shimmer" />
                </div>

                {/* List */}
                <ul className="space-y-3">
                    {[...Array(9)].map((_, index) => (
                        <li
                            key={index}
                            className="flex items-center p-3 rounded-lg bg-blue-50/40 backdrop-blur-sm"
                        >
                            <div className="w-2 h-2 rounded-full glass shimmer mr-3" />
                            <div className="h-5 w-full rounded-md glass shimmer" />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Dinner Shimmer */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl p-4 sm:p-6 md:p-10 border border-pink-100
                bg-gradient-to-b from-[rgba(219,0,172,0.12)] via-white/60 to-[rgba(219,0,172,0.12)]
                backdrop-blur-xl glass-shimmer"
            >
                {/* Header */}
                <div className="flex items-center mb-4">
                    <div className="w-9 h-9 rounded-full glass shimmer mr-3" />
                    <div className="h-7 w-52 rounded-md glass shimmer" />
                </div>

                {/* List */}
                <ul className="space-y-3">
                    {[...Array(9)].map((_, index) => (
                        <li
                            key={index}
                            className="flex items-center p-3 rounded-lg bg-pink-50/40 backdrop-blur-sm"
                        >
                            <div className="w-2 h-2 rounded-full glass shimmer mr-3" />
                            <div className="h-5 w-full rounded-md glass shimmer" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MenuShimmer;
