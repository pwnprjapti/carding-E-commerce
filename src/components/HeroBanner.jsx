import React from 'react';
import { Flame, CheckCircle2 } from 'lucide-react';
import { VerifiedShieldBadge, DeliveryClockBadge, AirDropCrateIcon } from './icons/GamingIcons';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden py-6 sm:py-12 px-3.5 sm:px-6 lg:px-8 mb-6 sm:mb-8 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-amber-500/10 via-slate-900/80 to-slate-950 border border-amber-500/25 glow-gold-sm shadow-2xl">
      
      {/* Decorative Glow Elements */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Floating Crate Accent */}
      <div className="hidden lg:block absolute right-8 top-10 pointer-events-none opacity-80 animate-bounce duration-[4000ms]">
        <AirDropCrateIcon className="w-24 h-24" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center space-y-3.5 sm:space-y-5">
        
        {/* Top Offer Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-400 text-[10px] sm:text-xs font-black tracking-wide uppercase shadow-inner">
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
          <span>BGMI 3.5 & Royal Pass Special Offer</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-black tracking-tight text-white leading-tight">
          Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-400">BGMI UC Top-Up</span> Store
        </h1>

        {/* Subtitle */}
        <p className="text-slate-300 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed font-medium px-2">
          Apni BGMI ID par sabse saste daam me UC purchase karein. 100% Safe, Direct Character ID Top-Up with Guaranteed <span className="text-amber-400 font-extrabold">12 Hours Delivery Guarantee</span>!
        </p>

        {/* Feature Badges */}
        <div className="pt-2 flex flex-col xs:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs">
          
          <div className="w-full xs:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 font-bold shadow-md">
            <VerifiedShieldBadge className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">100% Anti-Ban & Safe</span>
          </div>

          <div className="w-full xs:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 font-bold shadow-md">
            <DeliveryClockBadge className="w-3.5 h-3.5" />
            <span className="text-[11px] sm:text-xs">Guaranteed Delivery &lt; 12 Hrs</span>
          </div>

          <div className="w-full xs:w-auto flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 font-bold shadow-md">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />
            <span className="text-[11px] sm:text-xs">Direct Character ID Credit</span>
          </div>

        </div>

      </div>
    </div>
  );
}
