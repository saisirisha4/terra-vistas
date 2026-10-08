import React from 'react';
import {
  Users,
  Compass,
  Calendar,
  Sparkles,
  TrendingDown,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Luggage,
  Award,
  ChevronRight,
  Bus,
  Plus
} from 'lucide-react';
import { Trip, TravelGroup, UserProfile } from '../types';
import { formatINR } from '../utils/pricing';
import { ProgressBar } from '../components/ProgressBar';

interface TravelerDashboardViewProps {
  userProfile: UserProfile;
  trips: Trip[];
  groups: TravelGroup[];
  joinedGroupIds: string[];
  recentActivities: string[];
  onNavigate: (page: string, params?: any) => void;
  onViewGroupDetails: (group: TravelGroup) => void;
}

export const TravelerDashboardView: React.FC<TravelerDashboardViewProps> = ({
  userProfile,
  trips,
  groups,
  joinedGroupIds,
  recentActivities,
  onNavigate,
  onViewGroupDetails,
}) => {
  // Joined groups
  const myGroups = groups.filter((g) => joinedGroupIds.includes(g.id));
  const upcomingTrips = trips.filter((t) => t.status === 'upcoming');
  const primaryUpcomingTrip = upcomingTrips[0] || null;

  // Find corresponding group for the upcoming trip
  const currentActiveGroup = primaryUpcomingTrip
    ? groups.find((g) => g.id === primaryUpcomingTrip.groupId) || myGroups[0]
    : myGroups[0] || null;

  // Calculate live cumulative estimated savings across all joined groups
  const totalCalculatedSavings = myGroups.reduce((acc, g) => acc + g.potentialSavings, 0) + 1450;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-white/40 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Verified Traveler
              </span>
              <span className="text-xs text-slate-300">{userProfile.homeCity}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">
              Welcome back, {userProfile.name}!
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              Track your shared community departures and unlocked group savings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('planner')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Plan Another Trip</span>
          </button>
        </div>
      </div>

      {/* KEY STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Groups Joined */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Groups Joined
            </span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {myGroups.length}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Active departures
          </span>
        </div>

        {/* Estimated Savings */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
              Estimated Savings
            </span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-700">
            {formatINR(totalCalculatedSavings)}
          </div>
          <span className="text-[11px] text-teal-600 font-semibold">
            Saved compared to solo booking
          </span>
        </div>

        {/* Upcoming Trips */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Upcoming Trips
            </span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Calendar className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">
            {upcomingTrips.length}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Next: {primaryUpcomingTrip?.destination || 'Araku Valley'}
          </span>
        </div>

        {/* Traveler Rating Badge */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Community Tier
            </span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xl font-black text-slate-900">
            Smart Saver
          </div>
          <span className="text-[11px] text-amber-700 font-semibold">
            Unlocked 30%+ group tier
          </span>
        </div>
      </div>

      {/* UPCOMING TRIP SPOTLIGHT & RECENT ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Primary Upcoming Trip + Groups */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900 font-display">
              Upcoming Trip Spotlight
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('my-trips')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
            >
              View All My Trips →
            </button>
          </div>

          {currentActiveGroup ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/60 p-6 shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <img
                    src={currentActiveGroup.destinationImage}
                    alt={currentActiveGroup.destinationName}
                    className="w-16 h-16 rounded-2xl object-cover shadow-sm shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        Confirmed Departure
                      </span>
                      <span className="text-xs text-slate-400">
                        {currentActiveGroup.travelDate}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                      {currentActiveGroup.destinationName} Group Expedition
                    </h3>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Estimated Group Cost
                  </span>
                  <span className="text-2xl font-extrabold text-slate-900">
                    {formatINR(currentActiveGroup.estimatedGroupCost)}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 block">
                    Saving {formatINR(currentActiveGroup.potentialSavings)}/person
                  </span>
                </div>
              </div>

              {/* Current Group Members / Capacity */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-600" />
                    Current Group Capacity
                  </span>
                  <span className="font-extrabold text-slate-900 text-sm">
                    {currentActiveGroup.currentMembers} / {currentActiveGroup.maxMembers} Travelers
                  </span>
                </div>

                <ProgressBar
                  current={currentActiveGroup.currentMembers}
                  max={currentActiveGroup.maxMembers}
                  size="md"
                />
              </div>

              {/* Transit & Itinerary quick summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Transport Mode
                  </span>
                  <span className="font-semibold text-slate-800">
                    {currentActiveGroup.transportPreference}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
                    Accommodation
                  </span>
                  <span className="font-semibold text-slate-800">
                    {currentActiveGroup.accommodationPreference}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Host: <strong>{currentActiveGroup.creatorName}</strong>
                </span>

                <button
                  type="button"
                  onClick={() => onViewGroupDetails(currentActiveGroup)}
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                >
                  <span>View Group Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
              <Luggage className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800">No active trips joined yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Explore our community departures and join a group heading to Araku, Vizag, or Goa.
              </p>
              <button
                type="button"
                onClick={() => onNavigate('groups')}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Browse Groups
              </button>
            </div>
          )}

          {/* ALL JOINED GROUPS ACCORDION / LIST */}
          <div className="space-y-3 pt-4">
            <h3 className="text-lg font-bold text-slate-900 font-display">
              My Travel Groups ({myGroups.length})
            </h3>
            {myGroups.map((g) => (
              <div
                key={g.id}
                className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={g.destinationImage}
                    alt={g.destinationName}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{g.destinationName}</h4>
                    <span className="text-xs text-slate-500">
                      Departing {g.travelDate} • {g.currentMembers} / {g.maxMembers} Travelers
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-emerald-700 block">
                      {formatINR(g.estimatedGroupCost)}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">
                      Save {formatINR(g.potentialSavings)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewGroupDetails(g)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column (4 cols): Recent Activity Feed & Smart Tips */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                Recent Activity
              </h3>
              <span className="text-[11px] text-slate-400">Live feed</span>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start gap-2.5"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{act}</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Recent</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prototype Community Guarantee */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-200 p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Community Savings Guarantee
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              If more travelers join your group prior to departure, your estimated group cost automatically recalibrates downward. You never pay more than the locked ceiling rate!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
