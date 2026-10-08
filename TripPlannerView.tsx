import React, { useState, useEffect } from 'react';
import {
  Compass,
  Calendar,
  Users,
  Sparkles,
  TrendingDown,
  DollarSign,
  Heart,
  ArrowRight,
  Filter,
  CheckCircle2,
  ShieldCheck,
  Search
} from 'lucide-react';
import { Destination, TravelGroup } from '../types';
import { calculateGroupCost, formatINR } from '../utils/pricing';
import { CostBreakdown } from '../components/CostBreakdown';
import { GroupCard } from '../components/GroupCard';

interface TripPlannerViewProps {
  destinations: Destination[];
  groups: TravelGroup[];
  initialDestination?: string;
  initialDate?: string;
  initialTravelers?: number;
  onJoinGroup: (group: TravelGroup) => void;
  onViewGroupDetails: (group: TravelGroup) => void;
  onNavigate: (page: string, params?: any) => void;
  joinedGroupIds: string[];
}

export const TripPlannerView: React.FC<TripPlannerViewProps> = ({
  destinations,
  groups,
  initialDestination = 'Araku Valley',
  initialDate = '2026-10-20',
  initialTravelers = 1,
  onJoinGroup,
  onViewGroupDetails,
  onNavigate,
  joinedGroupIds,
}) => {
  const [destination, setDestination] = useState<string>(initialDestination);
  const [travelDate, setTravelDate] = useState<string>(initialDate);
  const [returnDate, setReturnDate] = useState<string>('2026-10-22');
  const [numTravelers, setNumTravelers] = useState<number>(initialTravelers);
  const [budget, setBudget] = useState<string>('Moderate (₹2,500 – ₹3,500)');
  const [travelPreference, setTravelPreference] = useState<string>('Nature & Sightseeing');
  const [hasSearched, setHasSearched] = useState<boolean>(true);

  // Sync if props update
  useEffect(() => {
    if (initialDestination) setDestination(initialDestination);
    if (initialDate) setTravelDate(initialDate);
    if (initialTravelers) setNumTravelers(initialTravelers);
  }, [initialDestination, initialDate, initialTravelers]);

  // Current selected destination object
  const currentDestObj = destinations.find(
    (d) => d.name.toLowerCase() === destination.toLowerCase() || d.id === destination.toLowerCase()
  ) || destinations[0];

  const baseCost = currentDestObj.baseCost || 3800;

  // Assume matching groups typically have ~18-20 travelers for projection
  const projectedCalculation = calculateGroupCost(baseCost, 19);
  const soloCalculation = calculateGroupCost(baseCost, numTravelers);

  // Filter matching groups
  const matchingGroups = groups.filter((g) => {
    const destMatch =
      g.destinationName.toLowerCase().includes(destination.toLowerCase()) ||
      g.destinationId.toLowerCase().includes(currentDestObj.id.toLowerCase());
    return destMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Page Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Smart Group Trip Planner
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
          Plan My Trip & Find Groups
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Enter your travel details below to calculate your estimated solo cost, discover matching community departures, and unlock potential group savings.
        </p>
      </div>

      {/* Main Interactive Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Destination */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Araku Valley">Araku Valley (AP)</option>
              <option value="Visakhapatnam">Visakhapatnam (AP)</option>
              <option value="Goa">Goa</option>
              <option value="Hyderabad">Hyderabad (Telangana)</option>
              <option value="Tirupati">Tirupati (AP)</option>
              <option value="Ooty">Ooty (Tamil Nadu)</option>
              <option value="Munnar">Munnar (Kerala)</option>
              <option value="Bengaluru">Bengaluru (Karnataka)</option>
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">
              Baseline Solo Cost: {formatINR(baseCost)}/person
            </span>
          </div>

          {/* Travel Date */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Travel Date (Departure)
            </label>
            <div className="relative">
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
              Recommended: Oct 20, 2026 (Multiple groups departing)
            </span>
          </div>

          {/* Return Date */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Return Date
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Typical duration: 2 to 3 days
            </span>
          </div>

          {/* Number of Travelers */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Number of Travelers
            </label>
            <select
              value={numTravelers}
              onChange={(e) => setNumTravelers(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={1}>1 Solo Traveler</option>
              <option value={2}>2 Travelers (Pair/Couple)</option>
              <option value={3}>3 Travelers (Small Group)</option>
              <option value={4}>4 Travelers</option>
              <option value={5}>5+ Travelers</option>
            </select>
            <span className="text-[11px] text-slate-400 mt-1 block">
              You will merge with community members to unlock group tiers
            </span>
          </div>

          {/* Budget */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Budget Preference
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Economy Saver (₹2,000 – ₹2,500)">Economy Saver (₹2,000 – ₹2,500)</option>
              <option value="Moderate (₹2,500 – ₹3,500)">Moderate (₹2,500 – ₹3,500)</option>
              <option value="Comfort Deluxe (₹3,500 – ₹4,500)">Comfort Deluxe (₹3,500 – ₹4,500)</option>
            </select>
          </div>

          {/* Travel Preference */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Travel Preference
            </label>
            <select
              value={travelPreference}
              onChange={(e) => setTravelPreference(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Nature & Sightseeing">Nature & Sightseeing</option>
              <option value="Trekking & Adventure">Trekking & Adventure</option>
              <option value="Culture & Heritage">Culture & Heritage</option>
              <option value="Relaxation & Leisure">Relaxation & Leisure</option>
            </select>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Prototype pricing algorithm estimates dynamic partner savings</span>
          </div>

          <button
            type="button"
            onClick={() => setHasSearched(true)}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Find Groups</span>
          </button>
        </div>
      </div>

      {/* SOLO COST VS PROJECTED GROUP COST COMPARISON */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Economic Comparison
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-display mt-1">
              Solo Cost vs. Group Cost for {currentDestObj.name}
            </h2>
          </div>
        </div>

        <CostBreakdown
          breakdown={projectedCalculation.breakdown}
          soloTotal={baseCost}
          groupTotal={projectedCalculation.estimatedGroupCost}
          potentialSavings={projectedCalculation.potentialSavings}
          savingsPercentage={projectedCalculation.savingsPercentage}
          groupSize={19}
        />
      </div>

      {/* MATCHING GROUPS RESULTS */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display">
              Matching Travel Groups for {destination}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing active community groups departing around {travelDate}
            </p>
          </div>

          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 self-start sm:self-auto">
            {matchingGroups.length} Matching Groups Found
          </span>
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
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-4">
            <Users className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">
              No matching groups for this exact date yet
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Be the pioneer! Create a new travel group for {destination} and allow other travelers to join and unlock group discounts with you.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('create-group', { destination })}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
            >
              Create Travel Group for {destination}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
