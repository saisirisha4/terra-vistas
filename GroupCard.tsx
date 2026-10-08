import React from 'react';
import { Calendar, Users, TrendingDown, CheckCircle2, ArrowRight, Sparkles, MapPin, Bus, Hotel } from 'lucide-react';
import { TravelGroup } from '../types';
import { ProgressBar } from './ProgressBar';
import { formatINR } from '../utils/pricing';

interface GroupCardProps {
  group: TravelGroup;
  onJoin: (group: TravelGroup) => void;
  onViewDetails: (group: TravelGroup) => void;
  isJoined?: boolean;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onJoin,
  onViewDetails,
  isJoined = false,
}) => {
  const isFull = group.currentMembers >= group.maxMembers;
  const formattedDate = new Date(group.travelDate).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group">
      {/* Top Banner with Image and Badges */}
      <div className="relative h-44 overflow-hidden bg-slate-100">
        <img
          src={group.destinationImage}
          alt={group.destinationName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-slate-900/70 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-white/20 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            {group.destinationName}
          </span>
          {group.verified && (
            <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-md text-slate-800 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            {formattedDate}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-bold text-lg text-white font-display tracking-tight drop-shadow-sm">
            {group.destinationName} Group Expedition
          </h3>
          <p className="text-xs text-white/80 line-clamp-1">{group.transportPreference}</p>
        </div>
      </div>

      {/* Body Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* Progress Bar */}
        <ProgressBar current={group.currentMembers} max={group.maxMembers} size="md" />

        {/* Pricing Matrix */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50/90 rounded-xl p-3 border border-slate-100">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold block">
              Estimated Group Cost
            </span>
            <span className="text-xl font-extrabold text-slate-900 block mt-0.5">
              {formatINR(group.estimatedGroupCost)}
            </span>
            <span className="text-[11px] text-slate-400 line-through">
              Solo: {formatINR(group.baseCost)}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] uppercase tracking-wider text-emerald-600 font-semibold block flex items-center justify-end gap-1">
              <Sparkles className="w-3 h-3 text-emerald-500" />
              Potential Savings
            </span>
            <span className="text-xl font-extrabold text-emerald-600 block mt-0.5">
              {formatINR(group.potentialSavings)}
            </span>
            <span className="text-[10px] text-emerald-700 bg-emerald-100/70 font-semibold px-1.5 py-0.5 rounded inline-block">
              Save {Math.round((group.potentialSavings / group.baseCost) * 100)}%
            </span>
          </div>
        </div>

        {/* Group Preferences Quick Row */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
          <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
            <Bus className="w-3.5 h-3.5 text-slate-500" />
            {group.transportPreference.split('&')[0]}
          </span>
          <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg">
            <Hotel className="w-3.5 h-3.5 text-slate-500" />
            {group.accommodationPreference}
          </span>
        </div>

        {/* Host and Member Avatars */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <img
              src={group.creatorAvatar}
              alt={group.creatorName}
              className="w-7 h-7 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <span className="text-xs text-slate-600">
              Host: <strong className="text-slate-800">{group.creatorName.split(' ')[0]}</strong>
            </span>
          </div>

          <div className="flex -space-x-2 overflow-hidden">
            {group.members.slice(0, 4).map((member, idx) => (
              <img
                key={member.id || idx}
                src={member.avatar}
                alt={member.name}
                className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                title={member.name}
              />
            ))}
            {group.currentMembers > 4 && (
              <div className="flex items-center justify-center h-6 w-6 rounded-full ring-2 ring-white bg-slate-200 text-[10px] font-bold text-slate-700">
                +{group.currentMembers - 4}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onViewDetails(group)}
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
          >
            Group Details
          </button>

          <button
            type="button"
            disabled={isFull || isJoined}
            onClick={() => onJoin(group)}
            className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
              isJoined
                ? 'bg-emerald-100 text-emerald-800 cursor-default border border-emerald-300'
                : isFull
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 hover:shadow-md'
            }`}
          >
            {isJoined ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Joined
              </>
            ) : isFull ? (
              'Group Full'
            ) : (
              <>
                Join Group
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
