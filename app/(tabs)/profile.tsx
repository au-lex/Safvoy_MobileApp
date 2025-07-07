import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
} from 'react-native';
import { Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileData {
  name: string;
  membershipType: string;
  points: number;
  tier: string;
  travelStats: {
    totalTrips: number;
    miles: number;
    spent: number;
  };
  membershipProgress: {
    currentTier: string;
    currentPoints: number;
    nextTier: string;
    nextTierPoints: number;
    progressPercentage: number;
  };
}

interface SettingsItemProps {
  iconName: string;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ 
  iconName, 
  title, 
  subtitle, 
  rightElement, 
  onPress,
  danger = false 
}) => (
  <TouchableOpacity 
    style={[
      styles.settingsItem,
      danger && styles.dangerItem
    ]}
    onPress={onPress}
  >
    <View style={[
      styles.iconContainer,
      danger ? styles.dangerIconContainer : styles.normalIconContainer
    ]}>
      <Ionicons 
        name={iconName} 
        size={20} 
        color={danger ? '#DC2626' : '#6366F1'} 
      />
    </View>
    <View style={styles.textContainer}>
      <Text style={[
        styles.title,
        danger && styles.dangerText
      ]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
    <View style={styles.rightContainer}>
      {rightElement || (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </View>
  </TouchableOpacity>
);

const ProfileCard: React.FC<{ profileData: ProfileData }> = ({ profileData }) => (
  <View style={styles.profileCard}>
    <View style={styles.profileHeader}>
      <View style={styles.profileAvatar}>
      <Image source={{ uri: "https://i.pinimg.com/736x/10/d7/ff/10d7ff811ba1c2decd228956ad7ca56e.jpg" }} 
      style={{ width: 50, height: 50, borderRadius: 25 }}
      />

      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{profileData.name}</Text>
        <Text style={styles.membershipType}>{profileData.membershipType}</Text>
        <View style={styles.tierBadge}>
          <Ionicons name="star" size={14} color="#FCD34D" />
          <Text style={styles.tierText}>{profileData.tier}</Text>
        </View>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsValue}>{profileData.points.toLocaleString()}</Text>
        <Text style={styles.pointsLabel}>Points</Text>
      </View>
    </View>
    
    <View style={styles.progressContainer}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressTitle}>
          {profileData.membershipProgress.currentTier} → {profileData.membershipProgress.nextTier}
        </Text>
        <Text style={styles.progressPercentage}>
          {profileData.membershipProgress.progressPercentage}%
        </Text>
      </View>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${profileData.membershipProgress.progressPercentage}%` }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>
        {profileData.membershipProgress.nextTierPoints - profileData.membershipProgress.currentPoints} points to {profileData.membershipProgress.nextTier}
      </Text>
    </View>

    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Ionicons name="airplane" size={20} color="#6366F1" />
        <Text style={styles.statValue}>{profileData.travelStats.totalTrips}</Text>
        <Text style={styles.statLabel}>Trips</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="map" size={20} color="#6366F1" />
        <Text style={styles.statValue}>{profileData.travelStats.miles.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Miles</Text>
      </View>
      <View style={styles.statItem}>
        <Ionicons name="wallet" size={20} color="#6366F1" />
        <Text style={styles.statValue}>${profileData.travelStats.spent}</Text>
        <Text style={styles.statLabel}>Spent</Text>
      </View>
    </View>
  </View>
);

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [faceId, setFaceId] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  const profileData: ProfileData = {
    name: 'Alex Johnson',
    membershipType: 'Premium Member',
    points: 2450,
    tier: 'Silver',
    travelStats: {
      totalTrips: 12,
      miles: 1250,
      spent: 480,
    },
    membershipProgress: {
      currentTier: 'Silver',
      currentPoints: 2450,
      nextTier: 'Gold',
      nextTierPoints: 4000,
      progressPercentage: 65,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="settings" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>My Profile</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.section}>
          <ProfileCard profileData={profileData} />
        </View>

        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.sectionContent}>
            <SettingsItem
              iconName="person"
              title="Profile Information"
              subtitle="Update your personal details"
            />
            <SettingsItem
              iconName="location"
              title="Delivery Addresses"
              subtitle="Manage your delivery locations"
            />
            <SettingsItem
              iconName="card"
              title="Payment Methods"
              subtitle="Cards and payment options"
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          <View style={styles.sectionContent}>
            <SettingsItem
              iconName="notifications"
              title="Push Notifications"
              subtitle="Order updates and reminders"
              rightElement={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                  thumbColor="#FFFFFF"
                />
              }
            />
            <SettingsItem
              iconName="moon"
              title="Dark Mode"
              subtitle="Switch to dark theme"
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={setDarkMode}
                  trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                  thumbColor="#FFFFFF"
                />
              }
            />
            <SettingsItem
              iconName="globe"
              title="Language"
              subtitle="English (US)"
            />
            <SettingsItem
              iconName="location"
              title="Location Access"
              subtitle="For nearby pharmacy search"
              rightElement={
                <Switch
                  value={locationAccess}
                  onValueChange={setLocationAccess}
                  trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                  thumbColor="#FFFFFF"
                />
              }
            />
          </View>
        </View>

        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.sectionContent}>
            <SettingsItem
              iconName="lock-closed"
              title="Change Password"
              subtitle="Update your account password"
            />
            <SettingsItem
              iconName="phone-portrait"
              title="Face ID / Touch ID"
              subtitle="Secure app access with biometrics"
              rightElement={
                <Switch
                  value={faceId}
                  onValueChange={setFaceId}
                  trackColor={{ false: '#E5E7EB', true: '#6366F1' }}
                  thumbColor="#FFFFFF"
                />
              }
            />
           
          </View>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.sectionContent}>
            <SettingsItem
              iconName="help-circle"
              title="Help Center"
              subtitle="FAQs and support articles"
            />
            <SettingsItem
              iconName="chatbubble-ellipses"
              title="Contact Support"
              subtitle="Chat with our pharmacy team"
            />
            <SettingsItem
              iconName="information-circle"
              title="App Version"
              subtitle="v2.1.0"
            />
          </View>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          <View style={styles.sectionContent}>
            <SettingsItem
              iconName="log-out"
              title="Sign Out"
              subtitle="Log out of your account"
              danger={true}
            />
            <SettingsItem
              iconName="trash"
              title="Delete Account"
              subtitle="Permanently delete your account"
              danger={true}
            />
          </View>
        </View>

       
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#6366F1',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
    marginBottom: 16,
  },
  sectionContent: {
    gap: 12,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  dangerItem: {
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  normalIconContainer: {
    backgroundColor: '#CCFB',
    borderRadius: 8,
  },
  dangerIconContainer: {
    backgroundColor: '#FEE2E2',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
  },
  dangerText: {
    color: '#DC2626',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Lato-Regular',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 80,
  },
  // Profile Card Styles
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontFamily: 'Raleway-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  membershipType: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
    marginBottom: 6,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tierText: {
    fontSize: 12,
    fontFamily: 'Raleway-Medium',
    color: '#92400E',
    marginLeft: 4,
  },
  pointsContainer: {
    alignItems: 'center',
  },
  pointsValue: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#6366F1',
  },
  pointsLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
  },
  progressPercentage: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    color: '#6366F1',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#111827',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
    marginTop: 2,
  },
});

export default SettingsPage;