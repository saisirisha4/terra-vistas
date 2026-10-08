import React, { useState } from 'react';
import {
  PlusCircle,
  Calendar,
  Users,
  MapPin,
  Bus,
  Hotel,
  DollarSign,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Destination, TravelGroup } from '../types';
import { calculateGroupCost } from '../utils/pricing';

interface CreateGroupViewProps {
  destinations: Destination[];
  onCreateGroup: (newGroup: TravelGroup) => void;
  onNavigate: (page: string) => void;
  defaultDestination?: string;
}

export const CreateGroupView: React.FC<CreateGroupViewProps> = ({
  destinations,
  onCreateGroup,
  onNavigate,
  defaultDestination = 'Araku Valley',
}) => {
  const [destination, setDestination] = useState(defaultDestination);
  const [travelDate, setTravelDate] = useState('2026-10-24');
  const [returnDate, setReturnDate] = useState('2026-10-26');
  const [maxTravelers, setMaxTravelers] = useState<number>(30);
  const [transportPreference, setTransportPreference] = useState('Shared AC Force Traveler & Cabs');
  const [accommodationPreference, setAccommodationPreference] = useState('Hill Cottage Twin-Sharing');
  const [budget, setBudget] = useState('Moderate (₹2,500 – ₹3,500)');
  const [description, setDescription] = useState(
    'Weekend getaway to explore scenic spots, share transport, take pictures, and enjoy authentic local group meals together.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDest = destinations.find((d) => d.name === destination) || destinations[0];
    const baseCost = selectedDest.baseCost || 3800;

    // Start with 1 member (the creator)
    const calculation = calculateGroupCost(baseCost, 1);

    const newGroup: TravelGroup = {
      id: `group-custom-${Date.now()}`,
      destinationId: selectedDest.id,
      destinationName: selectedDest.name,
      destinationImage: selectedDest.image,
      travelDate,
      returnDate,
      currentMembers: 1,
      maxMembers: maxTravelers,
      baseCost,
      estimatedGroupCost: calculation.estimatedGroupCost,
      potentialSavings: calculation.potentialSavings,
      transportPreference,
      accommodationPreference,
      budget,
      description,
      creatorName: 'Sai Sirisha (You)',
      creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      createdDate: new Date().toISOString().split('T')[0],
      verified: true,
      itineraryHighlights: [
        `Day 1: Assembly at central hub, check-in, orientation walk`,
        `Day 2: Group excursion to top attractions with shared guide & transport`,
        `Day 3: Breakfast, souvenir shopping, and scenic return journey`,
      ],
      partnerOffersIncluded: [
        'Eligible for hotel group bulk discount once 10 members join',
        'Shared vehicle coach split rate',
      ],
      members: [
        {
          id: 'me-host',
          name: 'Sai Sirisha (Host)',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          city: 'Visakhapatnam',
          joinedAt: new Date().toISOString().split('T')[0],
        },
      ],
    };

    onCreateGroup(newGroup);
    onNavigate('groups');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-200">
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100/80 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
          <PlusCircle className="w-3.5 h-3.5 text-emerald-600" />
          Community Host Hub
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
          Create a Travel Group
        </h1>
        <p className="text-sm text-slate-600 max-w-xl">
          Publish your travel dates and route. As other travelers join your group, our pricing algorithm automatically unlocks tiered group rates on transport, hotels, and attractions.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Destination */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Destination
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {destinations.map((d) => (
                <option key={d.id} value={d.name}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>

          {/* Max Travelers */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-600" /> Maximum Travelers Capacity
            </label>
            <select
              value={maxTravelers}
              onChange={(e) => setMaxTravelers(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value={15}>15 Travelers (Mini Coach)</option>
              <option value={20}>20 Travelers (Medium Tempo)</option>
              <option value={30}>30 Travelers (Standard Bus)</option>
              <option value={40}>40 Travelers (Large Tourist Coach)</option>
            </select>
          </div>

          {/* Travel Date */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Travel Date
            </label>
            <input
              type="date"
              required
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Return Date */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Return Date
            </label>
            <input
              type="date"
              required
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          {/* Transport Preference */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Bus className="w-3.5 h-3.5 text-emerald-600" /> Transport Preference
            </label>
            <select
              value={transportPreference}
              onChange={(e) => setTransportPreference(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Shared AC Force Traveler & Cabs">Shared AC Force Traveler & Cabs</option>
              <option value="Dedicated Tourist Bus">Dedicated Tourist Bus</option>
              <option value="4x4 Safari Jeeps">4x4 Safari Jeeps</option>
              <option value="Train + Local Shared Autos">Train + Local Shared Autos</option>
            </select>
          </div>

          {/* Accommodation Preference */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <Hotel className="w-3.5 h-3.5 text-emerald-600" /> Accommodation Preference
            </label>
            <select
              value={accommodationPreference}
              onChange={(e) => setAccommodationPreference(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Hill Cottage Twin-Sharing">Hill Cottage Twin-Sharing</option>
              <option value="Standard 3-Star AC Hotel">Standard 3-Star AC Hotel</option>
              <option value="Eco Resort & Tents">Eco Resort & Tents</option>
              <option value="Budget Dormitory / Homestay">Budget Dormitory / Homestay</option>
            </select>
          </div>

          {/* Budget */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" /> Budget Range Per Person
            </label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Economy Saver (₹2,000 – ₹2,500)">Economy Saver (₹2,000 – ₹2,500)</option>
              <option value="Moderate (₹2,500 – ₹3,500)">Moderate (₹2,500 – ₹3,500)</option>
              <option value="Comfort Deluxe (₹3,500 – ₹4,500)">Comfort Deluxe (₹3,500 – ₹4,500)</option>
            </select>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" /> Description & Itinerary Notes
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Tell fellow travelers what you plan to see, pickup points, and vibe..."
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Group will be immediately listed in Find Groups</span>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md shadow-emerald-600/25 transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create Travel Group</span>
          </button>
        </div>
      </form>
    </div>
  );
};
