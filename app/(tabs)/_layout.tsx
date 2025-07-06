import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

// Badge component
const Badge = ({ count, color = '#AD112A' }) => {
  if (!count || count === 0) return null;
  
  return (
    <View
      style={{
        position: 'absolute',
        right: -14,
        top: -3,
        backgroundColor: color,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        borderWidth: 2,
        borderColor: '#FFFFFF',
      }}
    >
      <Text
        style={{
          color: '#FFFFFF',
          fontSize: 12,

          fontFamily: 'Nunito-SemiBold',
        }}
      >
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

// Icon with badge wrapper
const IconWithBadge = ({ children, badgeCount, badgeColor }) => {
  return (
    <View style={{ position: 'relative' }}>
      {children}
      <Badge count={badgeCount} color={badgeColor} />
    </View>
  );
};

export default function TabLayout() {
  
  const cartItemCount = 3; // Replace with your cart item count
  const orderNotificationCount = 2; // Replace with your order notification count

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#064E3B',
        tabBarInactiveTintColor: '#8E8E93', // Gray color for inactive tabs
        tabBarLabelStyle: {
          fontFamily: 'Nunito-SemiBold',
          fontSize: 11,
        },
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0.5,
            borderTopColor: '#E5E5E7',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 8,
          },
          default: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0.5,
            borderTopColor: '#E5E5E7',
            elevation: 8,
          },
        }),
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'explore') {
            return focused ? (
              <FontAwesome name="feed" size={20} color={color} />
            ) : (
              <SimpleLineIcons name="feed" size={20} color={color} />
            );
          }
          if (route.name === 'favourite') {
            return (
              <Ionicons
                name={focused ? 'add-circle' : 'add-circle-outline'}
                size={20}
                color={color}
              />
            );
          }

          let iconName;
          let badgeCount = 0;
          let badgeColor = '#AD112A';

          switch (route.name) {
            case 'index':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'cart':
              iconName = focused ? 'cart' : 'cart-outline';
              badgeCount = cartItemCount;
              break;
            case 'category':
              iconName = focused ? 'grid' : 'grid-outline';
              break;
            case 'order':
              iconName = focused ? 'bag' : 'bag-outline';
              badgeCount = orderNotificationCount;
              break;
            case 'consult':
              iconName = focused ? 'chatbubble' : 'chatbubble-outline';
              break;
            case 'settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          const icon = <Ionicons name={iconName} size={20} color={color} />;

          if (route.name === 'cart' || route.name === 'order') {
            return (
              <IconWithBadge badgeCount={badgeCount} badgeColor={badgeColor}>
                {icon}
              </IconWithBadge>
            );
          }

          return icon;
        },
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Categories',
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          title: 'Orders',
        }}
      />
      <Tabs.Screen
        name="consult"
        options={{
          title: 'Consult',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}