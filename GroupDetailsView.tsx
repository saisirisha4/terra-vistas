import React, { useState } from 'react';
import {
  Calendar,
  Users,
  MapPin,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  ShieldCheck,
  ArrowLeft,
  Share2,
  Bus,
  Hotel,
  Utensils,
  Compass,
  Clock,
  UserCheck,
  BadgePercent
} from 'lucide-react';
import { TravelGroup, Destination } from '../types';
import { ProgressBar } from '../components/ProgressBar';
import { CostBreakdown } from '../components/CostBreakdown';
import { calculateGroupCost, formatINR } from '../utils/pricing';

interface GroupDetailsViewProps {
  group: TravelGroup;
  destinationObj?: Destination;
  onJoinGroup: (group: TravelGroup) => void;
  onBack: () => void;
  isJoined?: boolean;
}

export const GroupDetailsView: React.FC<GroupDetailsViewProps> = ({
  group,
  destinationObj,
  onJoinGroup,
  onBack,
  isJoined = false,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Dynamic cost calculation based on current members
  const dynamicCalc = calculateGroupCost(group.baseCost, group.currentMembers);
  const isFull = group.currentMembers >= group.maxMembers;

  const formattedTravelDate = new Date(group.travelDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formattedReturnDate = new Date(group.returnDate).toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Back Button & Header Utility */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Groups</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white px-3 py-2 rounded-xl border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copiedLink ? 'Link Copied!' : 'Share Group'}</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200/90 bg-slate-900 text-white min-h-[300px] flex flex-col justify-end p-6 sm:p-10">
        <img
          src={group.destinationImage}
          alt={group.destinationName}
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {group.destinationName}
            </span>
            {group.verified && (
              <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Community Host
              </span>
            )}
            <span className="bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              {formattedTravelDate} – {formattedReturnDate}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white">
            {group.destinationName} Community Group Expedition
          </h1>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
            {group.description}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <img
              src={group.creatorAvatar}
              alt={group.creatorName}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div>
              <span className="text-xs text-slate-300 block">Organized by</span>
              <strong className="text-sm text-white font-bold">{group.creatorName}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Details + Join Action Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Itinerary, Breakdown, Partner Offers */}
        <div className="lg:col-span-8 space-y-8">
          {/* Capacity and Pricing Quick Highlight Banner */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-extrabold text-slate-400 tracking-wider">
                  Current Group Status
                </span>
                <div className="text-2xl font-extrabold text-slate-900 mt-0.5 flex items-baseline gap-2">
                  <span>{group.currentMembers} Travelers Joined</span>
                  <span className="text-sm font-semibold text-slate-400">
                    (Max: {group.maxMembers})
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200">
                <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                  Current Estimated Group Cost
                </span>
                <span className="text-2xl font-black text-emerald-700">
                  {formatINR(group.estimatedGroupCost)}
                  <span className="text-xs text-emerald-600 font-normal">/person</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-600 block">
                  Potential Savings: {formatINR(group.potentialSavings)}/person
                </span>
              </div>
            </div>

            {/* Live Progress Bar */}
            <ProgressBar current={group.currentMembers} max={group.maxMembers} size="lg" />

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium">
                <BadgePercent className="w-4 h-4 text-emerald-600" />
                Next tier discount unlocks when group reaches {Math.min(group.maxMembers, group.currentMembers + 2)} travelers!
              </span>
              <span className="text-emerald-700 font-bold">Live Recalculation Active</span>
            </div>
          </div>

          {/* Detailed Cost Breakdown for this Group */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              Itemized Cost Breakdown ({group.currentMembers} Travelers)
            </h3>
            <CostBreakdown
              breakdown={dynamicCalc.breakdown}
              soloTotal={group.baseCost}
              groupTotal={group.estimatedGroupCost}
              potentialSavings={group.potentialSavings}
              savingsPercentage={dynamicCalc.savingsPercentage}
              groupSize={group.currentMembers}
            />
          </div>

          {/* Itinerary Highlights */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-600" />
              Itinerary Highlights
            </h3>
            <div className="space-y-3">
              {group.itineraryHighlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Partner Offers Included in this Group */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Pre-negotiated Partner Offers Included
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {group.partnerOffersIncluded.map((offerText, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-2.5 text-xs text-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-semibold">{offerText}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Group Travelers List */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 font-display flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-600" />
                Confirmed Travelers ({group.members.length} Displayed)
              </h3>
              <span className="text-xs text-slate-500">
                +{group.currentMembers - group.members.length} other registered travelers
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {group.members.map((member) => (
                <div
                  key={member.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-9 h-9 rounded-full object-cover shadow-xs"
                  />
                  <div className="min-w-0">
                    <h5 className="font-bold text-xs text-slate-900 truncate">{member.name}</h5>
                    <span className="text-[11px] text-slate-500 block truncate">{member.city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Column (4 cols): Primary Join Group Action Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-5">
          <div className="bg-white rounded-3xl border-2 border-emerald-500/80 p-6 shadow-xl space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                Direct Reservation Estimate
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 font-display">
                Join This Group
              </h3>
              <p className="text-xs text-slate-500">
                Lock in your spot. Every traveler who joins brings down the overall estimated cost.
              </p>
            </div>

            {/* Quick Summary Grid */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Destination</span>
                <span className="font-bold text-slate-900">{group.destinationName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Travel Date</span>
                <span className="font-bold text-slate-900">{formattedTravelDate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Current Members</span>
                <span className="font-bold text-slate-900">
                  {group.currentMembers} / {group.maxMembers}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Solo Base Cost</span>
                <span className="line-through text-slate-400">{formatINR(group.baseCost)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Estimated Group Cost</span>
                <span className="text-base font-extrabold text-emerald-700">
                  {formatINR(group.estimatedGroupCost)}/person
                </span>
              </div>
              <div className="flex justify-between py-1 bg-emerald-50 px-2 rounded-lg font-bold text-emerald-800">
                <span>Potential Savings</span>
                <span>{formatINR(group.potentialSavings)}/person</span>
              </div>
            </div>

            {/* Inclusion Checklist */}
            <div className="space-y-1.5 pt-1 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Bus className="w-3.5 h-3.5 text-sky-600" />
                <span>Transport: {group.transportPreference}</span>
              </div>
              <div className="flex items-center gap-2">
                <Hotel className="w-3.5 h-3.5 text-indigo-600" />
                <span>Hotel: {group.accommodationPreference}</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>Food: Group meal discount eligible</span>
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-3.5 h-3.5 text-purple-600" />
                <span>Activities: Fast-track entry included</span>
              </div>
            </div>

            {/* MAIN JOIN BUTTON */}
            <button
              type="button"
              disabled={isFull || isJoined}
              onClick={() => onJoinGroup(group)}
              className={`w-full py-4 rounded-2xl text-sm font-extrabold transition-all shadow-lg flex items-center justify-center gap-2 ${
                isJoined
                  ? 'bg-emerald-100 text-emerald-800 border-2 border-emerald-400 cursor-default'
                  : isFull
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30 hover:shadow-xl hover:scale-[1.02]'
              }`}
            >
              {isJoined ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>You are a Member of this Group!</span>
                </>
              ) : isFull ? (
                <span>Group is at Maximum Capacity (40/40)</span>
              ) : (
                <>
                  <UserCheck className="w-5 h-5" />
                  <span>Join This Group Now</span>
                </>
              )}
            </button>

            {/* Reassurance disclaimer */}
            <div className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-snug">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                Prototype reservation: No payment taken. Clicking Join instantly increases group member count, recalculates estimated savings, and pins the trip to your Traveler Dashboard.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
