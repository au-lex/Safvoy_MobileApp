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
import { Ionicons } from '@expo/vector-icons';

interface SettingsItemProps {
  iconName: string;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}

const SettingsItem : React.FC<SettingsItemProps> = ({ 
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
        color={danger ? '#DC2626' : '#0D9488'} 
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

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [faceId, setFaceId] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="settings" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.headerTitle}>Settings</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
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
                  trackColor={{ false: '#E5E7EB', true: '#0D9488' }}
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
                  trackColor={{ false: '#E5E7EB', true: '#0D9488' }}
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
                  trackColor={{ false: '#E5E7EB', true: '#0D9488' }}
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
                  trackColor={{ false: '#E5E7EB', true: '#0D9488' }}
                  thumbColor="#FFFFFF"
                />
              }
            />
            <SettingsItem
              iconName="shield-checkmark"
              title="Privacy Policy"
              subtitle="How we handle your data"
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

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
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
    backgroundColor: '#0D9488',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
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
    fontFamily: 'Nunito-SemiBold',
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
    backgroundColor: '#CCFBF1',
  },
  dangerIconContainer: {
    backgroundColor: '#FEE2E2',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#111827',
  },
  dangerText: {
    color: '#DC2626',
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    fontFamily: 'Nunito-Regular',
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 80,
  },
});

export default SettingsPage;