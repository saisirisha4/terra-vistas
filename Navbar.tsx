import React, { useState } from 'react';
import {
  Users,
  Compass,
  Calendar,
  Bell,
  Shield,
  Briefcase,
  User,
  Menu,
  X,
  Sparkles,
  Luggage,
  PlusCircle,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, params?: any) => void;
  unreadNotificationsCount: number;
  currentRole: UserRole;
  onSwitchRole: (role: UserRole) => void;
  onOpenNotifications: () => void;
  onOpenAuthModal: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  unreadNotificationsCount,
  currentRole,
  onSwitchRole,
  onOpenNotifications,
  onOpenAuthModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'destinations', label: 'Explore Destinations' },
    { id: 'planner', label: 'Trip Planner' },
    { id: 'groups', label: 'Find Groups' },
    { id: 'my-trips', label: 'My Trips' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-display">
                  TERRA VISTAS
                </span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              </div>
              <p className="text-[11px] font-semibold text-emerald-700 tracking-wide uppercase">
                Travel Together. Pay Less.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Create Group Quick Button */}
            <button
              type="button"
              onClick={() => onNavigate('create-group')}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors flex items-center gap-1.5"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Create Group</span>
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                {currentRole === 'traveler' && <User className="w-3.5 h-3.5 text-emerald-600" />}
                {currentRole === 'vendor' && <Briefcase className="w-3.5 h-3.5 text-indigo-600" />}
                {currentRole === 'admin' && <Shield className="w-3.5 h-3.5 text-purple-600" />}
                <span className="capitalize font-semibold">{currentRole} Mode</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-100">
                    Switch Prototype View
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchRole('traveler');
                      setRoleDropdownOpen(false);
                      onNavigate('traveler-dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentRole === 'traveler' ? 'font-bold text-emerald-700 bg-emerald-50/50' : 'text-slate-700'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    Traveler Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchRole('vendor');
                      setRoleDropdownOpen(false);
                      onNavigate('vendor-dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentRole === 'vendor' ? 'font-bold text-indigo-700 bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                    Vendor Dashboard
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onSwitchRole('admin');
                      setRoleDropdownOpen(false);
                      onNavigate('admin-dashboard');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-50 ${
                      currentRole === 'admin' ? 'font-bold text-purple-700 bg-purple-50/50' : 'text-slate-700'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    Admin Dashboard
                  </button>
                </div>
              )}
            </div>

            {/* Plan My Trip Primary Action */}
            <button
              type="button"
              onClick={() => onNavigate('planner')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Plan My Trip</span>
            </button>

            {/* Profile Avatar */}
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="p-1 rounded-full ring-2 ring-emerald-500/30 hover:ring-emerald-500 transition-all"
              title="Profile"
            >
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Profile"
                className="w-7 h-7 rounded-full object-cover"
              />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <Bell className="w-5 h-5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold ${
                  currentPage === link.id
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                onNavigate('create-group');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-emerald-600" />
              Create Group
            </button>
            <button
              type="button"
              onClick={() => {
                onNavigate('profile');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-slate-600" />
              My Profile
            </button>
          </div>

          {/* Role selector on mobile */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Role Switcher
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  onSwitchRole('traveler');
                  onNavigate('traveler-dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 text-xs font-semibold rounded-lg text-center ${
                  currentRole === 'traveler' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Traveler
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchRole('vendor');
                  onNavigate('vendor-dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 text-xs font-semibold rounded-lg text-center ${
                  currentRole === 'vendor' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Vendor
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchRole('admin');
                  onNavigate('admin-dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-2 text-xs font-semibold rounded-lg text-center ${
                  currentRole === 'admin' ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Admin
              </button>
            </div>
          </div>

          {/* Primary CTA */}
          <button
            type="button"
            onClick={() => {
              onNavigate('planner');
              setMobileMenuOpen(false);
            }}
            className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm text-center shadow-md"
          >
            Plan My Trip Now
          </button>
        </div>
      )}
    </header>
  );
};
