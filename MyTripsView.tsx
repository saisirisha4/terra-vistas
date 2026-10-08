import React, { useState } from 'react';
import {
  Luggage,
  Calendar,
  Users,
  MapPin,
  TrendingDown,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Bus,
  Tag,
  Download
} from 'lucide-react';
import { Trip, TravelGroup } from '../types';
import { formatINR } from '../utils/pricing';

interface MyTripsViewProps {
  trips: Trip[];
  groups: TravelGroup[];
  onViewGroupDetails: (group: TravelGroup) => void;
  onNavigate: (page: string) => void;
}

export const MyTripsView: React.FC<MyTripsViewProps> = ({
  trips,
  groups,
  onViewGroupDetails,
  onNavigate,
}) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const filteredTrips = trips.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
            <Luggage className="w-3.5 h-3.5 text-emerald-600" />
            Traveler Itinerary & Bookings
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mt-1">
            My Trips
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            View all travel groups you have joined, track confirmed departure status, and review unlocked group savings.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Trips ({trips.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${
              filter === 'upcoming' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Upcoming
          </button>
          <button
            type="button"
            onClick={() => setFilter('completed')}
            className={`px-3 py-1.5 rounded-lg font-semibold ${
              filter === 'completed' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Trips Cards List */}
      {filteredTrips.length > 0 ? (
        <div className="space-y-6">
          {filteredTrips.map((trip) => {
            const correspondingGroup = groups.find((g) => g.id === trip.groupId) || groups[0];

            return (
              <div
                key={trip.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row justify-between"
              >
                {/* Visual Thumbnail */}
                <div className="relative md:w-72 h-48 md:h-auto bg-slate-900 shrink-0">
                  <img
                    src={trip.destinationImage}
                    alt={trip.destination}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent md:hidden" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                        trip.status === 'upcoming'
                          ? 'bg-emerald-500 text-slate-950 font-extrabold'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-1">
                      <span className="font-semibold text-slate-400">
                        Booking Ref: <strong>{trip.bookingRef}</strong>
                      </span>
                      <span>Booked on {trip.bookedDate}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 font-display">
                      {trip.destination} Group Expedition
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                        {trip.travelDate} – {trip.returnDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-emerald-600" />
                        {trip.membersCount} Travelers in Group
                      </span>
                      <span className="flex items-center gap-1">
                        <Bus className="w-3.5 h-3.5 text-slate-500" />
                        {trip.transportMode}
                      </span>
                    </div>
                  </div>

                  {/* Financial Savings Card */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">
                        Estimated Group Cost
                      </span>
                      <span className="text-xl font-black text-slate-900">
                        {formatINR(trip.estimatedPrice)}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                        Potential Savings
                      </span>
                      <span className="text-lg font-black text-emerald-600">
                        {formatINR(trip.potentialSavings)}/person
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onViewGroupDetails(correspondingGroup)}
                        className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors flex items-center gap-1.5"
                      >
                        <span>Group Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <Luggage className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No trips in this view</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You can find upcoming community departures on the Find Groups page.
          </p>
          <button
            type="button"
            onClick={() => onNavigate('groups')}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
          >
            Find Travel Groups
          </button>
        </div>
      )}
    </div>
  );
};
