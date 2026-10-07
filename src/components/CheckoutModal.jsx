import React, { useState, useEffect } from 'react';
import { X, User, Phone, MessageSquare, Gamepad2, ShieldAlert, ArrowRight, Check } from 'lucide-react';

export default function CheckoutModal({ pack, onClose, onProceedToPayment }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    bgmiName: '',
    bgmiUid: '',
    sameAsMobile: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!pack) return null;

  const totalUC = pack.ucAmount + pack.bonusUC;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'sameAsMobile') {
      setFormData((prev) => ({
        ...prev,
        sameAsMobile: checked,
        whatsapp: checked ? prev.mobile : prev.whatsapp,
      }));
      return;
    }

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'mobile' && prev.sameAsMobile) {
        updated.whatsapp = value;
      }
      return updated;
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Naam daalna zaroori hai (Name is required)';
    }

    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'Sahi 10-digit mobile number dalein';
    }

    if (!formData.whatsapp.trim() || !/^\d{10}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = 'Sahi 10-digit WhatsApp number dalein';
    }

    if (!formData.bgmiName.trim()) {
      newErrors.bgmiName = 'BGMI In-Game Name zaroori hai';
    }

    if (!formData.bgmiUid.trim() || !/^\d{5,12}$/.test(formData.bgmiUid.trim())) {
      newErrors.bgmiUid = 'Sahi BGMI Character ID (UID) dalein';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onProceedToPayment(formData);
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg my-8 rounded-3xl glass-panel border border-amber-500/30 p-6 sm:p-8 shadow-2xl shadow-amber-500/10 cursor-default"
      >
        
        {/* Close Button Top Right */}
        <button
          onClick={onClose}
          aria-label="Close Checkout Window"
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all duration-200 active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 border-b border-slate-800 pb-4 pr-10">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Customer Details Verification</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Enter BGMI Details</h2>
          <p className="text-xs text-slate-400 mt-1">
            Sahi BGMI UID aur WhatsApp number dalein taaki UC sahi account me transfer ho sake.
          </p>
        </div>

        {/* Order Brief Box */}
        <div className="mb-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-amber-300 block">Selected UC Pack</span>
            <span className="text-lg font-black text-white">{totalUC} UC Package</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-medium text-amber-300 block">Total Payable</span>
            <span className="text-xl font-black text-amber-400">₹{pack.price}</span>
          </div>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* User Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Full Name (Aapka Naam) <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
          </div>

          {/* Mobile & WhatsApp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mobile Number <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  name="mobile"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              {errors.mobile && <p className="text-xs text-rose-400 mt-1">{errors.mobile}</p>}
            </div>

            {/* WhatsApp Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                WhatsApp Number <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  name="whatsapp"
                  maxLength={10}
                  disabled={formData.sameAsMobile}
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="WhatsApp number"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-white text-sm focus:outline-none transition-colors ${
                    formData.sameAsMobile
                      ? 'bg-slate-800/50 border-slate-800 text-slate-400'
                      : 'bg-slate-900/90 border-slate-700/80 focus:border-amber-500'
                  }`}
                />
              </div>
              {errors.whatsapp && <p className="text-xs text-rose-400 mt-1">{errors.whatsapp}</p>}
            </div>

          </div>

          {/* Same as Mobile Checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="sameAsMobile"
              name="sameAsMobile"
              checked={formData.sameAsMobile}
              onChange={handleChange}
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-500/20"
            />
            <label htmlFor="sameAsMobile" className="text-xs text-slate-300 cursor-pointer">
              WhatsApp number same as mobile number
            </label>
          </div>

          {/* BGMI Game Name & Character ID */}
          <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* BGMI In-Game Name */}
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                BGMI In-Game Name (IGN) <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <Gamepad2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400" />
                <input
                  type="text"
                  name="bgmiName"
                  value={formData.bgmiName}
                  onChange={handleChange}
                  placeholder="e.g. DYNAMO_OP"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-amber-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              {errors.bgmiName && <p className="text-xs text-rose-400 mt-1">{errors.bgmiName}</p>}
            </div>

            {/* BGMI Character ID */}
            <div>
              <label className="block text-xs font-semibold text-amber-300 mb-1.5">
                BGMI Character ID (UID) <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-amber-400 font-bold text-xs">ID</span>
                <input
                  type="text"
                  name="bgmiUid"
                  maxLength={12}
                  value={formData.bgmiUid}
                  onChange={handleChange}
                  placeholder="e.g. 5123456789"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-amber-500/40 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 transition-colors font-mono tracking-wider"
                />
              </div>
              {errors.bgmiUid && <p className="text-xs text-rose-400 mt-1">{errors.bgmiUid}</p>}
            </div>

          </div>

          {/* Helper Note */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              Kripya karke apna Character ID (UID) profile se copy karke sahi dhyan se dalein. Galat ID par UC delivery zimmedari aapki hogi.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-1/3 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-extrabold text-xs uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-2/3 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all glow-gold"
            >
              <span>Proceed To Pay (₹{pack.price})</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
