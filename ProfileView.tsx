import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Save
} from 'lucide-react';
import { UserProfile } from '../types';
import { formatINR } from '../utils/pricing';

interface ProfileViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onNavigate: (page: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProfile,
  onUpdateProfile,
  onNavigate,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [phone, setPhone] = useState(userProfile.phone);
  const [homeCity, setHomeCity] = useState(userProfile.homeCity);
  const [bio, setBio] = useState(userProfile.bio);
  const [travelStyle, setTravelStyle] = useState(userProfile.travelStyle);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...userProfile,
      name,
      phone,
      homeCity,
      bio,
      travelStyle,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 font-display tracking-tight">
          Traveler Profile
        </h1>
        <p className="text-xs text-slate-500">
          Manage your verified community identity, travel preferences, and view earned badges.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/20 shadow-md"
          />
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-slate-900">{userProfile.name}</h2>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500">{userProfile.email} • {userProfile.homeCity}</p>
            <div className="pt-1 flex flex-wrap gap-1.5 justify-center sm:justify-start">
              {userProfile.badges.map((b) => (
                <span
                  key={b}
                  className="bg-slate-100 text-slate-700 text-[11px] font-semibold px-2 py-0.5 rounded-md"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 rounded-2xl p-4 border border-slate-100 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Groups Joined</span>
            <span className="text-xl font-black text-slate-900 mt-0.5 block">{userProfile.joinedGroupsCount}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Total Saved</span>
            <span className="text-xl font-black text-emerald-700 mt-0.5 block">{formatINR(userProfile.totalSaved)}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Upcoming Trips</span>
            <span className="text-xl font-black text-slate-900 mt-0.5 block">{userProfile.upcomingTripsCount}</span>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Home City</label>
              <input
                type="text"
                value={homeCity}
                onChange={(e) => setHomeCity(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Travel Style</label>
              <input
                type="text"
                value={travelStyle}
                onChange={(e) => setTravelStyle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Bio & Community Note</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-800"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            {savedSuccess && (
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
              </span>
            )}
            <div className="ml-auto">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Profile Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
