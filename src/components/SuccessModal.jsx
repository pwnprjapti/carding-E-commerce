import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Copy, Check, ExternalLink, Trophy, X } from 'lucide-react';
import { DeliveryClockBadge, BgmiCrestLogo } from './icons/GamingIcons';

export default function SuccessModal({ order, onClose, onTrackOrder }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#ffffff']
      });
    } catch (e) {
      console.log('Confetti loaded');
    }
  }, []);

  if (!order) return null;

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fade-in cursor-pointer flex justify-center items-start sm:items-center min-h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg my-auto rounded-3xl glass-panel border border-emerald-500/40 p-5 sm:p-8 shadow-2xl glow-gold-sm cursor-default max-h-[90vh] flex flex-col overflow-hidden"
      >
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          aria-label="Close Pop-up"
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
          
          {/* Celebration Crest Icon */}
          <div className="flex justify-center pt-2">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-600 p-1 flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-bounce">
                <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400 fill-emerald-400/20 stroke-[2.5]" />
                </div>
              </div>
              <Trophy className="absolute -top-1 -right-1 w-5 h-5 text-amber-400" />
            </div>
          </div>

          {/* Title & Delivery Alert */}
          <div className="text-center space-y-2">
            <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-[11px] font-black uppercase tracking-wider">
              Payment Confirmed & Order Received
            </span>

            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              Order Successful!
            </h2>

            {/* EXACT REQUESTED POPUP MESSAGE */}
            <div className="mt-2 p-3.5 sm:p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-semibold leading-relaxed shadow-lg">
              <p className="flex items-center justify-center gap-2 text-sm sm:text-base font-extrabold text-amber-300">
                <DeliveryClockBadge className="w-5 h-5 flex-shrink-0" />
                Aapki UC aapke account me 12 ghnte me deliver ho jayengi.
              </p>
            </div>
          </div>

          {/* Order ID Box */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Your Order ID</span>
              <span className="text-lg sm:text-xl font-black text-white font-mono tracking-wider">{order.id}</span>
            </div>
            <button
              onClick={copyOrderId}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black transition-all active:scale-95"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>

          {/* Details Breakdown */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-slate-900/50 border border-slate-800 text-xs">
            
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 text-[11px]">BGMI IGN:</span>
              <span className="font-extrabold text-white flex items-center gap-1 truncate">
                <BgmiCrestLogo className="w-3.5 h-3.5" />
                {order.bgmiName}
              </span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 text-[11px]">Character ID (UID):</span>
              <span className="font-mono font-bold text-amber-400">{order.bgmiUid}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 text-[11px]">Selected Package:</span>
              <span className="font-extrabold text-white">{order.ucPack}</span>
            </div>

            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400 text-[11px]">Amount Paid:</span>
              <span className="font-black text-emerald-400 font-mono text-sm">₹{order.price}</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <button
              onClick={() => onTrackOrder(order.id)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20"
            >
              <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              <span>Track Order Status</span>
            </button>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Close Window</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
