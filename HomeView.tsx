import React, { useState } from 'react';
import {
  Users,
  Compass,
  Sparkles,
  ArrowRight,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Sliders,
  DollarSign,
  Bus,
  Hotel,
  Utensils,
  ChevronRight,
  Star
} from 'lucide-react';
import { Destination, TravelGroup, VendorOffer } from '../types';
import { calculateGroupCost, formatINR } from '../utils/pricing';
import { CostBreakdown } from '../components/CostBreakdown';
import { GroupCard } from '../components/GroupCard';
import { DestinationCard } from '../components/DestinationCard';
import { OfferCard } from '../components/OfferCard';
import { InteractiveMap } from '../components/InteractiveMap';

interface HomeViewProps {
  destinations: Destination[];
  groups: TravelGroup[];
  vendorOffers: VendorOffer[];
  onNavigate: (page: string, params?: any) => void;
  onJoinGroup: (group: TravelGroup) => void;
  onViewGroupDetails: (group: TravelGroup) => void;
  onSelectDestination: (destination: Destination) => void;
  joinedGroupIds: string[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  destinations,
  groups,
  vendorOffers,
  onNavigate,
  onJoinGroup,
  onViewGroupDetails,
  onSelectDestination,
  joinedGroupIds,
}) => {
  // Interactive Sandbox Calculator State
  const [calculatorGroupSize, setCalculatorGroupSize] = useState<number>(18);
  const [calculatorBaseCost, setCalculatorBaseCost] = useState<number>(3800);
  const calculation = calculateGroupCost(calculatorBaseCost, calculatorGroupSize);

  // Quick hero search state
  const [heroDestination, setHeroDestination] = useState<string>('Araku Valley');
  const [heroDate, setHeroDate] = useState<string>('2026-10-20');
  const [heroTravelers, setHeroTravelers] = useState<number>(1);

  // Smart Recommendation Data (Dynamic)
  const arakuGroup = groups.find((g) => g.id === 'araku-oct20-group') || groups[0];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* HERO SECTION */}
      <section className="relative pt-6 sm:pt-12 pb-16 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-emerald-100/60 via-teal-50/30 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-800 shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Smart Community Group Travel Platform</span>
              </div>

              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.1]">
                  TERRA VISTAS
                </h1>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  Travel Together. Pay Less.
                </p>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Find travelers heading to the same destination, join a group, and discover potential savings on transportation, accommodation, food, attractions and activities.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('planner')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Plan My Trip</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('groups')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Explore Groups</span>
                </button>
              </div>

              {/* Key Trust Metrics */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Verified Travel Hosts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span>Up to 45% Potential Savings</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span>All Prices in INR (₹)</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
                <img
                  src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80"
                  alt="Araku Valley expedition"
                  className="w-full h-80 sm:h-96 object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />

                {/* Floating Live Group Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-900">
                    Live Demo: Araku Oct 20 Group
                  </span>
                </div>

                {/* Live Card Overlay at Bottom */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-white space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> Araku Valley Expedition
                    </span>
                    <span className="text-slate-300">Oct 20, 2026</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Estimated Group Cost
                      </span>
                      <span className="text-xl font-extrabold text-white">
                        {formatINR(arakuGroup.estimatedGroupCost)}
                        <span className="text-xs text-slate-400 font-normal">/person</span>
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block">
                        Potential Savings
                      </span>
                      <span className="text-lg font-extrabold text-emerald-400">
                        {formatINR(arakuGroup.potentialSavings)}/person
                      </span>
                    </div>
                  </div>

                  {/* Progress and quick join CTA */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[11px] mb-1 text-slate-300">
                      <span>Group Capacity</span>
                      <span className="font-bold text-white">
                        {arakuGroup.currentMembers} / {arakuGroup.maxMembers} Travelers
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(arakuGroup.currentMembers / arakuGroup.maxMembers) * 100}%`,
                        }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewGroupDetails(arakuGroup)}
                    className="w-full mt-2 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Group & Join</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Interactive Search Bar */}
          <div className="mt-10 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-200/90">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Destination
                </label>
                <select
                  value={heroDestination}
                  onChange={(e) => setHeroDestination(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={heroDate}
                  onChange={(e) => setHeroDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  Travelers (You + Friends)
                </label>
                <select
                  value={heroTravelers}
                  onChange={(e) => setHeroTravelers(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={1}>1 Solo Traveler</option>
                  <option value={2}>2 Travelers (Pair)</option>
                  <option value={3}>3 Travelers</option>
                  <option value={4}>4 Travelers (Small Group)</option>
                  <option value={5}>5+ Travelers</option>
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate('planner', {
                      destination: heroDestination,
                      date: heroDate,
                      travelers: heroTravelers,
                    })
                  }
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>Find Matching Groups</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW TERRA VISTAS WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Simple 5-Step Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            How TERRA VISTAS Works
          </h2>
          <p className="text-sm text-slate-600">
            Our platform groups travelers visiting the same destination around the same date, transforming expensive individual travel into cost-effective community travel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            {
              step: 'Step 1',
              title: 'Choose Destination',
              desc: 'Select Araku Valley, Vizag, Goa, Ooty, or any of our popular travel destinations.',
              icon: <MapPin className="w-5 h-5 text-emerald-600" />,
            },
            {
              step: 'Step 2',
              title: 'Find Travelers',
              desc: 'Discover people heading to the same place on your preferred travel dates.',
              icon: <Users className="w-5 h-5 text-teal-600" />,
            },
            {
              step: 'Step 3',
              title: 'Join or Create a Group',
              desc: 'Hop onto an existing group with 1 click or start a new group itinerary.',
              icon: <Compass className="w-5 h-5 text-indigo-600" />,
            },
            {
              step: 'Step 4',
              title: 'Unlock Group Offers',
              desc: 'As group member count increases, partner hotel, dining, and transit offers activate.',
              icon: <Sparkles className="w-5 h-5 text-amber-600" />,
            },
            {
              step: 'Step 5',
              title: 'Save More',
              desc: 'Enjoy lower estimated cost per person with verified group discount opportunities.',
              icon: <TrendingDown className="w-5 h-5 text-rose-600" />,
            },
          ].map((item, index) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                  {item.step}
                </span>
                <div className="p-2 bg-slate-100 rounded-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
              <div className="w-8 h-1 bg-slate-200 rounded-full group-hover:w-full group-hover:bg-emerald-500 transition-all duration-300" />
            </div>
          ))}
        </div>
      </section>

      {/* SMART TRIP RECOMMENDATION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-emerald-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Smart Trip Recommendation
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold font-display tracking-tight text-white">
                You are planning to visit Araku Valley on October 20?
              </h3>

              <div className="space-y-1.5 text-xs sm:text-sm text-slate-200">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <strong>18 travelers</strong> are already confirmed to visit on October 20.
                </p>
                <p className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-teal-300 shrink-0" />
                  If the group reaches 20 travelers, the estimated cost decreases from ₹3,200 to approximately <strong>₹2,600/person</strong>.
                </p>
                <p className="text-[11px] text-slate-300 italic pt-1">
                  Includes shared AC coach, Haritha Cottages partner rate, and fast-track Borra Caves group entry pass.
                </p>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-3">
              <div className="text-left lg:text-right bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 w-full lg:w-auto">
                <span className="text-[10px] uppercase font-bold text-emerald-300 block">
                  Current Group Estimate
                </span>
                <span className="text-2xl font-extrabold text-white">₹2,600/person</span>
                <span className="text-[11px] text-emerald-300 block font-semibold">
                  Save ₹1,200 vs Solo
                </span>
              </div>

              <button
                type="button"
                onClick={() => onViewGroupDetails(arakuGroup)}
                className="w-full lg:w-auto px-6 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Join Recommended Group</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC GROUP COST CALCULATOR SANDBOX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Dynamic Group Economics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
                Dynamic Group Cost Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Drag the slider to see how estimated group cost and potential savings scale dynamically as more travelers join!
              </p>
            </div>

            {/* Quick Benchmark buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Quick benchmarks:</span>
              {[1, 5, 10, 18, 30, 50].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCalculatorGroupSize(num)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    calculatorGroupSize === num
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {num} {num === 1 ? 'Traveler' : 'Travelers'}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Slider Bar */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                Group Size: <span className="text-emerald-700 text-base">{calculatorGroupSize} Travelers</span>
              </label>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-500">Base Solo Cost:</span>
                <span className="text-xs font-extrabold text-slate-800 ml-1.5">{formatINR(calculatorBaseCost)}</span>
              </div>
            </div>

            <input
              type="range"
              min="1"
              max="50"
              value={calculatorGroupSize}
              onChange={(e) => setCalculatorGroupSize(Number(e.target.value))}
              className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-semibold px-1">
              <span>1 (Solo: ₹3,800)</span>
              <span>5 (₹3,400)</span>
              <span>10 (₹3,000)</span>
              <span>18-20 (₹2,600)</span>
              <span>30 (₹2,350)</span>
              <span>50 (₹2,100)</span>
            </div>
          </div>

          {/* Live Cost Breakdown Component */}
          <CostBreakdown
            breakdown={calculation.breakdown}
            soloTotal={calculation.baseCost}
            groupTotal={calculation.estimatedGroupCost}
            potentialSavings={calculation.potentialSavings}
            savingsPercentage={calculation.savingsPercentage}
            groupSize={calculatorGroupSize}
          />
        </div>
      </section>

      {/* TRENDING TRAVEL GROUPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Active Community Departures
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
              Featured Travel Groups
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Join an existing group with open slots to instantly access unlocked group rates.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('groups')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Groups ({groups.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.slice(0, 3).map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onJoin={onJoinGroup}
              onViewDetails={onViewGroupDetails}
              isJoined={joinedGroupIds.includes(group.id)}
            />
          ))}
        </div>
      </section>

      {/* EXPLORE DESTINATIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
              Top Indian Locations
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
              Explore Destinations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Popular hill stations, coastal beaches, and heritage cities with active group discounts.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('destinations')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All 8 Destinations</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.slice(0, 4).map((dest) => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              activeGroupsCount={groups.filter((g) => g.destinationId === dest.id).length || 1}
              onSelect={onSelectDestination}
              onPlanTrip={(d) => onNavigate('planner', { destination: d.name })}
            />
          ))}
        </div>
      </section>

      {/* INTERACTIVE DESTINATION MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3 mb-6">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Interactive Local Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Interactive Destination Map
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Explore pickup meeting points, partnered hotels, group banquet dining, and attraction gates.
          </p>
        </div>

        <InteractiveMap
          destination={destinations[0]}
          allDestinations={destinations}
          onSelectDestination={onSelectDestination}
        />
      </section>

      {/* PARTNER VENDOR OFFERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Pre-negotiated Savings
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display mt-2">
              Partner Vendor Group Offers
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Hotels, restaurants, coaches, and activity providers offering bulk group tariffs.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('vendor-dashboard')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Are you a vendor? Partner with us</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendorOffers.slice(0, 3).map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onApplyOrInquire={() => onNavigate('groups')}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
