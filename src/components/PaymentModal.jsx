import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2, Copy, Check } from 'lucide-react';
import { PhonePeLogo, GooglePayLogo, PaytmLogo, UpiBrandLogo, VerifiedShieldBadge } from './icons/GamingIcons';

export default function PaymentModal({ pack, customerDetails, onClose, onPaymentComplete }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const totalUC = pack.ucAmount + pack.bonusUC;
  const upiId = 'bgmiucstore@upi';

  const steps = [
    'Connecting to Payment Gateway...',
    'Verifying UPI Transaction Status...',
    'Confirming Payment with Bank...',
    'Payment Successful! Generating Receipt...'
  ];

  const handleStartPayment = () => {
    setIsProcessing(true);
    setStepIndex(0);
  };

  useEffect(() => {
    let timer;
    if (isProcessing && stepIndex < steps.length - 1) {
      timer = setTimeout(() => {
        setStepIndex((prev) => prev + 1);
      }, 1000);
    } else if (isProcessing && stepIndex === steps.length - 1) {
      timer = setTimeout(() => {
        setIsProcessing(false);
        onPaymentComplete();
      }, 800);
    }
    return () => clearTimeout(timer);
  }, [isProcessing, stepIndex]);

  const copyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      onClick={!isProcessing ? onClose : undefined}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fade-in cursor-pointer flex justify-center items-start sm:items-center min-h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md my-auto rounded-3xl glass-panel border border-amber-500/40 p-5 sm:p-7 shadow-2xl glow-gold-sm cursor-default max-h-[90vh] flex flex-col overflow-hidden"
      >
        
        {/* Header */}
        {!isProcessing && (
          <button
            onClick={onClose}
            aria-label="Close Payment Window"
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
          
          <div className="text-center pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[11px] font-black uppercase tracking-wider mb-2">
              <VerifiedShieldBadge className="w-3.5 h-3.5" />
              <span>Encrypted UPI Gateway (Demo)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Instant UPI Payment</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Order for <span className="text-amber-400 font-bold">{customerDetails.bgmiName}</span> ({customerDetails.bgmiUid})
            </p>
          </div>

          {/* Amount Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-700/80 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Total Amount Payable</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono">₹{pack.price}</span>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-slate-400 block font-medium">Selected Item</span>
              <span className="text-xs sm:text-sm font-black text-white">{totalUC} UC Pack</span>
            </div>
          </div>

          {/* Processing Animation View */}
          {isProcessing ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-5">
              
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-amber-500/20 border-t-amber-400 animate-spin" />
                <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center glow-gold-sm">
                  <Loader2 className="w-7 h-7 text-amber-400 animate-spin" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-base text-white">Processing Payment</h3>
                <p className="text-xs font-bold text-amber-400 animate-pulse">
                  {steps[stepIndex]}
                </p>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-700 ease-out"
                  style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                />
              </div>

              <p className="text-[10px] text-slate-400">
                Please do not refresh this window while we verify your transaction.
              </p>

            </div>
          ) : (
            /* Payment Interface View */
            <div className="space-y-4">
              
              {/* Real UPI Supported App Logos Bar */}
              <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Supported:</span>
                <div className="flex items-center gap-2">
                  <PhonePeLogo className="w-5 h-5" />
                  <GooglePayLogo className="w-5 h-5" />
                  <PaytmLogo className="w-5 h-5" />
                  <UpiBrandLogo className="w-9 h-4" />
                </div>
              </div>

              {/* Mock QR Code Container */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200">
                <div className="relative p-2 bg-white rounded-xl shadow-md border border-slate-100">
                  <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0H30V30H0V0ZM10 10V20H20V10H10Z" fill="#0f172a" />
                    <path d="M70 0H100V30H70V0ZM80 10V20H90V10H80Z" fill="#0f172a" />
                    <path d="M0 70H30V100H0V70ZM10 80V90H20V80H10Z" fill="#0f172a" />
                    <path d="M40 0H60V10H40V0ZM30 20H40V40H30V20ZM50 20H70V30H50V20ZM0 40H20V50H0V40ZM40 50H60V60H40V50ZM70 40H100V50H70V40ZM80 60H100V70H80V60ZM40 70H50V100H40V70ZM60 80H80V90H60V80ZM90 80H100V100H90V80Z" fill="#0f172a" />
                    <circle cx="50" cy="50" r="8" fill="#f59e0b" />
                  </svg>
                </div>
                <span className="text-[10px] font-black text-slate-800 mt-1.5 uppercase tracking-wide">
                  Scan with any UPI App to Pay
                </span>
              </div>

              {/* Copy UPI ID */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="text-slate-400 text-[11px]">UPI ID:</span>
                  <span className="font-mono text-white font-bold text-xs truncate">{upiId}</span>
                </div>
                <button
                  onClick={copyUpi}
                  className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-extrabold text-[11px] px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-colors flex-shrink-0"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Action Button */}
              <div className="pt-1">
                <button
                  onClick={handleStartPayment}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 className="w-4 h-4 fill-slate-950 text-emerald-400" />
                  <span>Simulate Payment Success</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
