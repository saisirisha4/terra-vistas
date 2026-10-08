import React, { useState } from 'react';
import { MapPin, Users, Search, Compass, Sparkles } from 'lucide-react';
import { Destination, TravelGroup } from '../types';
import { DestinationCard } from '../components/DestinationCard';

interface ExploreDestinationsViewProps {
  destinations: Destination[];
  groups: TravelGroup[];
  onSelectDestination: (dest: Destination) => void;
  onPlanTrip: (destName: string) => void;
}

export const ExploreDestinationsView: React.FC<ExploreDestinationsViewProps> = ({
  destinations,
  groups,
  onSelectDestination,
  onPlanTrip,
}) => {
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('all');

  const filteredDestinations = destinations.filter((d) => {
    if (search) {
      const match =
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.state.toLowerCase().includes(search.toLowerCase()) ||
        d.description.toLowerCase().includes(search.toLowerCase());
      if (!match) return false;
    }
    if (stateFilter !== 'all' && d.state !== stateFilter) return false;
    return true;
  });

  const states = Array.from(new Set(destinations.map((d) => d.state)));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 bg-teal-100/80 text-teal-800 text-xs font-bold px-3 py-1 rounded-full border border-teal-300">
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          Indian Group Travel Hubs
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
          Explore Destinations
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Discover misty hill valleys, coastal watersports, and historic royal cities with verified TERRA VISTAS community departures and partner discounts.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search destination or state..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">All States</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 px-2">
          <span>{filteredDestinations.length} Destinations Available</span>
          <span className="text-emerald-700 font-bold">Group Pricing Enabled</span>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDestinations.map((dest) => (
          <DestinationCard
            key={dest.id}
            destination={dest}
            activeGroupsCount={groups.filter((g) => g.destinationId === dest.id).length || 1}
            onSelect={onSelectDestination}
            onPlanTrip={(d) => onPlanTrip(d.name)}
          />
        ))}
      </div>
    </div>
  );
};
