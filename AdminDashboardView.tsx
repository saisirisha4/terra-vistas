import React, { useState } from 'react';
import {
  Shield,
  Users,
  Compass,
  MapPin,
  Briefcase,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  BarChart3,
  Search,
  Eye,
  Trash2
} from 'lucide-react';
import { TravelGroup, Destination, VendorOffer, UserProfile } from '../types';
import { formatINR } from '../utils/pricing';

interface AdminDashboardViewProps {
  groups: TravelGroup[];
  destinations: Destination[];
  vendorOffers: VendorOffer[];
  userProfile: UserProfile;
  onDeleteGroup: (groupId: string) => void;
  onViewGroupDetails: (group: TravelGroup) => void;
  onToggleOfferStatus: (offerId: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  groups,
  destinations,
  vendorOffers,
  userProfile,
  onDeleteGroup,
  onViewGroupDetails,
  onToggleOfferStatus,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'groups' | 'vendors' | 'offers' | 'destinations' | 'users'>('overview');
  const [adminSearch, setAdminSearch] = useState('');

  // Platform metrics
  const totalTravelers = groups.reduce((acc, g) => acc + g.currentMembers, 0) + 420;
  const activeGroupsCount = groups.length;
  const destinationsCount = destinations.length;
  const partnerVendorsCount = 14;
  const estimatedTotalPlatformSavings = groups.reduce((acc, g) => acc + g.potentialSavings * g.currentMembers, 0) + 1420000;
  const activeTripsCount = groups.filter((g) => g.currentMembers >= 10).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-purple-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30">
            <Shield className="w-3.5 h-3.5" />
            TERRA VISTAS Master Administration Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-2">
            Operations & Ecosystem Analytics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Live telemetry of active travel groups, partner vendor offerings, destination capacity, and gross community travel savings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-3 py-1.5 rounded-xl border border-emerald-500/30">
            Systems Operational • 100% Uptime
          </span>
        </div>
      </div>

      {/* PRIMARY METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Total Travelers
          </span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{totalTravelers}</span>
          <span className="text-[10px] text-emerald-600 font-medium">+24 today</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Active Groups
          </span>
          <span className="text-2xl font-black text-indigo-600 block mt-1">{activeGroupsCount}</span>
          <span className="text-[10px] text-slate-400">All open</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Destinations
          </span>
          <span className="text-2xl font-black text-slate-900 block mt-1">{destinationsCount}</span>
          <span className="text-[10px] text-slate-400">Active hubs</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
            Partner Vendors
          </span>
          <span className="text-2xl font-black text-purple-600 block mt-1">{partnerVendorsCount}</span>
          <span className="text-[10px] text-slate-400">Verified</span>
        </div>

        <div className="col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
            Estimated Total Savings
          </span>
          <span className="text-2xl font-black text-emerald-700 block mt-1">
            {formatINR(estimatedTotalPlatformSavings)}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold">
            Community group savings unlocked
          </span>
        </div>
      </div>

      {/* ADMIN TABS NAVIGATION */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'overview', label: 'Ecosystem Analytics' },
          { id: 'groups', label: `Travel Groups (${groups.length})` },
          { id: 'vendors', label: 'Vendors' },
          { id: 'offers', label: `Vendor Offers (${vendorOffers.length})` },
          { id: 'destinations', label: `Destinations (${destinations.length})` },
          { id: 'users', label: 'Users & Roles' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual Bar Chart breakdown of group savings */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Top Savings Generating Destinations
                </h3>
                <span className="text-xs text-slate-400">INR Value</span>
              </div>

              <div className="space-y-3 pt-2">
                {[
                  { name: 'Araku Valley', count: '50 Travelers', savings: '₹84,000 Saved', pct: 85 },
                  { name: 'Goa', count: '24 Travelers', savings: '₹46,800 Saved', pct: 65 },
                  { name: 'Visakhapatnam', count: '14 Travelers', savings: '₹17,080 Saved', pct: 40 },
                  { name: 'Munnar', count: '16 Travelers', savings: '₹22,400 Saved', pct: 50 },
                  { name: 'Ooty', count: '11 Travelers', savings: '₹10,450 Saved', pct: 30 },
                ].map((item) => (
                  <div key={item.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="font-bold text-slate-800">{item.name}</span>
                      <span className="text-emerald-600 font-extrabold">{item.savings}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-600 h-full rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform Health and Verification */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                System Checks & Integrity
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="font-medium text-slate-700">Diminishing Discount Algorithm</span>
                  <span className="font-bold text-emerald-600">Active (Capped 48%)</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="font-medium text-slate-700">Vendor Verification Guard</span>
                  <span className="font-bold text-emerald-600">All 14 Vendors Audited</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="font-medium text-slate-700">Train Price Disclaimer Guard</span>
                  <span className="font-bold text-emerald-600">Enforced Everywhere</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="font-medium text-slate-700">Prototype Persistence</span>
                  <span className="font-bold text-indigo-600">Active (Instant sync)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: GROUPS MANAGEMENT */}
      {activeTab === 'groups' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Active Community Groups</h3>
            <span className="text-xs text-slate-500">{groups.length} departures</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Host</th>
                  <th className="py-3 px-3">Members</th>
                  <th className="py-3 px-3">Est. Group Cost</th>
                  <th className="py-3 px-3">Savings/Pax</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {groups.map((g) => (
                  <tr key={g.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{g.destinationName}</td>
                    <td className="py-3 px-3 text-slate-600">{g.travelDate}</td>
                    <td className="py-3 px-3 text-slate-600">{g.creatorName}</td>
                    <td className="py-3 px-3">
                      <span className="font-bold text-slate-900">{g.currentMembers}</span> / {g.maxMembers}
                    </td>
                    <td className="py-3 px-3 font-extrabold text-slate-900">
                      {formatINR(g.estimatedGroupCost)}
                    </td>
                    <td className="py-3 px-3 font-bold text-emerald-600">
                      {formatINR(g.potentialSavings)}
                    </td>
                    <td className="py-3 px-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => onViewGroupDetails(g)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                      >
                        Inspect
                      </button>
                      <button
                        type="button"
                        onClick={() => onDeleteGroup(g.id)}
                        className="px-2.5 py-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: OFFERS MANAGEMENT */}
      {activeTab === 'offers' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-lg">Partner Group Offers</h3>
            <span className="text-xs text-slate-500">{vendorOffers.length} offers</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-3">Vendor</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Destination</th>
                  <th className="py-3 px-3">Normal</th>
                  <th className="py-3 px-3">Group Price</th>
                  <th className="py-3 px-3">Saving</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vendorOffers.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-slate-900">{o.vendorName}</td>
                    <td className="py-3 px-3 text-slate-600">{o.category}</td>
                    <td className="py-3 px-3 text-slate-600">{o.destination}</td>
                    <td className="py-3 px-3 line-through text-slate-400">{formatINR(o.normalPrice)}</td>
                    <td className="py-3 px-3 font-extrabold text-emerald-700">{formatINR(o.groupPrice)}</td>
                    <td className="py-3 px-3 font-bold text-emerald-600">{formatINR(o.potentialSaving)}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        o.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {o.active ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        type="button"
                        onClick={() => onToggleOfferStatus(o.id)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                      >
                        {o.active ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: VENDORS */}
      {activeTab === 'vendors' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Registered Vendor Partners (14 Total)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'Haritha Valley Resort', category: 'Hotel', loc: 'Araku Valley', status: 'Verified', rating: 4.8 },
              { name: 'Araku Tribal Cuisine & Coffee', category: 'Restaurant', loc: 'Araku Valley', status: 'Verified', rating: 4.7 },
              { name: 'Eastern Ghats Travels & Safaris', category: 'Transport', loc: 'Araku & Vizag', status: 'Verified', rating: 4.9 },
              { name: 'Borra Speleo Tourism Board', category: 'Attraction', loc: 'Araku Valley', status: 'Verified', rating: 4.8 },
              { name: 'Bay View Beachside Hotel', category: 'Hotel', loc: 'Visakhapatnam', status: 'Verified', rating: 4.6 },
              { name: 'Palm Grove Beach Resort', category: 'Hotel', loc: 'Goa', status: 'Verified', rating: 4.7 },
            ].map((v) => (
              <div key={v.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-400">{v.category}</span>
                  <span className="text-emerald-700 text-xs font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    {v.status}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{v.name}</h4>
                <p className="text-xs text-slate-500">{v.loc} • Rating {v.rating} ★</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: DESTINATIONS */}
      {activeTab === 'destinations' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Managed Destinations (8 Total)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {destinations.map((d) => (
              <div key={d.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-sm text-slate-900">{d.name}</h4>
                <span className="text-xs text-slate-500 block">{d.state}</span>
                <span className="text-xs font-bold text-slate-700 block">
                  Base Solo Cost: {formatINR(d.baseCost)}
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold block">
                  {d.popularAttractions.length} Popular Attractions
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: USERS */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-lg">Active Platform Personas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs uppercase font-bold text-emerald-600">Traveler Persona</span>
              <h4 className="font-bold text-sm text-slate-900">{userProfile.name}</h4>
              <p className="text-xs text-slate-500">{userProfile.email} • {userProfile.homeCity}</p>
              <span className="text-xs text-emerald-700 font-semibold block">
                Total Saved: {formatINR(userProfile.totalSaved)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs uppercase font-bold text-indigo-600">Vendor Persona</span>
              <h4 className="font-bold text-sm text-slate-900">Haritha Valley Hospitality</h4>
              <p className="text-xs text-slate-500">vendor@haritha.in • Araku Valley</p>
              <span className="text-xs text-indigo-700 font-semibold block">
                5 Active Offers Listed
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs uppercase font-bold text-purple-600">Administrator Persona</span>
              <h4 className="font-bold text-sm text-slate-900">System Admin Core</h4>
              <p className="text-xs text-slate-500">admin@terravistas.in • Superuser</p>
              <span className="text-xs text-purple-700 font-semibold block">
                Full System Governance
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
