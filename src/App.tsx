import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Destination,
  TravelGroup,
  VendorOffer,
  NotificationItem,
  UserProfile,
  Trip,
  UserRole
} from './types';
import {
  INITIAL_DESTINATIONS,
  INITIAL_GROUPS,
  INITIAL_VENDOR_OFFERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_USER_PROFILE,
  INITIAL_TRIPS
} from './data/mockData';
import { calculateGroupCost, formatINR } from './utils/pricing';

// Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AITravelAssistant } from './components/AITravelAssistant';

// Views
import { HomeView } from './views/HomeView';
import { TripPlannerView } from './views/TripPlannerView';
import { FindGroupsView } from './views/FindGroupsView';
import { GroupDetailsView } from './views/GroupDetailsView';
import { CreateGroupView } from './views/CreateGroupView';
import { DestinationDetailsView } from './views/DestinationDetailsView';
import { TravelerDashboardView } from './views/TravelerDashboardView';
import { VendorDashboardView } from './views/VendorDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { ExploreDestinationsView } from './views/ExploreDestinationsView';
import { MyTripsView } from './views/MyTripsView';
import { NotificationsView } from './views/NotificationsView';
import { ProfileView } from './views/ProfileView';
import { AuthModal } from './views/AuthModal';

export default function App() {
  // Persistence with localStorage
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem('terravistas_destinations');
    return saved ? JSON.parse(saved) : INITIAL_DESTINATIONS;
  });

  const [groups, setGroups] = useState<TravelGroup[]>(() => {
    const saved = localStorage.getItem('terravistas_groups');
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  const [vendorOffers, setVendorOffers] = useState<VendorOffer[]>(() => {
    const saved = localStorage.getItem('terravistas_vendor_offers');
    return saved ? JSON.parse(saved) : INITIAL_VENDOR_OFFERS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('terravistas_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [trips, setTrips] = useState<Trip[]>(() => {
    const saved = localStorage.getItem('terravistas_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('terravistas_user_profile');
    return saved ? JSON.parse(saved) : INITIAL_USER_PROFILE;
  });

  const [joinedGroupIds, setJoinedGroupIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('terravistas_joined_group_ids');
    return saved ? JSON.parse(saved) : ['vizag-oct25-group'];
  });

  const [recentActivities, setRecentActivities] = useState<string[]>([
    'Joined Visakhapatnam Coastline Group',
    'Estimated group cost decreased by ₹200 for Araku group',
    'Haritha Valley Resort added 30% group cottage offer',
  ]);

  // Routing State
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedGroup, setSelectedGroup] = useState<TravelGroup | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [plannerParams, setPlannerParams] = useState<{
    destination?: string;
    date?: string;
    travelers?: number;
  }>({});

  // Auth & Roles
  const [currentRole, setCurrentRole] = useState<UserRole>('traveler');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  // Success Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('terravistas_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('terravistas_vendor_offers', JSON.stringify(vendorOffers));
  }, [vendorOffers]);

  useEffect(() => {
    localStorage.setItem('terravistas_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('terravistas_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('terravistas_joined_group_ids', JSON.stringify(joinedGroupIds));
  }, [joinedGroupIds]);

  useEffect(() => {
    localStorage.setItem('terravistas_user_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Scroll to top on navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedGroup, selectedDestination]);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // MAIN JOIN GROUP LOGIC (Exact flow required by brief)
  const handleJoinGroup = (groupToJoin: TravelGroup) => {
    if (joinedGroupIds.includes(groupToJoin.id)) {
      triggerToast(`You are already a confirmed traveler in ${groupToJoin.destinationName} group!`);
      return;
    }

    if (groupToJoin.currentMembers >= groupToJoin.maxMembers) {
      triggerToast('This group is currently at maximum capacity.');
      return;
    }

    const newMemberCount = groupToJoin.currentMembers + 1;
    // Recalculate dynamic cost & savings
    const calc = calculateGroupCost(groupToJoin.baseCost, newMemberCount);

    // 1. Update group list with increased members & updated cost
    const updatedGroups = groups.map((g) => {
      if (g.id === groupToJoin.id) {
        const updatedGroup: TravelGroup = {
          ...g,
          currentMembers: newMemberCount,
          estimatedGroupCost: calc.estimatedGroupCost,
          potentialSavings: calc.potentialSavings,
          members: [
            ...g.members,
            {
              id: `user-${Date.now()}`,
              name: `${userProfile.name} (You)`,
              avatar: userProfile.avatar,
              city: userProfile.homeCity.split(',')[0],
              joinedAt: new Date().toISOString().split('T')[0],
            },
          ],
        };
        // Also sync selectedGroup if currently in details view
        if (selectedGroup?.id === g.id) {
          setSelectedGroup(updatedGroup);
        }
        return updatedGroup;
      }
      return g;
    });

    setGroups(updatedGroups);

    // 2. Add to joined list
    setJoinedGroupIds((prev) => [...prev, groupToJoin.id]);

    // 3. Add to user's trips
    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      groupId: groupToJoin.id,
      destination: groupToJoin.destinationName,
      destinationImage: groupToJoin.destinationImage,
      travelDate: groupToJoin.travelDate,
      returnDate: groupToJoin.returnDate,
      membersCount: newMemberCount,
      maxMembers: groupToJoin.maxMembers,
      estimatedPrice: calc.estimatedGroupCost,
      potentialSavings: calc.potentialSavings,
      status: 'upcoming',
      bookedDate: new Date().toLocaleDateString('en-IN', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      bookingRef: `TV-${groupToJoin.destinationName.slice(0, 2).toUpperCase()}-${Math.floor(
        10000 + Math.random() * 90000
      )}`,
      transportMode: groupToJoin.transportPreference,
    };
    setTrips((prev) => [newTrip, ...prev]);

    // 4. Update user profile stats
    setUserProfile((prev) => ({
      ...prev,
      joinedGroupsCount: prev.joinedGroupsCount + 1,
      totalSaved: prev.totalSaved + calc.potentialSavings,
      upcomingTripsCount: prev.upcomingTripsCount + 1,
    }));

    // 5. Update recent activities
    setRecentActivities((prev) => [
      `Joined ${groupToJoin.destinationName} Group (${newMemberCount}/${groupToJoin.maxMembers})`,
      `Estimated group cost updated to ${formatINR(calc.estimatedGroupCost)}`,
      ...prev.slice(0, 5),
    ]);

    // 6. Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Joined ${groupToJoin.destinationName} Group!`,
      description: `You are confirmed! Group size grew to ${newMemberCount}/${groupToJoin.maxMembers}. Estimated cost per person is now ${formatINR(
        calc.estimatedGroupCost
      )} (Save ${formatINR(calc.potentialSavings)}).`,
      time: 'Just now',
      read: false,
      type: 'group_joined',
      linkTarget: { page: 'traveler-dashboard' },
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // 7. Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#14b8a6', '#06b6d4', '#f59e0b'],
      });
    } catch (e) {
      // safe fallback
    }

    triggerToast(
      `🎉 Joined! Group count increased to ${newMemberCount}/${groupToJoin.maxMembers}. Estimated cost: ${formatINR(
        calc.estimatedGroupCost
      )}`
    );
  };

  // CREATE GROUP
  const handleCreateGroup = (newGroup: TravelGroup) => {
    setGroups((prev) => [newGroup, ...prev]);
    setJoinedGroupIds((prev) => [...prev, newGroup.id]);

    const newTrip: Trip = {
      id: `trip-${Date.now()}`,
      groupId: newGroup.id,
      destination: newGroup.destinationName,
      destinationImage: newGroup.destinationImage,
      travelDate: newGroup.travelDate,
      returnDate: newGroup.returnDate,
      membersCount: 1,
      maxMembers: newGroup.maxMembers,
      estimatedPrice: newGroup.baseCost,
      potentialSavings: 0,
      status: 'upcoming',
      bookedDate: 'Today',
      bookingRef: `TV-${newGroup.destinationName.slice(0, 2).toUpperCase()}-HOST`,
      transportMode: newGroup.transportPreference,
    };
    setTrips((prev) => [newTrip, ...prev]);

    setRecentActivities((prev) => [
      `Created new travel group for ${newGroup.destinationName}`,
      ...prev.slice(0, 5),
    ]);

    triggerToast(`Group for ${newGroup.destinationName} created successfully!`);
  };

  // VENDOR ACTIONS
  const handleAddVendorOffer = (offer: VendorOffer) => {
    setVendorOffers((prev) => [offer, ...prev]);
    triggerToast(`Group offer "${offer.title}" published!`);
  };

  const handleDeleteVendorOffer = (offerId: string) => {
    setVendorOffers((prev) => prev.filter((o) => o.id !== offerId));
    triggerToast('Offer removed.');
  };

  const handleToggleOfferStatus = (offerId: string) => {
    setVendorOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, active: !o.active } : o))
    );
  };

  // ADMIN ACTIONS
  const handleDeleteGroup = (groupId: string) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
    triggerToast('Group deleted by administrator.');
  };

  // NAVIGATION ROUTER
  const handleNavigate = (page: string, params?: any) => {
    if (params) {
      if (params.destination || params.date || params.travelers) {
        setPlannerParams(params);
      }
    }
    setCurrentPage(page);
  };

  const handleViewGroupDetails = (group: TravelGroup) => {
    setSelectedGroup(group);
    const dest = destinations.find((d) => d.id === group.destinationId || d.name === group.destinationName);
    if (dest) setSelectedDestination(dest);
    setCurrentPage('group-details');
  };

  const handleSelectDestination = (dest: Destination) => {
    setSelectedDestination(dest);
    setCurrentPage('destination-details');
  };

  const handleNotificationNavigation = (target?: { page: string; id?: string }) => {
    if (!target) return;
    if (target.page === 'group-details' && target.id) {
      const g = groups.find((grp) => grp.id === target.id);
      if (g) {
        handleViewGroupDetails(g);
        return;
      }
    }
    if (target.page === 'destination-details' && target.id) {
      const d = destinations.find((dest) => dest.id === target.id);
      if (d) {
        handleSelectDestination(d);
        return;
      }
    }
    setCurrentPage(target.page);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-3 animate-in slide-in-from-top-3 max-w-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <p className="text-xs sm:text-sm font-semibold">{toastMessage}</p>
        </div>
      )}

      {/* Primary Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        unreadNotificationsCount={unreadCount}
        currentRole={currentRole}
        onSwitchRole={(role) => {
          setCurrentRole(role);
          if (role === 'traveler') setCurrentPage('traveler-dashboard');
          else if (role === 'vendor') setCurrentPage('vendor-dashboard');
          else if (role === 'admin') setCurrentPage('admin-dashboard');
        }}
        onOpenNotifications={() => setCurrentPage('notifications')}
        onOpenAuthModal={(mode) => {
          setAuthModalMode(mode);
          setAuthModalOpen(true);
        }}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomeView
            destinations={destinations}
            groups={groups}
            vendorOffers={vendorOffers}
            onNavigate={handleNavigate}
            onJoinGroup={handleJoinGroup}
            onViewGroupDetails={handleViewGroupDetails}
            onSelectDestination={handleSelectDestination}
            joinedGroupIds={joinedGroupIds}
          />
        )}

        {currentPage === 'destinations' && (
          <ExploreDestinationsView
            destinations={destinations}
            groups={groups}
            onSelectDestination={handleSelectDestination}
            onPlanTrip={(destName) => handleNavigate('planner', { destination: destName })}
          />
        )}

        {currentPage === 'planner' && (
          <TripPlannerView
            destinations={destinations}
            groups={groups}
            initialDestination={plannerParams.destination || 'Araku Valley'}
            initialDate={plannerParams.date || '2026-10-20'}
            initialTravelers={plannerParams.travelers || 1}
            onJoinGroup={handleJoinGroup}
            onViewGroupDetails={handleViewGroupDetails}
            onNavigate={handleNavigate}
            joinedGroupIds={joinedGroupIds}
          />
        )}

        {currentPage === 'groups' && (
          <FindGroupsView
            groups={groups}
            destinations={destinations}
            onJoinGroup={handleJoinGroup}
            onViewGroupDetails={handleViewGroupDetails}
            onNavigate={handleNavigate}
            joinedGroupIds={joinedGroupIds}
          />
        )}

        {currentPage === 'group-details' && selectedGroup && (
          <GroupDetailsView
            group={selectedGroup}
            destinationObj={selectedDestination || undefined}
            onJoinGroup={handleJoinGroup}
            onBack={() => setCurrentPage('groups')}
            isJoined={joinedGroupIds.includes(selectedGroup.id)}
          />
        )}

        {currentPage === 'create-group' && (
          <CreateGroupView
            destinations={destinations}
            onCreateGroup={handleCreateGroup}
            onNavigate={handleNavigate}
            defaultDestination={plannerParams.destination || 'Araku Valley'}
          />
        )}

        {currentPage === 'destination-details' && selectedDestination && (
          <DestinationDetailsView
            destination={selectedDestination}
            allDestinations={destinations}
            groups={groups}
            vendorOffers={vendorOffers}
            onBack={() => setCurrentPage('destinations')}
            onJoinGroup={handleJoinGroup}
            onViewGroupDetails={handleViewGroupDetails}
            onPlanTrip={(destName) => handleNavigate('planner', { destination: destName })}
            joinedGroupIds={joinedGroupIds}
          />
        )}

        {currentPage === 'traveler-dashboard' && (
          <TravelerDashboardView
            userProfile={userProfile}
            trips={trips}
            groups={groups}
            joinedGroupIds={joinedGroupIds}
            recentActivities={recentActivities}
            onNavigate={handleNavigate}
            onViewGroupDetails={handleViewGroupDetails}
          />
        )}

        {currentPage === 'vendor-dashboard' && (
          <VendorDashboardView
            vendorOffers={vendorOffers}
            groups={groups}
            onAddOffer={handleAddVendorOffer}
            onDeleteOffer={handleDeleteVendorOffer}
            onToggleOfferStatus={handleToggleOfferStatus}
          />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboardView
            groups={groups}
            destinations={destinations}
            vendorOffers={vendorOffers}
            userProfile={userProfile}
            onDeleteGroup={handleDeleteGroup}
            onViewGroupDetails={handleViewGroupDetails}
            onToggleOfferStatus={handleToggleOfferStatus}
          />
        )}

        {currentPage === 'my-trips' && (
          <MyTripsView
            trips={trips}
            groups={groups}
            onViewGroupDetails={handleViewGroupDetails}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'notifications' && (
          <NotificationsView
            notifications={notifications}
            onMarkAllAsRead={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
            onReadNotification={(id) =>
              setNotifications((prev) =>
                prev.map((n) => (n.id === id ? { ...n, read: true } : n))
              )
            }
            onNavigate={handleNotificationNavigation}
          />
        )}

        {currentPage === 'profile' && (
          <ProfileView
            userProfile={userProfile}
            onUpdateProfile={setUserProfile}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global AI Travel Assistant Widget */}
      <AITravelAssistant
        currentDestination={selectedDestination?.name || 'Araku Valley'}
        onSelectDestination={(destName) => handleNavigate('planner', { destination: destName })}
      />

      {/* Global Prototype Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authModalMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginAsRole={(role) => {
          setCurrentRole(role);
          if (role === 'traveler') setCurrentPage('traveler-dashboard');
          else if (role === 'vendor') setCurrentPage('vendor-dashboard');
          else if (role === 'admin') setCurrentPage('admin-dashboard');
          triggerToast(`Signed in as ${role}`);
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
