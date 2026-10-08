import React from 'react';
import { Users, Shield, Heart, Sparkles, MapPin, Compass, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 mt-20">
      {/* Value Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 border-b border-emerald-900/40 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full mb-3 border border-emerald-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              THE CORE FORMULA OF GROUP TRAVEL
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight font-display">
              MORE TRAVELERS → BETTER GROUP OFFERS → LOWER ESTIMATED COST PER PERSON
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Connect with travelers going to the same destination and unlock better group travel opportunities across transport, hotels, meals, and tourist passes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('planner')}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all shadow-lg shadow-emerald-500/20 hover:scale-105 flex items-center gap-2"
          >
            Start Planning
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white font-display">
                  TERRA VISTAS
                </span>
                <span className="block text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  Travel Together. Pay Less.
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Connect with travelers going to the same destination and unlock better group travel opportunities.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@terravistas.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+91 (0891) 400-TERRA</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Visakhapatnam & Hyderabad Hubs, India</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('destinations')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  All Destinations (8 Hubs)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('groups')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Find Active Groups
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('planner')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Smart Trip Planner
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('create-group')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Create Travel Group
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Dashboards */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Platform Roles
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('traveler-dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Traveler Dashboard
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('vendor-dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Vendor Partner Portal
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('admin-dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Admin Oversight Console
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('my-trips')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  My Trips & Bookings
                </button>
              </li>
            </ul>
          </div>

          {/* Pricing Economics */}
          <div>
            <h4 className="font-bold text-sm text-white uppercase tracking-wider mb-4">
              Group Economics
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>• Diminishing-discount logic</li>
              <li>• Shared coach transport savings</li>
              <li>• Partner hotel bulk tariff</li>
              <li>• Group banquet dining deals</li>
              <li>• Verified attraction entry passes</li>
              <li className="text-emerald-400 font-semibold">• All currency in Indian Rupees (₹)</li>
            </ul>
          </div>
        </div>

        {/* Prototype Disclaimer Banner */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
          <p className="leading-relaxed">
            <strong className="text-slate-200">Prototype Disclaimer:</strong> Prices shown are prototype estimates. Actual costs and savings depend on availability, group size, destination, travel dates, partner offers and service-provider pricing. Normal train tickets do not automatically become cheaper simply because more people join.
          </p>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 TERRA VISTAS. All rights reserved. Travel Together. Pay Less.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Currency: ₹ INR</span>
            <span>•</span>
            <span className="text-emerald-400">MVP Prototype Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
