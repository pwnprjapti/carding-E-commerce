import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import UcCard from './components/UcCard';
import CheckoutModal from './components/CheckoutModal';
import PaymentModal from './components/PaymentModal';
import SuccessModal from './components/SuccessModal';
import TrackOrderModal from './components/TrackOrderModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

import { INITIAL_UC_PACKS, INITIAL_ORDERS } from './data/initialData';

export default function App() {
  // Persistence state
  const [packs, setPacks] = useState(() => {
    const saved = localStorage.getItem('bgmi_uc_packs');
    return saved ? JSON.parse(saved) : INITIAL_UC_PACKS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bgmi_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return localStorage.getItem('bgmi_admin_logged_in') === 'true';
  });

  // Modal Flow States
  const [selectedPack, setSelectedPack] = useState(null);
  const [customerDetails, setCustomerDetails] = useState(null);
  
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTrackModal, setShowTrackModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const [createdOrder, setCreatedOrder] = useState(null);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('bgmi_uc_packs', JSON.stringify(packs));
  }, [packs]);

  useEffect(() => {
    localStorage.setItem('bgmi_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('bgmi_admin_logged_in', isAdminLoggedIn ? 'true' : 'false');
  }, [isAdminLoggedIn]);

  // Step 1: User selects a UC Pack -> Open Checkout Form
  const handleSelectPack = (pack) => {
    setSelectedPack(pack);
    setShowCheckoutModal(true);
  };

  // Step 2: User completes details -> Open Dummy Payment Modal
  const handleProceedToPayment = (details) => {
    setCustomerDetails(details);
    setShowCheckoutModal(false);
    setShowPaymentModal(true);
  };

  // Step 3: Payment finished (simulated animation done) -> Create Order & Show Pop-up
  const handlePaymentComplete = () => {
    const totalUC = selectedPack.ucAmount + selectedPack.bonusUC;
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: newOrderId,
      name: customerDetails.name,
      mobile: customerDetails.mobile,
      whatsapp: customerDetails.whatsapp,
      bgmiName: customerDetails.bgmiName,
      bgmiUid: customerDetails.bgmiUid,
      ucPack: `${totalUC} UC (${selectedPack.ucAmount}${selectedPack.bonusUC ? ' + ' + selectedPack.bonusUC + ' Bonus' : ''})`,
      price: selectedPack.price,
      status: 'Pending', // Initial status
      createdAt: new Date().toISOString(),
      paymentId: `PAY_UPI_${Math.floor(100000 + Math.random() * 900000)}`,
      etaHours: 12
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCreatedOrder(newOrder);
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  // Track direct link from popup
  const handleTrackFromSuccess = (orderId) => {
    setShowSuccessModal(false);
    setTrackOrderId(orderId);
    setShowTrackModal(true);
  };

  // Admin Actions
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const handleAddPack = (newPack) => {
    setPacks((prev) => [...prev, newPack]);
  };

  const handleDeletePack = (packId) => {
    setPacks((prev) => prev.filter((p) => p.id !== packId));
  };

  const handleToggleStock = (packId) => {
    setPacks((prev) =>
      prev.map((p) => (p.id === packId ? { ...p, isStock: !p.isStock } : p))
    );
  };

  // Filter packs
  const filteredPacks = packs.filter((p) => {
    if (categoryFilter === 'All') return true;
    return p.category === categoryFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans">
      
      {/* Top Header Navigation */}
      <Navbar
        onOpenTrackModal={() => {
          setTrackOrderId('');
          setShowTrackModal(true);
        }}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        
        {/* Banner */}
        <HeroBanner />

        {/* Store Title & Category Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Available <span className="text-amber-400">UC Packages</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Select your desired pack to top-up directly to your BGMI Account.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {['All', 'Starter', 'Popular', 'Value', 'Pro', 'Ultimate'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold uppercase transition-all whitespace-nowrap ${
                  categoryFilter === cat
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* UC Products Grid (2 columns on mobile, 3 on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {filteredPacks.map((pack) => (
            <UcCard key={pack.id} pack={pack} onSelect={handleSelectPack} />
          ))}
        </div>

      </main>

      {/* Footer with Admin Access Button at Absolute Bottom */}
      <Footer
        onOpenTrackModal={() => {
          setTrackOrderId('');
          setShowTrackModal(true);
        }}
        onOpenAdmin={() => setShowAdminModal(true)}
        isAdminLoggedIn={isAdminLoggedIn}
      />

      {/* MODAL 1: Checkout Form */}
      {showCheckoutModal && selectedPack && (
        <CheckoutModal
          pack={selectedPack}
          onClose={() => setShowCheckoutModal(false)}
          onProceedToPayment={handleProceedToPayment}
        />
      )}

      {/* MODAL 2: Dummy Payment Gateway */}
      {showPaymentModal && selectedPack && customerDetails && (
        <PaymentModal
          pack={selectedPack}
          customerDetails={customerDetails}
          onClose={() => setShowPaymentModal(false)}
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      {/* MODAL 3: Order Success Pop-up */}
      {showSuccessModal && createdOrder && (
        <SuccessModal
          order={createdOrder}
          onClose={() => setShowSuccessModal(false)}
          onTrackOrder={handleTrackFromSuccess}
        />
      )}

      {/* MODAL 4: Track Order Modal */}
      {showTrackModal && (
        <TrackOrderModal
          initialOrderId={trackOrderId}
          orders={orders}
          onClose={() => setShowTrackModal(false)}
        />
      )}

      {/* MODAL 5: Admin Panel */}
      {showAdminModal && (
        <AdminPanel
          orders={orders}
          packs={packs}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onAddPack={handleAddPack}
          onDeletePack={handleDeletePack}
          onToggleStock={handleToggleStock}
          onClose={() => setShowAdminModal(false)}
          isLoggedIn={isAdminLoggedIn}
          onLogin={() => setIsAdminLoggedIn(true)}
          onLogout={() => setIsAdminLoggedIn(false)}
        />
      )}

    </div>
  );
}
