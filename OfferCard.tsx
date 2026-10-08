import React from 'react';
import { Tag, Hotel, Utensils, Bus, Compass, Sparkles, Users, CheckCircle, ShieldCheck } from 'lucide-react';
import { VendorOffer } from '../types';
import { formatINR } from '../utils/pricing';

interface OfferCardProps {
  offer: VendorOffer;
  onApplyOrInquire?: (offer: VendorOffer) => void;
  isVendorView?: boolean;
  onToggleStatus?: (offerId: string) => void;
  onDelete?: (offerId: string) => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Hotel: <Hotel className="w-4 h-4 text-indigo-600" />,
  Restaurant: <Utensils className="w-4 h-4 text-amber-600" />,
  Transport: <Bus className="w-4 h-4 text-sky-600" />,
  Attraction: <Compass className="w-4 h-4 text-purple-600" />,
  Activity: <Sparkles className="w-4 h-4 text-emerald-600" />,
};

export const OfferCard: React.FC<OfferCardProps> = ({
  offer,
  onApplyOrInquire,
  isVendorView = false,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
      {/* Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-slate-100 rounded-xl">
              {categoryIcons[offer.category] || <Tag className="w-4 h-4 text-slate-600" />}
            </span>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                {offer.category} Partner • {offer.destination}
              </span>
              <h4 className="font-bold text-slate-900 text-sm leading-snug">{offer.vendorName}</h4>
            </div>
          </div>

          {offer.badge && (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              {offer.badge}
            </span>
          )}
        </div>

        <h3 className="font-bold text-slate-900 text-base">{offer.title}</h3>
        <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
          {offer.description}
        </p>
      </div>

      {/* Pricing Comparison */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 grid grid-cols-2 gap-2">
        <div>
          <span className="text-[10px] uppercase font-semibold text-slate-500 block">Normal Price</span>
          <span className="text-sm font-bold text-slate-500 line-through">
            {formatINR(offer.normalPrice)}/person
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Individual solo walk-in</span>
        </div>

        <div className="text-right">
          <span className="text-[10px] uppercase font-bold text-emerald-600 block">
            Group Offer Price
          </span>
          <span className="text-base font-extrabold text-emerald-600">
            {formatINR(offer.groupPrice)}/person
          </span>
          <span className="text-[10px] font-semibold text-emerald-700 block mt-0.5">
            Save {formatINR(offer.potentialSaving)}/person
          </span>
        </div>
      </div>

      {/* Group Requirements */}
      <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
        <span className="flex items-center gap-1 font-medium">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          Min Group Size: <strong>{offer.minGroupSize}+ travelers</strong>
        </span>
        <span className="text-[11px] text-slate-400">{offer.validity}</span>
      </div>

      {/* Action Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        {isVendorView ? (
          <div className="flex items-center gap-2 w-full justify-between">
            <button
              type="button"
              onClick={() => onToggleStatus?.(offer.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                offer.active
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {offer.active ? 'Active Offer' : 'Paused'}
            </button>
            <button
              type="button"
              onClick={() => onDelete?.(offer.id)}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="w-full flex items-center justify-between">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Pre-approved for TERRA VISTAS groups
            </span>
            {onApplyOrInquire && (
              <button
                type="button"
                onClick={() => onApplyOrInquire(offer)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                Include in Group
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
