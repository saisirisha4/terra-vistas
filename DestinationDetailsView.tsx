import React from 'react';
import {
  MapPin,
  Calendar,
  Users,
  Compass,
  Sparkles,
  ArrowLeft,
  CloudSun,
  Train,
  Plane,
  Car,
  Tag,
  ShieldCheck,
  TrendingDown
} from 'lucide-react';
import { Destination, TravelGroup, VendorOffer } from '../types';
import { calculateGroupCost, formatINR } from '../utils/pricing';
import { CostBreakdown } from '../components/CostBreakdown';
import { GroupCard } from '../components/GroupCard';
import { OfferCard } from '../components/OfferCard';
import { InteractiveMap } from '../components/InteractiveMap';

interface DestinationDetailsViewProps {
  destination: Destination;
  allDestinations: Destination[];
  groups: TravelGroup[];
  vendorOffers: VendorOffer[];
  onBack: () => void;
  onJoinGroup: (group: TravelGroup) => void;
  onViewGroupDetails: (group: TravelGroup) => void;
  onPlanTrip: (destName: string) => void;
  joinedGroupIds: string[];
}

export const DestinationDetailsView: React.FC<DestinationDetailsViewProps> = ({
  destination,
  allDestinations,
  groups,
  vendorOffers,
  onBack,
  onJoinGroup,
  onViewGroupDetails,
  onPlanTrip,
  joinedGroupIds,
}) => {
  // Destination specific groups
  const matchingGroups = groups.filter(
    (g) =>
      g.destinationId === destination.id ||
      g.destinationName.toLowerCase() === destination.name.toLowerCase()
  );

  // Offers in this destination
  const matchingOffers = vendorOffers.filter(
    (o) =>
      o.destination.toLowerCase().includes(destination.name.toLowerCase()) ||
      destination.name.toLowerCase().includes(o.destination.toLowerCase())
  );

  const dynamicCalc = calculateGroupCost(destination.baseCost, 20);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-in fade-in duration-300">
      {/* Navigation Top */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Destinations</span>
        </button>

        <button
          type="button"
          onClick={() => onPlanTrip(destination.name)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Plan Trip to {destination.name}</span>
        </button>
      </div>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 min-h-[360px] flex flex-col justify-end p-6 sm:p-10 text-white">
        <img
          src={destination.image}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {destination.state}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
              Best Time: {destination.bestTime}
            </span>
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20">
              {matchingGroups.length} Active Groups
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            {destination.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {destination.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <CloudSun className="w-4 h-4 text-amber-400" />
              <span>{destination.travelInfo.weather}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Train className="w-4 h-4 text-sky-400" />
              <span>{destination.travelInfo.nearestStation}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Plane className="w-4 h-4 text-indigo-400" />
              <span>{destination.travelInfo.nearestAirport}</span>
            </div>
          </div>
        </div>
      </div>

      {/* POPULAR ATTRACTIONS SECTION */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            Must-Visit Sightseeing
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Popular Attractions in {destination.name}
          </h2>
          <p className="text-xs text-slate-500">
            All listed attractions include discounted group entry passes or shared vehicle transfers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {destination.popularAttractions.map((att) => (
            <div
              key={att.name}
              className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {att.tag}
                  </span>
                  <span className="text-emerald-700 bg-emerald-50 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-200">
                    Group Rate Available
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">{att.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{att.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400 line-through">
                  Solo: {formatINR(att.estimatedSoloCost)}
                </span>
                <span className="font-extrabold text-emerald-700">
                  Group: {formatINR(att.estimatedGroupCost)}/person
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COST COMPARISON FOR THIS DESTINATION */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
            Pricing Benchmark
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Solo vs. Group Travel Economics for {destination.name}
          </h2>
        </div>

        <CostBreakdown
          breakdown={dynamicCalc.breakdown}
          soloTotal={destination.baseCost}
          groupTotal={dynamicCalc.estimatedGroupCost}
          potentialSavings={dynamicCalc.potentialSavings}
          savingsPercentage={dynamicCalc.savingsPercentage}
          groupSize={20}
        />
      </div>

      {/* ACTIVE GROUPS FOR THIS DESTINATION */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Community Departures
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
              Active Groups Visiting {destination.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => onPlanTrip(destination.name)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            Create Your Own Departure →
          </button>
        </div>

        {matchingGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingGroups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onJoin={onJoinGroup}
                onViewDetails={onViewGroupDetails}
                isJoined={joinedGroupIds.includes(group.id)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
            <p className="text-xs text-slate-500">
              No active groups scheduled right now. Click "Plan Trip" to launch the first group!
            </p>
          </div>
        )}
      </div>

      {/* INTERACTIVE DESTINATION MAP */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
            Local Waypoints
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            {destination.name} Interactive Explorer Map
          </h2>
        </div>

        <InteractiveMap destination={destination} allDestinations={allDestinations} />
      </div>

      {/* PARTNER OFFERS FOR THIS DESTINATION */}
      {matchingOffers.length > 0 && (
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              Local Vendor Deals
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
              Partner Vendor Offers in {destination.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
