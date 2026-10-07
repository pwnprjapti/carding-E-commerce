import React from 'react';
import { ShieldCheck, Clock, MessageCircle, HelpCircle, Lock } from 'lucide-react';

export default function Footer({ onOpenTrackModal, onOpenAdmin, isAdminLoggedIn }) {
  return (
    <footer className="mt-16 border-t border-amber-500/20 bg-slate-950/90 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-white text-base">12 Hours Delivery</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sabhi UC orders payment verify hone ke baad 12 ghnte ke andar BGMI account me in-game mail ke zariye deliver ho jate hain.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-white text-base">100% Safe Top-Up</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Official UID top-up method. Aapke game account ka login detail ya password maanga nahi jata. Only Character ID needed.
            </p>
          </div>

          <div className="p-5 rounded-2xl glass-card border border-amber-500/20 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-cyan-400 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h4 className="font-extrabold text-white text-base">Order Tracking & Support</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Order ID se kisi bhi waqt apna status track karein. Instant WhatsApp customer support available 24x7.
            </p>
          </div>

        </div>

        {/* How to Buy Guide */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-sm uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>How to buy UC in 4 easy steps</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="font-black text-amber-400 text-sm">01. Select UC Pack</span>
              <p className="text-slate-400">Apni pasand ka UC package select karke Buy Now par click karein.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="font-black text-amber-400 text-sm">02. Enter BGMI UID</span>
              <p className="text-slate-400">Apna In-Game Name, Mobile & BGMI Character ID (UID) fill karein.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="font-black text-amber-400 text-sm">03. Make Payment</span>
              <p className="text-slate-400">UPI / QR Code dwara safe payment complete karein.</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
              <span className="font-black text-amber-400 text-sm">04. Receive UC</span>
              <p className="text-slate-400">12 ghnte me aapke account me UC credit ho jayegi!</p>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer & Admin Button at absolute bottom */}
        <div className="pt-6 border-t border-slate-900 text-center space-y-3 text-xs text-slate-500">
          <p className="font-medium">
            © 2026 BGMI UC Store Demo. All rights reserved. BGMI is a registered trademark of KRAFTON, Inc.
          </p>
          <p className="text-[11px] text-slate-600 max-w-xl mx-auto">
            This is a demonstration store web system created for testing & evaluation purposes. Payments are simulated in test environment.
          </p>

          {/* Admin Panel Access Button at Absolute Bottom */}
          <div className="pt-2">
            <button
              onClick={onOpenAdmin}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-extrabold transition-all duration-200 active:scale-95 shadow-md ${
                isAdminLoggedIn
                  ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400 hover:bg-amber-500/30'
                  : 'bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-amber-400'
              }`}
              title="Admin Access Panel"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400 stroke-[2.5]" />
              <span>{isAdminLoggedIn ? 'Admin Panel Active 🔓' : 'Admin Access 🔒'}</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
