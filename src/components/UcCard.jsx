import React from 'react';
import { ShoppingCart, Flame, Gift, Award } from 'lucide-react';
import { UcCoinIcon, UcStackIcon, UcCrateIcon, AirDropCrateIcon } from './icons/GamingIcons';

export default function UcCard({ pack, onSelect }) {
  const { ucAmount, bonusUC, price, originalPrice, badge, isStock } = pack;

  const totalUC = ucAmount + bonusUC;
  const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);

  // Select 3D Graphic based on pack tier
  const renderUcGraphic = () => {
    if (totalUC <= 100) {
      return <UcCoinIcon className="w-14 h-14 sm:w-20 sm:h-20 drop-shadow-xl" />;
    } else if (totalUC <= 700) {
      return <UcStackIcon className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-2xl" />;
    } else if (totalUC <= 4000) {
      return <UcCrateIcon className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-2xl" />;
    } else {
      return <AirDropCrateIcon className="w-16 h-16 sm:w-24 sm:h-24 drop-shadow-2xl" />;
    }
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl glass-card p-3.5 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/15 border border-slate-800 hover:border-amber-500/50">
      
      {/* Badge Top Left */}
      {badge && (
        <div className="absolute -top-2.5 left-3 sm:left-4 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-slate-950 text-[9px] sm:text-[11px] font-black tracking-wider uppercase shadow-md shadow-amber-500/40">
            <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3 stroke-[2.5]" />
            {badge}
          </span>
        </div>
      )}

      {/* Discount Badge Top Right */}
      {discountPercent > 0 && (
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10">
          <span className="px-1.5 py-0.5 sm:px-2.5 sm:py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[9px] sm:text-[11px] font-extrabold tracking-wide">
            {discountPercent}% OFF
          </span>
        </div>
      )}

      {/* Card Header & UC Graphic */}
      <div className="flex flex-col items-center pt-2 sm:pt-3 pb-2 sm:pb-4">
        
        {/* 3D Rendered Asset Container */}
        <div className="relative my-2 sm:my-3 w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/15 via-orange-500/10 to-transparent rounded-full blur-xl group-hover:scale-125 transition-transform duration-500" />
          <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
            {renderUcGraphic()}
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-0.5 sm:space-y-1">
          <h3 className="font-black text-lg sm:text-2xl text-white tracking-tight flex items-center justify-center gap-1">
            <span>{totalUC}</span>
            <span className="text-amber-400 text-sm sm:text-lg">UC</span>
          </h3>
          {bonusUC > 0 ? (
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-xs font-bold">
              <Gift className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              +{bonusUC} Bonus
            </span>
          ) : (
            <p className="text-[10px] sm:text-xs text-slate-400 font-medium">Standard Pack</p>
          )}
        </div>

      </div>

      {/* Price & Action Button */}
      <div className="pt-2.5 sm:pt-4 border-t border-slate-800/80 space-y-2 sm:space-y-3">
        
        <div className="flex items-baseline justify-between px-0.5">
          <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">Price</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] sm:text-xs text-slate-500 line-through font-mono">₹{originalPrice}</span>
            <span className="text-lg sm:text-2xl font-black text-amber-400 font-mono tracking-tight">₹{price}</span>
          </div>
        </div>

        <button
          onClick={() => onSelect(pack)}
          disabled={!isStock}
          className={`w-full py-2.5 sm:py-3.5 rounded-xl font-black text-[11px] sm:text-xs uppercase tracking-widest flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-95 shadow-lg ${
            isStock
              ? 'bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-slate-950 hover:brightness-110 shadow-amber-500/25 glow-gold-sm'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5 fill-slate-950" />
          <span>{isStock ? 'BUY NOW' : 'OUT OF STOCK'}</span>
        </button>

      </div>

    </div>
  );
}
