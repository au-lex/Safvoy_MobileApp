
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  onSearchChange?: (text: string) => void;
  onNotificationPress?: () => void;
  onFilterPress?: () => void;
  onProfilePress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  userName = 'Jenny',
  userAvatar = 'https://i.pinimg.com/736x/bf/12/ad/bf12ad888eb115082f7863c9711cbcc9.jpg',
  onSearchChange,
  onNotificationPress,
  onFilterPress,
  onProfilePress,
}) => {
  const [searchFocused, setSearchFocused] = useState(false);
  const [notificationCount] = useState(3); // You can make this dynamic

  // Get greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

    const router = useRouter();
    const notifcation  = () => {
        router.push('/notification/Notification');
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* User Profile Section */}
        <TouchableOpacity 
          style={styles.profileSection}
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <View style={styles.avatarContainer}>
            {userAvatar ? (
              <Image source={{ uri: userAvatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={24} color="#fff" />
              </View>
            )}
            {/* Online status indicator */}
            <View style={styles.onlineIndicator} />
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>
              {getGreeting()}, {userName}! 👋
            </Text>
            <Text style={styles.subtitle}>
              Welcome back to your style journey
            </Text>
          </View>
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
     

          {/* Notification Button */}
          <TouchableOpacity 
            style={[styles.actionButton, styles.notificationButton]}
            onPress={notifcation}
          >
            <Ionicons name="notifications-outline" size={22} color="#333" />
            {notificationCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {/* {notificationCount > 9 ? '9+' : notificationCount} */}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>



  
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingTop: 10,
    paddingBottom: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    marginRight: 12,
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.pri,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF8C69',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF8C69',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Raleway-Bold',
    marginBottom: 2, // Fixed the spacing issue
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'Lato-Regular',
    opacity: 0.8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.pri,

  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#FF3333',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  notificationText: {
    color: '#fff',
    fontSize: 10,
    fontFamily: 'Raleway-Bold',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 15,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
   
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#E0E0E0',

  },
  searchContainerFocused: {
    borderColor: '#FF8C69',
    shadowColor: '#FF8C69',
    shadowOpacity: 0.2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontFamily: 'Lato-Regular',
  },
  filterButton: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickActionItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  quickActionText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Lato-Regular',
    fontWeight: '500',
  },
});

export default Header;
