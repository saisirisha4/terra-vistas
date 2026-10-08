import React from 'react';
import { Bus, Hotel, Utensils, Car, Compass, TrendingDown, ShieldCheck, Sparkles } from 'lucide-react';
import { CostBreakdownItem } from '../types';
import { formatINR } from '../utils/pricing';

interface CostBreakdownProps {
  breakdown: CostBreakdownItem[];
  soloTotal: number;
  groupTotal: number;
  potentialSavings: number;
  savingsPercentage: number;
  groupSize?: number;
  compact?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Bus: <Bus className="w-4 h-4 text-sky-600" />,
  Hotel: <Hotel className="w-4 h-4 text-indigo-600" />,
  Utensils: <Utensils className="w-4 h-4 text-amber-600" />,
  Car: <Car className="w-4 h-4 text-emerald-600" />,
  Compass: <Compass className="w-4 h-4 text-purple-600" />,
};

export const CostBreakdown: React.FC<CostBreakdownProps> = ({
  breakdown,
  soloTotal,
  groupTotal,
  potentialSavings,
  savingsPercentage,
  groupSize = 18,
  compact = false,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm space-y-5">
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
              <TrendingDown className="w-4 h-4" />
            </span>
            <h3 className="font-bold text-slate-900 text-base">Cost Comparison Breakdown</h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Solo Estimated Cost vs. Estimated Group Cost ({groupSize} {groupSize === 1 ? 'traveler' : 'travelers'})
          </p>
        </div>

        {potentialSavings > 0 ? (
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
            <div className="text-left">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600 block">
                Potential Savings
              </span>
              <span className="text-sm font-extrabold text-emerald-700">
                {formatINR(potentialSavings)}/person ({savingsPercentage}% Off)
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
            Base Solo Rate (1 traveler)
          </div>
        )}
      </div>

      {/* Visual Side-by-side Progress Bars for Categories */}
      <div className="space-y-3.5">
        {breakdown.map((item) => {
          const itemSolo = item.soloCost;
          const itemGroup = item.groupCost;
          const itemSavings = Math.max(0, itemSolo - itemGroup);
          const percentSaved = itemSolo > 0 ? Math.round((itemSavings / itemSolo) * 100) : 0;
          const ratioGroup = Math.min(100, Math.round((itemGroup / (itemSolo || 1)) * 100));

          return (
            <div key={item.category} className="group p-2.5 rounded-xl hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-slate-100 rounded-md">
                    {iconMap[item.iconName] || <Compass className="w-4 h-4 text-slate-600" />}
                  </div>
                  <span className="font-medium text-slate-700">{item.category}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400 line-through text-[11px]">
                    Solo: {formatINR(itemSolo)}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">
                    Group: {formatINR(itemGroup)}
                  </span>
                  {itemSavings > 0 && (
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                      -{percentSaved}%
                    </span>
                  )}
                </div>
              </div>

              {/* Progress comparison line */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden relative">
                <div
                  className="bg-slate-300 h-full absolute left-0 top-0 rounded-full"
                  style={{ width: '100%' }}
                />
                <div
                  className="bg-emerald-500 h-full absolute left-0 top-0 rounded-full transition-all duration-500"
                  style={{ width: `${ratioGroup}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Totals Comparison Card */}
      <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <span className="text-[11px] font-medium text-slate-500 block">Solo Estimated Cost</span>
          <span className="text-base sm:text-lg font-bold text-slate-700 block mt-0.5">
            {formatINR(soloTotal)}
          </span>
          <span className="text-[10px] text-slate-400">Standard single traveler</span>
        </div>

        <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-200">
          <span className="text-[11px] font-medium text-emerald-800 block">Estimated Group Cost</span>
          <span className="text-base sm:text-lg font-extrabold text-emerald-700 block mt-0.5">
            {formatINR(groupTotal)}
          </span>
          <span className="text-[10px] text-emerald-600 font-medium">
            Per person in {groupSize}-member group
          </span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-teal-50/70 rounded-xl p-3 border border-teal-200 flex flex-col justify-center">
          <span className="text-[11px] font-medium text-teal-800 block">Group Discount Opportunity</span>
          <span className="text-base sm:text-lg font-extrabold text-teal-700 block mt-0.5">
            {potentialSavings > 0 ? `Save ${formatINR(potentialSavings)}` : 'Join to unlock'}
          </span>
          <span className="text-[10px] text-teal-600">
            {potentialSavings > 0 ? `${savingsPercentage}% less than solo` : 'Needs 2+ travelers'}
          </span>
        </div>
      </div>

      {/* Footnote disclaimer */}
      <div className="flex items-start gap-2 text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
        <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p className="leading-tight">
          <strong>Note:</strong> Normal train tickets do not become cheaper simply because more people join. Group discounts reflect shared chartered transport, partner hotel bulk rates, group meal thalis, and attraction group passes.
        </p>
      </div>
    </div>
  );
};
