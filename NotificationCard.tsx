import React from 'react';
import { Users, TrendingDown, Tag, AlertCircle, Info, Check, Clock } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationCardProps {
  notification: NotificationItem;
  onRead?: (id: string) => void;
  onNavigate?: (target?: { page: string; id?: string }) => void;
}

export const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onRead,
  onNavigate,
}) => {
  const getIcon = () => {
    switch (notification.type) {
      case 'group_joined':
        return <Users className="w-4 h-4 text-emerald-600" />;
      case 'price_drop':
        return <TrendingDown className="w-4 h-4 text-teal-600" />;
      case 'vendor_offer':
        return <Tag className="w-4 h-4 text-indigo-600" />;
      case 'capacity_alert':
        return <AlertCircle className="w-4 h-4 text-amber-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBg = () => {
    switch (notification.type) {
      case 'group_joined':
        return 'bg-emerald-50 border-emerald-100';
      case 'price_drop':
        return 'bg-teal-50 border-teal-100';
      case 'vendor_offer':
        return 'bg-indigo-50 border-indigo-100';
      case 'capacity_alert':
        return 'bg-amber-50 border-amber-100';
      default:
        return 'bg-blue-50 border-blue-100';
    }
  };

  return (
    <div
      onClick={() => {
        onRead?.(notification.id);
        if (notification.linkTarget && onNavigate) {
          onNavigate(notification.linkTarget);
        }
      }}
      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
        notification.read
          ? 'bg-white border-slate-200/80 hover:bg-slate-50/80'
          : `${getBg()} shadow-sm hover:shadow-md ring-1 ring-emerald-500/20`
      }`}
    >
      <div className={`p-2 rounded-xl shrink-0 ${notification.read ? 'bg-slate-100' : 'bg-white shadow-xs'}`}>
        {getIcon()}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4
            className={`text-sm leading-tight truncate ${
              notification.read ? 'font-semibold text-slate-800' : 'font-bold text-slate-900'
            }`}
          >
            {notification.title}
          </h4>
          <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {notification.time}
          </span>
        </div>

        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{notification.description}</p>

        {notification.linkTarget && (
          <div className="mt-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1">
            View Update Details →
          </div>
        )}
      </div>

      {!notification.read && (
        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
      )}
    </div>
  );
};
