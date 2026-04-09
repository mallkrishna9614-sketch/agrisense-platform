'use client';

const TICKER_ITEMS = [
  { name: 'Wheat', price: '₹2340', change: '+2.4%', up: true },
  { name: 'Rice', price: '₹1940', change: '+1.1%', up: true },
  { name: 'Maize', price: '₹1720', change: '-0.8%', up: false },
  { name: 'Soybean', price: '₹4850', change: '+3.2%', up: true },
  { name: 'Cotton', price: '₹6210', change: '+0.5%', up: true },
  { name: 'Mustard', price: '₹5100', change: '+1.8%', up: true },
  { name: 'Sugarcane', price: '₹320', change: '-1.2%', up: false },
  { name: 'Groundnut', price: '₹5860', change: '+0.9%', up: true },
  { name: 'Barley', price: '₹1880', change: '+0.4%', up: true },
  { name: 'Turmeric', price: '₹12400', change: '+4.1%', up: true },
];

// Duplicate for seamless loop
const allItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function MarketTicker() {
  return (
    <div className="bg-[#0d1f0e] py-3 overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0d1f0e] to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0d1f0e] to-transparent z-10" />

      {/* Label */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-[#43a047] animate-pulse" />
        <span className="text-[#43a047] text-[0.72rem] font-bold tracking-wider uppercase">Live Prices</span>
      </div>

      <div className="flex items-center gap-0">
        <div
          className="flex items-center gap-0 whitespace-nowrap"
          style={{
            animation: 'ticker-scroll 40s linear infinite',
            paddingLeft: '140px',
          }}
        >
          {allItems.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-6 border-r border-[#1a3d1e] last:border-0">
              <span className="text-[#43a047] font-bold text-[0.82rem] tracking-wide">{item.name}</span>
              <span className="text-white font-semibold text-[0.82rem]">{item.price}</span>
              <span className="text-[0.72rem]">₹/qtl</span>
              <span
                className={`text-[0.78rem] font-bold px-1.5 py-0.5 rounded ${
                  item.up
                    ? 'text-[#43a047] bg-[rgba(67,160,71,0.15)]'
                    : 'text-red-400 bg-[rgba(239,68,68,0.15)]'
                }`}
              >
                {item.up ? '▲' : '▼'} {item.change}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
