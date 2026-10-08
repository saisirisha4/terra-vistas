import React, { useState } from 'react';
import { MapPin, Hotel, Utensils, Compass, Users, Star, Layers, Navigation, Info, ShieldCheck } from 'lucide-react';
import { Destination, MapPoint } from '../types';

interface InteractiveMapProps {
  destination: Destination;
  allDestinations?: Destination[];
  onSelectDestination?: (dest: Destination) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  destination,
  allDestinations = [],
  onSelectDestination,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'attraction' | 'hotel' | 'restaurant' | 'meeting'>('all');
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(
    destination.mapPoints[0] || null
  );
  const [mapStyle, setMapStyle] = useState<'terrain' | 'roadmap'>('terrain');

  const filteredPoints = destination.mapPoints.filter((pt) => {
    if (activeCategory === 'all') return true;
    return pt.category === activeCategory;
  });

  const getPinIcon = (cat: MapPoint['category']) => {
    switch (cat) {
      case 'attraction':
        return <Compass className="w-3.5 h-3.5" />;
      case 'hotel':
        return <Hotel className="w-3.5 h-3.5" />;
      case 'restaurant':
        return <Utensils className="w-3.5 h-3.5" />;
      case 'meeting':
        return <Users className="w-3.5 h-3.5" />;
    }
  };

  const getPinColor = (cat: MapPoint['category'], isSelected: boolean) => {
    if (isSelected) return 'bg-amber-500 text-white ring-4 ring-amber-300 scale-125 z-30';
    switch (cat) {
      case 'attraction':
        return 'bg-purple-600 text-white ring-2 ring-white hover:bg-purple-700';
      case 'hotel':
        return 'bg-indigo-600 text-white ring-2 ring-white hover:bg-indigo-700';
      case 'restaurant':
        return 'bg-amber-600 text-white ring-2 ring-white hover:bg-amber-700';
      case 'meeting':
        return 'bg-emerald-600 text-white ring-2 ring-white hover:bg-emerald-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
      {/* Map Control Bar */}
      <div className="p-4 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <Navigation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">{destination.name} Explorer Map</h3>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded text-emerald-400 font-semibold">
                Interactive Pins
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Meeting hubs, hotels, restaurants & attractions with verified group perks
            </p>
          </div>
        </div>

        {/* Destination Quick Selector */}
        {allDestinations.length > 0 && onSelectDestination && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Destination:</span>
            <select
              value={destination.id}
              onChange={(e) => {
                const found = allDestinations.find((d) => d.id === e.target.value);
                if (found) {
                  onSelectDestination(found);
                  setSelectedPoint(found.mapPoints[0] || null);
                }
              }}
              className="bg-slate-800 border border-slate-700 text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {allDestinations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2.5 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all ${
              activeCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Points ({destination.mapPoints.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('attraction')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
              activeCategory === 'attraction'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-purple-50'
            }`}
          >
            <Compass className="w-3.5 h-3.5" /> Attractions
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('hotel')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
              activeCategory === 'hotel'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-indigo-50'
            }`}
          >
            <Hotel className="w-3.5 h-3.5" /> Hotels
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('restaurant')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
              activeCategory === 'restaurant'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-amber-50'
            }`}
          >
            <Utensils className="w-3.5 h-3.5" /> Restaurants
          </button>
          <button
            type="button"
            onClick={() => setActiveCategory('meeting')}
            className={`px-3 py-1 rounded-lg font-semibold transition-all flex items-center gap-1 ${
              activeCategory === 'meeting'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-emerald-50'
            }`}
          >
            <Users className="w-3.5 h-3.5" /> Meeting Points
          </button>
        </div>

        {/* Map Type Switch */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setMapStyle('terrain')}
            className={`px-2 py-0.5 rounded font-medium ${
              mapStyle === 'terrain' ? 'bg-slate-800 text-white' : 'text-slate-600'
            }`}
          >
            Terrain
          </button>
          <button
            type="button"
            onClick={() => setMapStyle('roadmap')}
            className={`px-2 py-0.5 rounded font-medium ${
              mapStyle === 'roadmap' ? 'bg-slate-800 text-white' : 'text-slate-600'
            }`}
          >
            Roads
          </button>
        </div>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative h-[340px] sm:h-[400px] w-full overflow-hidden select-none bg-emerald-950">
        {/* Map Surface Background */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            mapStyle === 'terrain'
              ? 'opacity-85 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-800 via-emerald-900 to-slate-900'
              : 'opacity-90 bg-slate-800'
          }`}
        >
          {/* Subtle Grid and Topography Contour Lines SVG */}
          <svg className="w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Topographic organic curves */}
            <path
              d="M 0 100 Q 150 50 300 120 T 600 90 T 900 180 T 1200 110"
              fill="none"
              stroke="#6ee7b7"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <path
              d="M 0 220 Q 200 280 450 200 T 800 240 T 1200 210"
              fill="none"
              stroke="#a7f3d0"
              strokeWidth="1.5"
            />
            <path
              d="M 0 320 Q 250 280 500 350 T 950 310 T 1200 340"
              fill="none"
              stroke="#34d399"
              strokeWidth="1"
            />
          </svg>
        </div>

        {/* Scenic Map Labels */}
        <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
            GPS Zone
          </span>
          <span className="font-bold">{destination.name} Regional Cluster</span>
        </div>

        {/* Interactive Map Pins */}
        {filteredPoints.map((point) => {
          const isSelected = selectedPoint?.id === point.id;
          return (
            <button
              key={point.id}
              type="button"
              onClick={() => setSelectedPoint(point)}
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-200 cursor-pointer ${getPinColor(
                point.category,
                isSelected
              )}`}
              title={point.name}
            >
              {getPinIcon(point.category)}
            </button>
          );
        })}

        {/* Interactive Selected Point Card Overlay */}
        {selectedPoint && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white/95 backdrop-blur-md rounded-xl p-3.5 shadow-xl border border-slate-200/90 z-40 transition-all animate-fadeIn">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="text-xs uppercase font-extrabold text-slate-500 tracking-wider">
                  {selectedPoint.category.toUpperCase()}
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {selectedPoint.rating}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoint(null)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <h4 className="font-bold text-slate-900 text-sm mt-1">{selectedPoint.name}</h4>
            <p className="text-xs text-slate-600 mt-0.5">{selectedPoint.description}</p>

            {selectedPoint.discountNote && (
              <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {selectedPoint.discountNote}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Pin Listing Below */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 bg-slate-50 border-t border-slate-200">
        {filteredPoints.map((pt) => (
          <div
            key={pt.id}
            onClick={() => setSelectedPoint(pt)}
            className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
              selectedPoint?.id === pt.id
                ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm'
                : 'bg-white border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-slate-500 capitalize">{pt.category}</span>
              <span className="text-amber-500 font-bold flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-amber-400" /> {pt.rating}
              </span>
            </div>
            <h5 className="font-bold text-slate-900 text-xs truncate">{pt.name}</h5>
            {pt.discountNote && (
              <span className="text-[11px] text-emerald-600 font-semibold block mt-1 truncate">
                • {pt.discountNote}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
