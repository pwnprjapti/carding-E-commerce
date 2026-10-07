import React, { useState } from 'react';
import {
  X, Lock, Key, ShieldCheck, ShoppingBag, DollarSign, Clock, CheckCircle2,
  Copy, Check, MessageSquare, Plus, Trash2, Edit3, Save, RefreshCw, Eye
} from 'lucide-react';

export default function AdminPanel({
  orders,
  packs,
  onUpdateOrderStatus,
  onAddPack,
  onDeletePack,
  onToggleStock,
  onClose,
  isLoggedIn,
  onLogin,
  onLogout
}) {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'packs'

  // Orders Filter State
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Copy state helper
  const [copiedUid, setCopiedUid] = useState(null);

  // New Pack Form Modal State
  const [showAddPackModal, setShowAddPackModal] = useState(false);
  const [newPack, setNewPack] = useState({
    ucAmount: 300,
    bonusUC: 25,
    price: 380,
    originalPrice: 450,
    badge: 'NEW',
    category: 'Popular',
    isStock: true
  });

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput === '1234' || pinInput === 'admin') {
      onLogin();
      setPinError('');
    } else {
      setPinError('Galat PIN! Try "1234" or click Quick Login.');
    }
  };

  const handleCopyUid = (uid, id) => {
    navigator.clipboard.writeText(uid);
    setCopiedUid(id);
    setTimeout(() => setCopiedUid(null), 2000);
  };

  const handleCreatePack = (e) => {
    e.preventDefault();
    if (!newPack.ucAmount || !newPack.price) return;
    onAddPack({
      ...newPack,
      id: `uc-${Date.now()}`,
      ucAmount: Number(newPack.ucAmount),
      bonusUC: Number(newPack.bonusUC || 0),
      price: Number(newPack.price),
      originalPrice: Number(newPack.originalPrice || newPack.price * 1.2)
    });
    setShowAddPackModal(false);
  };

  // Metrics calculation
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.price) || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(term) ||
      o.name.toLowerCase().includes(term) ||
      o.bgmiName.toLowerCase().includes(term) ||
      o.bgmiUid.includes(term) ||
      o.mobile.includes(term);
    return matchesStatus && matchesSearch;
  });

  // Login Screen view if not logged in
  if (!isLoggedIn) {
    return (
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md p-3 sm:p-6 animate-fade-in cursor-pointer flex justify-center items-start sm:items-center min-h-screen"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md my-auto rounded-3xl glass-panel border border-amber-500/40 p-6 sm:p-8 shadow-2xl glow-gold-sm text-center cursor-default max-h-[90vh] flex flex-col overflow-hidden"
        >
          
          <button
            onClick={onClose}
            aria-label="Close Admin Login"
            className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex-1 overflow-y-auto pr-1 space-y-4 pt-2 custom-scrollbar">
            
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto glow-gold-sm">
              <Lock className="w-7 h-7" />
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white">Admin Panel Access</h2>
            <p className="text-xs text-slate-400">
              Enter Admin PIN (Default PIN: <strong className="text-amber-400 font-mono">1234</strong>) to manage orders & UC prices.
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3.5 pt-2">
              <div className="relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. 1234)"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-center tracking-widest text-sm focus:outline-none focus:border-amber-500"
                />
              </div>
              {pinError && <p className="text-xs text-rose-400 font-medium">{pinError}</p>}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md shadow-amber-500/20"
              >
                Unlock Admin Panel
              </button>
            </form>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={() => {
                  onLogin();
                  setPinError('');
                }}
                className="text-xs text-amber-400 hover:underline font-bold flex items-center justify-center gap-1 mx-auto py-1"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Quick Demo Auto-Login</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-6 animate-fade-in cursor-pointer flex justify-center items-start sm:items-center min-h-screen"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-6xl my-auto rounded-3xl glass-panel border border-amber-500/40 p-3.5 sm:p-8 shadow-2xl cursor-default max-h-[92vh] flex flex-col overflow-hidden"
      >
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <div>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                ADMIN DEMO PANEL
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-0.5">BGMI UC Store Management</h2>
            </div>
            
            {/* Close button on mobile top right */}
            <button
              onClick={onClose}
              className="sm:hidden p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {/* Tab Navigation */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-800 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('orders')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase transition-all ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('packs')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase transition-all ${
                  activeTab === 'packs'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                UC Packs ({packs.length})
              </button>
            </div>

            <button
              onClick={onClose}
              className="hidden sm:block p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 flex-shrink-0">
          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold block">TOTAL ORDERS</span>
              <span className="text-xl sm:text-2xl font-black text-white">{totalOrders}</span>
            </div>
            <ShoppingBag className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400/60" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold block">REVENUE</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹{totalRevenue}</span>
            </div>
            <DollarSign className="w-5 h-5 sm:w-7 sm:h-7 text-emerald-400/60" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold block">PENDING</span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">{pendingOrders}</span>
            </div>
            <Clock className="w-5 h-5 sm:w-7 sm:h-7 text-amber-400/60" />
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-[11px] text-slate-400 font-bold block">DELIVERED</span>
              <span className="text-xl sm:text-2xl font-black text-cyan-400">{deliveredOrders}</span>
            </div>
            <CheckCircle2 className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-400/60" />
          </div>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-3 overflow-hidden">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-2.5 justify-between items-center bg-slate-900/50 p-2.5 rounded-2xl border border-slate-800 flex-shrink-0">
              
              {/* Search */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search ID, Name, UID, Mobile..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Status Filters */}
              <div className="flex gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto pb-0.5 sm:pb-0">
                {['All', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors whitespace-nowrap ${
                      statusFilter === st
                        ? 'bg-amber-500/20 border border-amber-500/50 text-amber-400'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

            </div>

            {/* Orders Content Area (Mobile Cards vs Desktop Table) */}
            <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950/60 p-2 sm:p-0 custom-scrollbar">
              {filteredOrders.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No orders found matching the filter criteria.
                </div>
              ) : (
                <>
                  {/* MOBILE CARDS VIEW (Visible on mobile screens < sm) */}
                  <div className="block sm:hidden space-y-3">
                    {filteredOrders.map((ord) => (
                      <div key={ord.id} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                        
                        {/* Header: ID, Date & Status */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                          <div>
                            <span className="font-mono font-bold text-amber-400 text-xs">{ord.id}</span>
                            <span className="text-[10px] text-slate-500 block">
                              {new Date(ord.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          </div>

                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                            className={`px-2.5 py-1 rounded-lg font-black text-[11px] focus:outline-none cursor-pointer border ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                : ord.status === 'Processing'
                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                : ord.status === 'Cancelled'
                                ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                            }`}
                          >
                            <option value="Pending" className="bg-slate-900 text-white">Pending</option>
                            <option value="Processing" className="bg-slate-900 text-white">Processing</option>
                            <option value="Delivered" className="bg-slate-900 text-white">Delivered</option>
                            <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
                          </select>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">Customer:</span>
                            <span className="font-bold text-white truncate block">{ord.name}</span>
                            <span className="text-[10px] text-slate-400">{ord.mobile}</span>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-400 block">WhatsApp Action:</span>
                            <a
                              href={`https://wa.me/91${ord.whatsapp}?text=Hello%20${encodeURIComponent(ord.name)},%20regarding%20your%20BGMI%20UC%20Order%20${ord.id}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-emerald-400 font-bold text-[10px] bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/30 mt-0.5"
                            >
                              <MessageSquare className="w-3 h-3" />
                              Chat WhatsApp
                            </a>
                          </div>
                        </div>

                        {/* BGMI & Pack Info */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                          <div>
                            <span className="font-bold text-white block">{ord.bgmiName}</span>
                            <div className="flex items-center gap-1">
                              <span className="font-mono text-amber-400 font-bold text-[11px]">UID: {ord.bgmiUid}</span>
                              <button
                                onClick={() => handleCopyUid(ord.bgmiUid, ord.id)}
                                className="p-1 text-slate-400 hover:text-white"
                              >
                                {copiedUid === ord.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              </button>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="font-bold text-slate-200 block text-[11px]">{ord.ucPack}</span>
                            <span className="font-black text-emerald-400 font-mono">₹{ord.price}</span>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* DESKTOP TABLE VIEW (Visible on sm+) */}
                  <table className="hidden sm:table w-full text-left border-collapse">
                    <thead className="bg-slate-900/90 text-[11px] font-extrabold uppercase text-slate-400 sticky top-0 border-b border-slate-800">
                      <tr>
                        <th className="p-3.5">Order ID & Date</th>
                        <th className="p-3.5">Customer & Contact</th>
                        <th className="p-3.5">BGMI Account (IGN / UID)</th>
                        <th className="p-3.5">Pack & Price</th>
                        <th className="p-3.5">Update Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-xs">
                      {filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-3.5">
                            <span className="font-mono font-bold text-amber-400 block">{ord.id}</span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(ord.createdAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                            </span>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-white block">{ord.name}</span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-slate-400">Mob: {ord.mobile}</span>
                              <a
                                href={`https://wa.me/91${ord.whatsapp}?text=Hello%20${encodeURIComponent(ord.name)},%20regarding%20your%20BGMI%20UC%20Order%20${ord.id}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/30"
                              >
                                <MessageSquare className="w-3 h-3" />
                                WhatsApp
                              </a>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-white block">{ord.bgmiName}</span>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[11px]">
                                UID: {ord.bgmiUid}
                              </span>
                              <button
                                onClick={() => handleCopyUid(ord.bgmiUid, ord.id)}
                                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                                title="Copy UID to Clipboard"
                              >
                                {copiedUid === ord.id ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <span className="font-bold text-slate-200 block">{ord.ucPack}</span>
                            <span className="font-black text-emerald-400 font-mono">₹{ord.price}</span>
                          </td>

                          <td className="p-3.5">
                            <select
                              value={ord.status}
                              onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs focus:outline-none cursor-pointer border ${
                                ord.status === 'Delivered'
                                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                                  : ord.status === 'Processing'
                                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                  : ord.status === 'Cancelled'
                                  ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                                  : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                              }`}
                            >
                              <option value="Pending" className="bg-slate-900 text-white">Pending</option>
                              <option value="Processing" className="bg-slate-900 text-white">Processing</option>
                              <option value="Delivered" className="bg-slate-900 text-white">Delivered</option>
                              <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: MANAGE UC PACKAGES */}
        {activeTab === 'packs' && (
          <div className="flex-1 flex flex-col min-h-0 space-y-3 overflow-hidden">
            
            <div className="flex justify-between items-center bg-slate-900/50 p-2.5 rounded-2xl border border-slate-800 flex-shrink-0">
              <span className="text-[11px] sm:text-xs font-bold text-slate-300">
                Manage UC Offers ({packs.length} Active Packs)
              </span>
              <button
                onClick={() => setShowAddPackModal(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Pack
              </button>
            </div>

            {/* Packs Grid */}
            <div className="flex-1 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pr-1 custom-scrollbar">
              {packs.map((p) => (
                <div key={p.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-2.5">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-black text-base sm:text-lg text-amber-400">{p.ucAmount + p.bonusUC} UC</span>
                      <span className="text-[10px] sm:text-xs text-slate-400 block">
                        Base: {p.ucAmount} + Bonus: {p.bonusUC}
                      </span>
                    </div>
                    {p.badge && (
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold">
                        {p.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-xs text-slate-400">Price in INR:</span>
                    <span className="text-lg font-black text-white font-mono">₹{p.price}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-800">
                    <button
                      onClick={() => onToggleStock(p.id)}
                      className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold ${
                        p.isStock
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                      }`}
                    >
                      {p.isStock ? 'In Stock' : 'Out of Stock'}
                    </button>

                    <button
                      onClick={() => onDeletePack(p.id)}
                      className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 transition-colors"
                      title="Delete Pack"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Add New Pack Modal */}
        {showAddPackModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md p-5 rounded-3xl glass-panel border border-amber-500/40 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <h3 className="text-base font-black text-white">Add New UC Package</h3>
                <button onClick={() => setShowAddPackModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePack} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Base UC Amount</label>
                  <input
                    type="number"
                    value={newPack.ucAmount}
                    onChange={(e) => setNewPack({ ...newPack, ucAmount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Bonus UC (Optional)</label>
                  <input
                    type="number"
                    value={newPack.bonusUC}
                    onChange={(e) => setNewPack({ ...newPack, bonusUC: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Price (INR ₹)</label>
                  <input
                    type="number"
                    value={newPack.price}
                    onChange={(e) => setNewPack({ ...newPack, price: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 mb-1">Badge Tag (e.g. Popular)</label>
                  <input
                    type="text"
                    value={newPack.badge}
                    onChange={(e) => setNewPack({ ...newPack, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 mt-1 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs uppercase tracking-wider"
                >
                  Save UC Package
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
