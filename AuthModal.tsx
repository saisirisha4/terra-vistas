import React, { useState } from 'react';
import { Users, Shield, Briefcase, User, X, CheckCircle2, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onLoginAsRole: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onLoginAsRole,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>('traveler');
  const [email, setEmail] = useState('saisirisha@terravistas.in');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('Sai Sirisha');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginAsRole(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 font-bold p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Branding Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center mx-auto shadow-md">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-display tracking-tight mt-2">
            TERRA VISTAS
          </h2>
          <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Travel Together. Pay Less.
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1 rounded-xl mb-5 text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Role Selection for Prototype Demo */}
        <div className="mb-4 space-y-1.5">
          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
            Select Role for Prototype Demo
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { role: 'traveler', label: 'Traveler', icon: <User className="w-3.5 h-3.5" /> },
              { role: 'vendor', label: 'Vendor', icon: <Briefcase className="w-3.5 h-3.5" /> },
              { role: 'admin', label: 'Admin', icon: <Shield className="w-3.5 h-3.5" /> },
            ].map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() => setSelectedRole(item.role as UserRole)}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all flex flex-col items-center gap-1 ${
                  selectedRole === item.role
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-400 shadow-xs ring-1 ring-emerald-400'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="font-bold text-slate-700 block mb-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold"
              />
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
          >
            <span>{mode === 'login' ? `Enter as ${selectedRole}` : `Sign Up as ${selectedRole}`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-[11px] text-slate-400">
            Prototype demo mode: Fast role switching enabled.
          </span>
        </div>
      </div>
    </div>
  );
};
