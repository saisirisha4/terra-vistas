import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Sparkles,
  Users,
  Calendar,
  Bus,
  Hotel,
  MapPin,
  TrendingDown,
  RotateCcw,
  SlidersHorizontal
} from 'lucide-react';
import { TravelGroup, Destination } from '../types';
import { GroupCard } from '../components/GroupCard';

interface FindGroupsViewProps {
  groups: TravelGroup[];
  destinations: Destination[];
  onJoinGroup: (group: TravelGroup) => void;
  onViewGroupDetails: (group: TravelGroup) => void;
  onNavigate: (page: string, params?: any) => void;
  joinedGroupIds: string[];
}

export const FindGroupsView: React.FC<FindGroupsViewProps> = ({
  groups,
  destinations,
  onJoinGroup,
  onViewGroupDetails,
  onNavigate,
  joinedGroupIds,
}) => {
  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDestination, setSelectedDestination] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [minGroupSize, setMinGroupSize] = useState<number>(0);
  const [transportFilter, setTransportFilter] = useState('all');
  const [accommodationFilter, setAccommodationFilter] = useState('all');
  const [minSavingsPercent, setMinSavingsPercent] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'lowest_cost' | 'highest_savings' | 'most_travelers' | 'nearest_date'>('highest_savings');

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Filter & Sort Logic
  const filteredAndSortedGroups = useMemo(() => {
    return groups
      .filter((group) => {
        // Search term
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          const matchName = group.destinationName.toLowerCase().includes(term);
          const matchDesc = group.description.toLowerCase().includes(term);
          if (!matchName && !matchDesc) return false;
        }

        // Destination
        if (selectedDestination !== 'all') {
          if (group.destinationId !== selectedDestination && group.destinationName !== selectedDestination) {
            return false;
          }
        }

        // Travel Date
        if (selectedDate) {
          if (group.travelDate < selectedDate) return false;
        }

        // Group size
        if (minGroupSize > 0) {
          if (group.currentMembers < minGroupSize) return false;
        }

        // Transport
        if (transportFilter !== 'all') {
          if (!group.transportPreference.toLowerCase().includes(transportFilter.toLowerCase())) {
            return false;
          }
        }

        // Accommodation
        if (accommodationFilter !== 'all') {
          if (!group.accommodationPreference.toLowerCase().includes(accommodationFilter.toLowerCase())) {
            return false;
          }
        }

        // Savings percentage
        if (minSavingsPercent > 0) {
          const savingPct = (group.potentialSavings / group.baseCost) * 100;
          if (savingPct < minSavingsPercent) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'lowest_cost') {
          return a.estimatedGroupCost - b.estimatedGroupCost;
        }
        if (sortBy === 'highest_savings') {
          return b.potentialSavings - a.potentialSavings;
        }
        if (sortBy === 'most_travelers') {
          return b.currentMembers - a.currentMembers;
        }
        if (sortBy === 'nearest_date') {
          return new Date(a.travelDate).getTime() - new Date(b.travelDate).getTime();
        }
        return 0;
      });
  }, [
    groups,
    searchTerm,
    selectedDestination,
    selectedDate,
    minGroupSize,
    transportFilter,
    accommodationFilter,
    minSavingsPercent,
    sortBy,
  ]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedDestination('all');
    setSelectedDate('');
    setMinGroupSize(0);
    setTransportFilter('all');
    setAccommodationFilter('all');
    setMinSavingsPercent(0);
    setSortBy('highest_savings');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            Group Discovery Hub
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mt-1">
            Find Travel Groups
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Browse and filter active departures. More travelers joining equal higher potential savings on hotels, transportation, and local tours.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('create-group')}
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
        >
          <span>Create New Group</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm space-y-4">
        {/* Primary Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination, host, route..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Destination Filter */}
          <div>
            <select
              value={selectedDestination}
              onChange={(e) => setSelectedDestination(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Destinations ({destinations.length})</option>
              {destinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="highest_savings">Highest Savings (₹)</option>
              <option value="lowest_cost">Lowest Estimated Cost</option>
              <option value="most_travelers">Most Travelers</option>
              <option value="nearest_date">Nearest Travel Date</option>
            </select>
          </div>

          {/* Toggle Advanced Filters */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                showAdvancedFilters
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{showAdvancedFilters ? 'Hide Filters' : 'More Filters'}</span>
            </button>

            <button
              type="button"
              onClick={resetFilters}
              className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Expandable Advanced Filters Drawer */}
        {showAdvancedFilters && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-200">
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Travel Date (On or After)
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Minimum Travelers Joined
              </label>
              <select
                value={minGroupSize}
                onChange={(e) => setMinGroupSize(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value={0}>Any group size</option>
                <option value={10}>10+ travelers</option>
                <option value={18}>18+ travelers (High Savings)</option>
                <option value={30}>30+ travelers (Max Savings)</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Transport Mode
              </label>
              <select
                value={transportFilter}
                onChange={(e) => setTransportFilter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value="all">All Transport</option>
                <option value="coach">AC Coach / Minibus</option>
                <option value="jeep">Safari Jeep</option>
                <option value="bus">Dedicated Bus</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Min. Savings Percentage
              </label>
              <select
                value={minSavingsPercent}
                onChange={(e) => setMinSavingsPercent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value={0}>Any savings</option>
                <option value={20}>20%+ Off</option>
                <option value={30}>30%+ Off</option>
                <option value={35}>35%+ Off (Tier 3)</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Active Groups Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong>{filteredAndSortedGroups.length}</strong> active travel groups
        </span>
        <span className="font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
          All prices updated dynamically as members join
        </span>
      </div>

      {/* Grid of Groups */}
      {filteredAndSortedGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedGroups.map((group) => (
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
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
          <Users className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-slate-800">No groups matched your active filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your date or destination filters, or click reset to see all active departures.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
