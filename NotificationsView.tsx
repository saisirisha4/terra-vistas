import React from 'react';
import { Bell, CheckCheck, Clock, ArrowLeft } from 'lucide-react';
import { NotificationItem } from '../types';
import { NotificationCard } from '../components/NotificationCard';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
  onReadNotification: (id: string) => void;
  onNavigate: (target?: { page: string; id?: string }) => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onMarkAllAsRead,
  onReadNotification,
  onNavigate,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
            <Bell className="w-3.5 h-3.5 text-emerald-600" />
            Alerts & Activity Stream
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight mt-1">
            Notifications Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time notifications regarding group price drops, joined members, and vendor deals.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-white px-3 py-2 rounded-xl border border-emerald-200 shadow-xs"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <NotificationCard
            key={n.id}
            notification={n}
            onRead={onReadNotification}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};
