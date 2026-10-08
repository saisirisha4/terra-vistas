import React, { useState } from 'react';
import {
  Briefcase,
  PlusCircle,
  Tag,
  Hotel,
  Utensils,
  Bus,
  Compass,
  Sparkles,
  TrendingUp,
  Trash2,
  CheckCircle2,
  Users,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { VendorOffer, TravelGroup } from '../types';
import { formatINR } from '../utils/pricing';
import { OfferCard } from '../components/OfferCard';

interface VendorDashboardViewProps {
  vendorOffers: VendorOffer[];
  groups: TravelGroup[];
  onAddOffer: (offer: VendorOffer) => void;
  onDeleteOffer: (offerId: string) => void;
  onToggleOfferStatus: (offerId: string) => void;
}

export const VendorDashboardView: React.FC<VendorDashboardViewProps> = ({
  vendorOffers,
  groups,
  onAddOffer,
  onDeleteOffer,
  onToggleOfferStatus,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);

  // New offer form state
  const [vendorName, setVendorName] = useState('Haritha Valley Resort');
  const [category, setCategory] = useState<'Hotel' | 'Restaurant' | 'Transport' | 'Attraction' | 'Activity'>('Hotel');
  const [destination, setDestination] = useState('Araku Valley');
  const [title, setTitle] = useState('Deluxe Valley Cottages Group Package');
  const [normalPrice, setNormalPrice] = useState<number>(1500);
  const [groupPrice, setGroupPrice] = useState<number>(1050);
  const [minGroupSize, setMinGroupSize] = useState<number>(10);
  const [description, setDescription] = useState(
    'Special bulk cottage stay with campfire, morning breakfast, and tea plantation tour included.'
  );

  const potentialSaving = Math.max(0, normalPrice - groupPrice);

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();

    const newOffer: VendorOffer = {
      id: `vo-custom-${Date.now()}`,
      vendorId: `v-${Date.now()}`,
      vendorName,
      category,
      destination,
      title,
      normalPrice,
      groupPrice,
      minGroupSize,
      potentialSaving,
      description,
      active: true,
      validity: 'Valid till Nov 2026',
      badge: `${Math.round((potentialSaving / normalPrice) * 100)}% Group Deal`,
    };

    onAddOffer(newOffer);
    setShowAddModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Vendor Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">
            <Briefcase className="w-3.5 h-3.5" />
            Vendor Partner Dashboard
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
            Local Vendor Portal: Group Offers & Bulk Demand
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Create group discounts for hotels, restaurants, transports, and attractions. Connect with thousands of verified community travelers visiting your destination.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-lg flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Publish Group Offer</span>
        </button>
      </div>

      {/* VENDOR METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Active Group Offers
          </span>
          <div className="text-3xl font-black text-slate-900">{vendorOffers.length}</div>
          <span className="text-[11px] text-emerald-600 font-medium">All live on TERRA VISTAS platform</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Total Travelers Reached
          </span>
          <div className="text-3xl font-black text-indigo-600">184+</div>
          <span className="text-[11px] text-slate-500">Across 8 departures</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Avg. Group Discount
          </span>
          <div className="text-3xl font-black text-emerald-600">28%</div>
          <span className="text-[11px] text-emerald-700 font-medium">Bulk volume unlocked</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Partner Tier
          </span>
          <div className="text-2xl font-black text-amber-600">Gold Verified</div>
          <span className="text-[11px] text-amber-700 font-semibold">Pre-approved billing</span>
        </div>
      </div>

      {/* ACTIVE OFFERS SECTION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display">
              My Published Group Offers ({vendorOffers.length})
            </h2>
            <p className="text-xs text-slate-500">
              Manage your live packages for Hotel, Restaurant, Transport, Attraction, and Activity.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add New Offer</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              isVendorView={true}
              onToggleStatus={onToggleOfferStatus}
              onDelete={onDeleteOffer}
            />
          ))}
        </div>
      </div>

      {/* LIVE GROUP OPPORTUNITIES TO BID ON */}
      <div className="space-y-4 pt-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display">
            Live Group Opportunities Seeking Vendor Partners
          </h2>
          <p className="text-xs text-slate-500">
            Groups currently forming with high traveler count looking for certified stay or transit deals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.slice(0, 4).map((g) => (
            <div
              key={g.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {g.destinationName} • Departing {g.travelDate}
                  </span>
                  <h4 className="font-bold text-base text-slate-900 mt-0.5">
                    {g.currentMembers} Travelers Looking for {g.accommodationPreference}
                  </h4>
                </div>
                <span className="bg-emerald-50 text-emerald-700 font-extrabold text-xs px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                  {g.currentMembers} / {g.maxMembers} Pax
                </span>
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div>Preference: <strong>{g.transportPreference}</strong></div>
                <div>Target Budget: <strong>{g.budget}</strong></div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Host: {g.creatorName}
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Quote proposal submitted for ${g.destinationName} group!`)}
                  className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  Send Group Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ADD OFFER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-lg text-slate-900 font-display">
                  Create Vendor Group Offer
                </h3>
                <p className="text-xs text-slate-500">
                  Publish a special package for TERRA VISTAS groups
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Vendor / Business Name</label>
                <input
                  type="text"
                  required
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Service Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Hotel">Hotel</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Transport">Transport</option>
                    <option value="Attraction">Attraction</option>
                    <option value="Activity">Activity</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Destination Hub</label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  >
                    <option value="Araku Valley">Araku Valley</option>
                    <option value="Visakhapatnam">Visakhapatnam</option>
                    <option value="Goa">Goa</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Tirupati">Tirupati</option>
                    <option value="Ooty">Ooty</option>
                    <option value="Munnar">Munnar</option>
                    <option value="Bengaluru">Bengaluru</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Offer Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Normal Solo Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={normalPrice}
                    onChange={(e) => setNormalPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Group Offer Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={groupPrice}
                    onChange={(e) => setGroupPrice(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Min. Group Size</label>
                  <input
                    type="number"
                    required
                    value={minGroupSize}
                    onChange={(e) => setMinGroupSize(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
              </div>

              {/* Potential Savings Preview */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <span className="font-bold text-emerald-800">Calculated Savings per traveler:</span>
                <span className="text-base font-black text-emerald-700">{formatINR(potentialSaving)}</span>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Package Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-medium"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  Publish Group Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
