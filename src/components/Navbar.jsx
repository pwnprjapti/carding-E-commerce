import React, { useState } from 'react';
import { Search, Menu, X, MessageCircle } from 'lucide-react';
import { BgmiCrestLogo, VerifiedShieldBadge } from './icons/GamingIcons';

export default function Navbar({ onOpenTrackModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-full glass-panel border-b border-amber-500/30 shadow-xl">
      <div className="w-full max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Logo Section */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group flex-shrink-0"
        >
          <div className="relative">
            <BgmiCrestLogo className="w-8 h-8 sm:w-10 sm:h-10 drop-shadow-md transition-transform duration-300 group-hover:scale-105" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 border-2 border-slate-950 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-black text-sm sm:text-lg md:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-orange-500 uppercase">
                BGMI <span className="text-white">UC STORE</span>
              </span>
              <VerifiedShieldBadge className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-amber-400/90 uppercase block -mt-0.5 sm:-mt-1">
              Official Instant Top-Up Partner
            </span>
          </div>
        </div>

        {/* Desktop View Track Button */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenTrackModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-slate-200 text-xs font-extrabold transition-all duration-200 hover:border-amber-500/50 hover:text-amber-400 active:scale-95 shadow-sm"
          >
            <Search className="w-4 h-4 text-amber-400 stroke-[2.5]" />
            <span>Track Order</span>
          </button>
        </div>

        {/* Mobile View Buttons & Drawer Toggle */}
        <div className="flex md:hidden items-center gap-1.5">
          
          <button
            onClick={onOpenTrackModal}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-slate-200 text-[11px] font-extrabold active:scale-95"
            title="Track Order"
          >
            <Search className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
            <span>Track Order</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-400 hover:text-white active:scale-95 ml-0.5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-rose-400" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Slide-Down Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden w-full border-t border-amber-500/20 bg-slate-950/98 backdrop-blur-2xl px-4 py-3 space-y-2 animate-slide-down shadow-2xl">
          
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTrackModal();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-left text-xs font-extrabold text-slate-200 active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-amber-400 stroke-[2.5]" />
              <span>Track Your Order Status</span>
            </div>
            <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Live ETA
            </span>
          </button>

          <a
            href="https://wa.me/919876543210?text=Hello%20BGMI%20UC%20Store%20Support"
            target="_blank"
            rel="noreferrer"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-left text-xs font-extrabold text-emerald-400 active:scale-98"
          >
            <div className="flex items-center gap-2.5">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp 24x7 Instant Support</span>
            </div>
            <span className="text-[10px] font-bold uppercase bg-emerald-500/20 px-2 py-0.5 rounded">
              Chat
            </span>
          </a>

        </div>
      )}
    </header>
  );
}
