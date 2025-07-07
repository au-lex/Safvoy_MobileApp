import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  bookingNumber: string;
  seatType: string;
  seatDetail: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  statusColor: string;
  buttonText: string;
  buttonAction: string;
}

interface QuickAction {
  id: number;
  title: string;
  icon: string;
  iconColor: string;
  backgroundColor: string;
  action: string;
}

const MyTicketsPage: React.FC = () => {
  const upcomingTrips: Trip[] = [
    {
      id: '1',
      from: 'NYC',
      to: 'Boston',
      date: 'Apr 15, 2025',
      time: '10:30 AM',
      bookingNumber: '#BG78945',
      seatType: 'Premium Seat',
      seatDetail: 'Window',
      status: 'confirmed',
      statusColor: '#10B981',
      buttonText: 'View Ticket',
      buttonAction: 'view',
    },
    {
      id: '2',
      from: 'DC',
      to: 'Philly',
      date: 'Apr 22, 2025',
      time: '8:15 AM',
      bookingNumber: '#BG79012',
      seatType: 'Standard Seat',
      seatDetail: 'Aisle',
      status: 'pending',
      statusColor: '#F59E0B',
      buttonText: 'Complete Payment',
      buttonAction: 'payment',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      id: 1,
      title: 'Show Ticket QR',
      icon: 'qr-code',
      iconColor: '#FFFFFF',
      backgroundColor: '#8B5CF6',
      action: 'qr',
    },
    {
      id: 2,
      title: 'Book New Trip',
      icon: 'add-circle',
      iconColor: '#FFFFFF',
      backgroundColor: '#10B981',
      action: 'book',
    },
    {
      id: 3,
      title: 'Cancel Booking',
      icon: 'close-circle',
      iconColor: '#FFFFFF',
      backgroundColor: '#EF4444',
      action: 'cancel',
    },
    {
      id: 4,
      title: 'Modify Trip',
      icon: 'swap-horizontal',
      iconColor: '#FFFFFF',
      backgroundColor: '#F97316',
      action: 'modify',
    },
  ];

  const handleTripAction = (trip: Trip) => {
    if (trip.buttonAction === 'view') {
      Alert.alert('Ticket Details', `Viewing ticket for ${trip.bookingNumber}`);
    } else if (trip.buttonAction === 'payment') {
      Alert.alert('Payment', `Complete payment for ${trip.bookingNumber}`);
    }
  };

  const handleQuickAction = (action: QuickAction) => {
    switch (action.action) {
      case 'qr':
        Alert.alert('QR Code', 'Displaying ticket QR code');
        break;
      case 'book':
        Alert.alert('New Trip', 'Booking new trip');
        break;
      case 'cancel':
        Alert.alert('Cancel Booking', 'Are you sure you want to cancel?');
        break;
      case 'modify':
        Alert.alert('Modify Trip', 'Modify existing trip');
        break;
      default:
        break;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366F1" />
      
      {/* Header */}
      <LinearGradient
        colors={['#6366F1', '#8B5CF6']}
        style={styles.header}
      >
    
        <Text style={styles.headerTitle}>My Tickets</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </LinearGradient>
           {/* Quick Actions Section */}
           <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => handleQuickAction(action)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.backgroundColor }]}>
                  <Ionicons name={action.icon as any} size={24} color={action.iconColor} />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Upcoming Trips Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Upcoming Trips</Text>
          
          {upcomingTrips.map((trip) => (
            <View key={trip.id} style={styles.tripCard}>
              <View style={styles.tripHeader}>
                <View style={styles.routeContainer}>
                  <Text style={styles.fromCity}>{trip.from}</Text>
                  <Ionicons name="arrow-forward" size={16} color="#6B7280" />
                  <Text style={styles.toCity}>{trip.to}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: trip.statusColor }]}>
                  <Text style={styles.statusText}>{getStatusText(trip.status)}</Text>
                </View>
              </View>

              <View style={styles.tripDetails}>
                <View style={styles.detailRow}>
                  <View style={styles.detailItem}>
                    <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                    <Text style={styles.detailText}>{trip.date}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Ionicons name="time-outline" size={16} color="#6B7280" />
                    <Text style={styles.detailText}>{trip.time}</Text>
                  </View>
                </View>

                <View style={styles.bookingInfo}>
                  <Text style={styles.bookingNumber}>Booking {trip.bookingNumber}</Text>
                  <Text style={styles.seatInfo}>
                    {trip.seatType} • {trip.seatDetail}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleTripAction(trip)}
              >
                <Text style={styles.actionButtonText}>{trip.buttonText}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

   

   

        {/* <View style={styles.bottomPadding} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 20,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
  fontFamily: 'Raleway-Bold',
    color: '#FFFFFF',
  },
  searchButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: '#6366F1',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#6366F1',
    fontFamily: 'Raleway-Medium',
  },
  tripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
borderWidth: 1,
borderColor: '#E5E7EB',
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  routeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fromCity: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: '#6366F1',
    marginRight: 8,
  },
  toCity: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
    color: '#FFFFFF',
  },
  tripDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
    fontFamily:"Lato-Regular"
  },
  bookingInfo: {
    marginTop: 8,
  },
  bookingNumber: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
    marginBottom: 4,
  },
  seatInfo: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily:"Lato-Regular"
  },
  actionButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#FFFFFF',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
borderWidth: 1,
borderColor: '#E5E7EB',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
    textAlign: 'center',
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 100,
  },
});

export default MyTicketsPage;