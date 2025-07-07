import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Reward {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBackground: string;
  progress: number;
  unlockLevel: string;
  unlockPoints: number;
}

interface Offer {
  id: number;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  iconBackground: string;
  buttonText: string;
  buttonAction: string;
  validUntil?: string;
  restriction?: string;
  isNoExpiration?: boolean;
}

interface TravelPoints {
  current: number;
  currentLevel: string;
  nextLevel: string;
  pointsToNext: number;
  progress: number;
}

const OffersPage: React.FC = () => {
  const [promoCode, setPromoCode] = useState('');

  const travelPoints: TravelPoints = {
    current: 2450,
    currentLevel: 'Silver',
    nextLevel: 'Gold',
    pointsToNext: 1550,
    progress: 65,
  };

  const rewards: Reward[] = [
    {
      id: 1,
      title: 'Free Onboard Refreshments',
      description: 'Unlock at Gold Level (4,000 points)',
      icon: 'cafe',
      iconColor: '#FFFFFF',
      iconBackground: '#F97316',
      progress: 65,
      unlockLevel: 'Gold',
      unlockPoints: 4000,
    },
    {
      id: 2,
      title: 'Priority Boarding',
      description: 'Unlock at Platinum Level (10,000 points)',
      icon: 'flash',
      iconColor: '#FFFFFF',
      iconBackground: '#8B5CF6',
      progress: 25,
      unlockLevel: 'Platinum',
      unlockPoints: 10000,
    },
  ];

  const availableOffers: Offer[] = [
    {
      id: 1,
      title: 'Weekend Special',
      description: '20% off on all weekend trips',
      icon: 'calendar',
      iconColor: '#FFFFFF',
      iconBackground: '#8B5CF6',
      buttonText: 'Use Now',
      buttonAction: 'use',
      validUntil: 'Apr 30',
    },
    {
      id: 2,
      title: 'First Trip Discount',
      description: '$10 off on your first booking',
      icon: 'gift',
      iconColor: '#FFFFFF',
      iconBackground: '#10B981',
      buttonText: 'Use Now',
      buttonAction: 'use',
      restriction: 'New users only',
    },
    {
      id: 3,
      title: 'Refer a Friend',
      description: 'Get $15 when a friend books their first trip',
      icon: 'people',
      iconColor: '#FFFFFF',
      iconBackground: '#EC4899',
      buttonText: 'Share Invite',
      buttonAction: 'share',
      isNoExpiration: true,
    },
  ];

  const handlePromoCode = () => {
    if (promoCode.trim()) {
      Alert.alert('Promo Code', `Applied: ${promoCode}`);
      setPromoCode('');
    } else {
      Alert.alert('Error', 'Please enter a valid promo code');
    }
  };

  const handleOfferAction = (offer: Offer) => {
    if (offer.buttonAction === 'use') {
      Alert.alert('Offer Applied', `${offer.title} has been applied to your account`);
    } else if (offer.buttonAction === 'share') {
      Alert.alert('Invite Sent', 'Invitation link has been shared');
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
     
        <Text style={styles.headerTitle}>Offers</Text>
        <View style={styles.headerSpacer} />
      </LinearGradient>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Travel Points Card */}
        <View style={styles.pointsCard}>
          <Text style={styles.pointsTitle}>Your Travel Points</Text>
          <View style={styles.pointsContainer}>
            <Ionicons name="star" size={24} color="#F59E0B" />
            <Text style={styles.pointsNumber}>{travelPoints.current.toLocaleString()}</Text>
          </View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${travelPoints.progress}%` }]} 
              />
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.currentLevel}>Current Level</Text>
              <Text style={styles.nextLevel}>Next Level</Text>
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelText}>{travelPoints.currentLevel}</Text>
              <Text style={styles.levelText}>
                {travelPoints.nextLevel} ({travelPoints.pointsToNext} points to go)
              </Text>
            </View>
          </View>
        </View>

        {/* Rewards Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Rewards You Can Unlock</Text>
          
          {rewards.map((reward) => (
            <View key={reward.id} style={styles.rewardCard}>
              <View style={styles.rewardHeader}>
                <View style={[styles.rewardIcon, { backgroundColor: reward.iconBackground }]}>
                  <Ionicons name={reward.icon as any} size={24} color={reward.iconColor} />
                </View>
                <View style={styles.rewardContent}>
                  <Text style={styles.rewardTitle}>{reward.title}</Text>
                  <Text style={styles.rewardDescription}>{reward.description}</Text>
                </View>
              </View>
              <View style={styles.rewardProgress}>
                <View style={styles.progressBar}>
                  <View 
                    style={[styles.progressFill, { width: `${reward.progress}%` }]} 
                  />
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Have a Promo Code?</Text>
          <View style={styles.promoContainer}>
            <TextInput
              style={styles.promoInput}
              placeholder="Enter promo code"
              value={promoCode}
              onChangeText={setPromoCode}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.applyButton} onPress={handlePromoCode}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Available Offers */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Available Offers</Text>
          
          {availableOffers.map((offer) => (
            <View key={offer.id} style={styles.offerCard}>
              <View style={styles.offerHeader}>
                <View style={[styles.offerIcon, { backgroundColor: offer.iconBackground }]}>
                  <Ionicons name={offer.icon as any} size={24} color={offer.iconColor} />
                </View>
                <View style={styles.offerContent}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerDescription}>{offer.description}</Text>
                  {offer.validUntil && (
                    <View style={styles.validityContainer}>
                      <Ionicons name="time-outline" size={12} color="#EC4899" />
                      <Text style={styles.validityText}>Valid until {offer.validUntil}</Text>
                    </View>
                  )}
                  {offer.restriction && (
                    <View style={styles.restrictionContainer}>
                      <Ionicons name="person-outline" size={12} color="#EC4899" />
                      <Text style={styles.restrictionText}>{offer.restriction}</Text>
                    </View>
                  )}
                  {offer.isNoExpiration && (
                    <View style={styles.noExpirationContainer}>
                      <Ionicons name="infinite-outline" size={12} color="#10B981" />
                      <Text style={styles.noExpirationText}>No expiration</Text>
                    </View>
                  )}
                </View>
              </View>
              <TouchableOpacity
                style={styles.offerButton}
                onPress={() => handleOfferAction(offer)}
              >
                <Text style={styles.offerButtonText}>{offer.buttonText}</Text>
              </TouchableOpacity>
            </View>
          ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 40,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
fontFamily: 'Raleway-Bold',
    color: '#FFFFFF',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  pointsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 20,
borderWidth:1,
borderColor:'#E5E7EB',
  },
  pointsTitle: {
    fontSize: 16,
fontFamily: 'Raleway-Medium',
    color: '#6366F1',
    textAlign: 'center',
    marginBottom: 16,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pointsNumber: {
    fontSize: 32,
   fontFamily: 'Raleway-Bold',
    color: '#6366F1',
    marginLeft: 8,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  currentLevel: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
  },
  nextLevel: {
    fontSize: 12,
    color: '#6B7280',
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelText: {
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
    color: '#374151',
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#6366F1',
    marginBottom: 16,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
borderWidth:1,
borderColor:'#E5E7EB',
  },
  rewardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Lato-Regular',
  },
  rewardProgress: {
    marginTop: 8,
  },
  promoContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
 borderWidth:1,
borderColor:'#E5E7EB',
  },
  promoInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  applyButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#FFFFFF',
  },
  offerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
borderWidth:1,
borderColor:'#E5E7EB',
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  offerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  offerContent: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#111827',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    fontFamily: 'Lato-Regular',
  },
  validityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  validityText: {
    fontSize: 12,
    color: '#EC4899',
    marginLeft: 4,
    fontFamily: 'Raleway-Medium',

  },
  restrictionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  restrictionText: {
    fontSize: 12,
    color: '#EC4899',
    marginLeft: 4,
    fontFamily: 'Raleway-Medium',
  },
  noExpirationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  noExpirationText: {
    fontSize: 12,
    color: '#10B981',
    marginLeft: 4,
  },
  offerButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  offerButtonText: {
    fontSize: 14,
    fontFamily: 'Raleway-Bold',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 100,
  },
});

export default OffersPage;