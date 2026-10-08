import React from 'react';
import { MapPin, Users, ArrowUpRight, Sparkles, Tag } from 'lucide-react';
import { Destination } from '../types';
import { formatINR } from '../utils/pricing';

interface DestinationCardProps {
  destination: Destination;
  activeGroupsCount: number;
  onSelect: (destination: Destination) => void;
  onPlanTrip: (destination: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  activeGroupsCount,
  onSelect,
  onPlanTrip,
}) => {
  // Approximate 30% group discount estimate for preview
  const previewGroupCost = Math.round(destination.baseCost * 0.68 / 10) * 10;
  const potentialSavings = destination.baseCost - previewGroupCost;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Visual Header */}
      <div className="relative h-48 overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onSelect(destination)}>
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {destination.state}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-emerald-500/95 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {activeGroupsCount} {activeGroupsCount === 1 ? 'Group' : 'Groups'} Active
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-xl text-white font-display tracking-tight drop-shadow-sm flex items-center justify-between">
            {destination.name}
            <ArrowUpRight className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-white/80 line-clamp-1">{destination.tagline}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Attractions Tags */}
        <div className="flex flex-wrap gap-1.5">
          {destination.popularAttractions.slice(0, 3).map((att) => (
            <span
              key={att.name}
              className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md flex items-center gap-1"
            >
              <Tag className="w-2.5 h-2.5 text-slate-400" />
              {att.name}
            </span>
          ))}
          {destination.popularAttractions.length > 3 && (
            <span className="text-[11px] font-medium text-slate-400 px-1 py-0.5">
              +{destination.popularAttractions.length - 3} more
            </span>
          )}
        </div>

        {/* Pricing Insight */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold block">
              Estimated Group Cost
            </span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-lg font-extrabold text-slate-900">
                {formatINR(previewGroupCost)}
              </span>
              <span className="text-xs text-slate-400 line-through">
                {formatINR(destination.baseCost)}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold flex items-center justify-end gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              Potential Savings
            </span>
            <span className="text-sm font-extrabold text-emerald-600 block mt-0.5">
              Save up to {formatINR(potentialSavings)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onSelect(destination)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Explore Highlights
          </button>
          <button
            type="button"
            onClick={() => onPlanTrip(destination)}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            Plan My Trip
          </button>
        </div>
      </div>
    </div>
  );
};
