import React, { useState, useEffect } from 'react';
import { X, Search, Clock, CheckCircle2, Gamepad2, Package, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';

export default function TrackOrderModal({ initialOrderId, orders, onClose }) {
  const [searchQuery, setSearchQuery] = useState(initialOrderId || '');
  const [activeOrder, setActiveOrder] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (initialOrderId) {
      handleSearch(initialOrderId);
    }
  }, [initialOrderId, orders]);

  // Press ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSearch = (queryToUse) => {
    const query = (queryToUse !== undefined ? queryToUse : searchQuery).trim();
    if (!query) return;

    const found = orders.find(
      (o) =>
        o.id.toLowerCase() === query.toLowerCase() ||
        o.mobile === query ||
        o.whatsapp === query
    );

    setActiveOrder(found || null);
    setSearched(true);
  };

  const getStepStatus = (orderStatus, step) => {
    const statuses = ['Pending', 'Processing', 'Delivered'];
    const currentIndex = statuses.indexOf(orderStatus);
    
    if (orderStatus === 'Cancelled') return 'cancelled';

    if (step === 1) return 'completed'; // Order Placed
    if (step === 2) return 'completed'; // Payment Confirmed
    if (step === 3) {
      if (currentIndex >= 1) return 'completed';
      return 'active';
    }
    if (step === 4) {
      if (currentIndex >= 2) return 'completed';
      return 'pending';
    }
    return 'pending';
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fade-in cursor-pointer flex justify-center items-start sm:items-center min-h-screen"
    >
      {/* Modal Card with max-height and flex column layout */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl my-auto rounded-3xl glass-panel border border-amber-500/40 p-4 sm:p-7 shadow-2xl shadow-amber-500/10 cursor-default max-h-[90vh] flex flex-col overflow-hidden"
      >
        
        {/* Modal Header & Close Button (Always visible at top) */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800/80 mb-4 flex-shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-black uppercase tracking-wider mb-0.5">
              <Search className="w-3.5 h-3.5" />
              <span>Realtime Delivery Status</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">Track Your UC Order</h2>
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              Apna Order ID (e.g. <span className="font-mono text-amber-400 font-bold">ORD-984210</span>) ya Mobile No enter karein.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Track Order Window"
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all duration-200 active:scale-95 flex-shrink-0 ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-5 custom-scrollbar">
          
          {/* Search Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Order ID (ORD-984210) or Mobile"
                className="w-full pl-10 pr-3 py-3 rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm font-mono focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 sm:px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20"
            >
              Track
            </button>
          </form>

          {/* Quick Sample IDs Demo Helper */}
          {orders.length > 0 && (
            <div className="p-2.5 sm:p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-400 text-[11px] font-medium">Demo Quick Select:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {orders.slice(0, 3).map((o) => (
                  <button
                    key={o.id}
                    onClick={() => {
                      setSearchQuery(o.id);
                      handleSearch(o.id);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-[11px] whitespace-nowrap transition-colors"
                  >
                    {o.id}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results */}
          {searched && !activeOrder && (
            <div className="py-8 text-center space-y-2 p-5 rounded-2xl bg-slate-900/40 border border-slate-800">
              <Package className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-sm font-extrabold text-white">Order Not Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Koi order match nahi hua. Kripya dhyan se sahi Order ID enter karein.
              </p>
            </div>
          )}

          {activeOrder && (
            <div className="space-y-5">
              
              {/* Status Header Banner */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-400">STATUS:</span>
                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        activeOrder.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : activeOrder.status === 'Processing'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                      }`}
                    >
                      {activeOrder.status}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Placed: {new Date(activeOrder.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                  </span>
                </div>

                <div className="sm:text-right pt-2 sm:pt-0 border-t sm:border-0 border-slate-800">
                  <span className="text-[11px] text-slate-400 block">Package</span>
                  <span className="text-xs sm:text-sm font-black text-white">{activeOrder.ucPack}</span>
                </div>
              </div>

              {/* Guaranteed 12 Hours Delivery Alert */}
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-2.5 text-xs text-amber-300">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
                <span>
                  <strong className="text-white">Delivery Guarantee:</strong> Delivery completed within <strong className="text-amber-400">12 Hours</strong>.
                </span>
              </div>

              {/* Timeline Progress */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
                
                <h4 className="text-[11px] font-black text-slate-300 uppercase tracking-wider">
                  Delivery Timeline Steps
                </h4>

                <div className="relative space-y-5 before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
                  
                  {/* Step 1 */}
                  <div className="relative flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs z-10 shadow-lg shadow-emerald-500/30 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-white">Order Received & Payment Verified</h5>
                      <p className="text-[11px] text-slate-400">Payment receipt confirmed (₹{activeOrder.price})</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs z-10 flex-shrink-0 ${
                        getStepStatus(activeOrder.status, 3) === 'completed'
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                          : 'bg-amber-500 text-slate-950 animate-pulse glow-gold-sm'
                      }`}
                    >
                      {getStepStatus(activeOrder.status, 3) === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        '3'
                      )}
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-white">UC Transfer Processing</h5>
                      <p className="text-[11px] text-slate-400">
                        Sending to BGMI UID: <span className="font-mono text-amber-400 font-bold">{activeOrder.bgmiUid}</span>
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs z-10 flex-shrink-0 ${
                        activeOrder.status === 'Delivered'
                          ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/30'
                          : 'bg-slate-800 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {activeOrder.status === 'Delivered' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        '4'
                      )}
                    </div>
                    <div>
                      <h5 className="text-xs sm:text-sm font-extrabold text-white">Delivered to In-Game Mail</h5>
                      <p className="text-[11px] text-slate-400">
                        {activeOrder.status === 'Delivered'
                          ? 'UC successfully credited to your BGMI account!'
                          : 'Estimated completion: within 12 hours.'}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              {/* Customer Details Box */}
              <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 text-[11px] block">BGMI IGN:</span>
                  <span className="font-bold text-white truncate block">{activeOrder.bgmiName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Character ID:</span>
                  <span className="font-mono font-bold text-amber-400">{activeOrder.bgmiUid}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">WhatsApp:</span>
                  <span className="font-medium text-slate-300">+91 {activeOrder.whatsapp}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[11px] block">Total Price:</span>
                  <span className="font-bold text-emerald-400">₹{activeOrder.price}</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer Close Button (Always visible at bottom) */}
        <div className="pt-3 border-t border-slate-800 flex justify-end flex-shrink-0 mt-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-md"
          >
            <X className="w-4 h-4 text-slate-400" />
            <span>Close Window</span>
          </button>
        </div>

      </div>
    </div>
  );
}
