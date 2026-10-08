export type UserRole = 'traveler' | 'vendor' | 'admin';

export interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  city: string;
  joinedAt: string;
}

export interface TravelGroup {
  id: string;
  destinationId: string;
  destinationName: string;
  destinationImage: string;
  travelDate: string;
  returnDate: string;
  currentMembers: number;
  maxMembers: number;
  baseCost: number;
  estimatedGroupCost: number;
  potentialSavings: number;
  transportPreference: string;
  accommodationPreference: string;
  budget: string;
  description: string;
  creatorName: string;
  creatorAvatar: string;
  createdDate: string;
  verified: boolean;
  itineraryHighlights: string[];
  partnerOffersIncluded: string[];
  members: GroupMember[];
}

export interface DestinationAttraction {
  name: string;
  tag: string;
  description: string;
  estimatedSoloCost: number;
  estimatedGroupCost: number;
  image?: string;
}

export interface MapPoint {
  id: string;
  name: string;
  category: 'attraction' | 'hotel' | 'restaurant' | 'meeting';
  description: string;
  discountNote?: string;
  x: number; // percentage coordinates 0-100 on mock interactive map canvas
  y: number;
  rating: number;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  image: string;
  description: string;
  popularAttractions: DestinationAttraction[];
  bestTime: string;
  travelInfo: {
    nearestStation: string;
    nearestAirport: string;
    localTransportModes: string;
    weather: string;
  };
  baseCost: number;
  partnerOffersCount: number;
  mapPoints: MapPoint[];
}

export interface CostBreakdownItem {
  category: string;
  soloCost: number;
  groupCost: number;
  savings: number;
  iconName: string;
}

export interface Trip {
  id: string;
  groupId: string;
  destination: string;
  destinationImage: string;
  travelDate: string;
  returnDate: string;
  membersCount: number;
  maxMembers: number;
  estimatedPrice: number;
  potentialSavings: number;
  status: 'upcoming' | 'ongoing' | 'completed';
  bookedDate: string;
  bookingRef: string;
  transportMode: string;
}

export interface VendorOffer {
  id: string;
  vendorId: string;
  vendorName: string;
  category: 'Hotel' | 'Restaurant' | 'Transport' | 'Attraction' | 'Activity';
  destination: string;
  title: string;
  normalPrice: number;
  groupPrice: number;
  minGroupSize: number;
  potentialSaving: number;
  description: string;
  active: boolean;
  validity: string;
  badge?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'group_joined' | 'price_drop' | 'vendor_offer' | 'capacity_alert' | 'system';
  linkTarget?: {
    page: string;
    id?: string;
  };
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  phone: string;
  homeCity: string;
  bio: string;
  travelStyle: string;
  joinedGroupsCount: number;
  totalSaved: number;
  upcomingTripsCount: number;
  badges: string[];
}
