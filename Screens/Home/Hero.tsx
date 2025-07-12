import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native';
import BannerSlider from './HeroSlider';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';



interface PopularRoute {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  gradient: string[];
  backgroundImage: string;
}



interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  discount: string;
  validUntil: string;
  icon: string;
}

const Hero: React.FC = () => {

  const router =useRouter();
 

  const popularRoutes: PopularRoute[] = [
    {
      id: '1',
      from: 'NYC',
      to: 'Boston',
      price: 45,
      duration: '4h 30m',
      gradient: ['rgba(102, 126, 234, 0.85)', 'rgba(0, 0, 0, 0.85)'],
      backgroundImage: 'https://plus.unsplash.com/premium_photo-1694475434235-12413ec38b3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9zdG9ufGVufDB8fDB8fHww',
    },
    {
      id: '2',
      from: 'DC',
      to: 'NYC',
      price: 40,
      duration: '4h 15m',
      gradient: ['rgba(102, 126, 234, 0.85)', 'rgba(0, 0, 0, 0.85)'],
      backgroundImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
    {
      id: '3',
      from: 'LA',
      to: 'SF',
      price: 55,
      duration: '6h 45m',
      gradient: ['rgba(102, 126, 234, 0.85)', 'rgba(0, 0, 0, 0.85)'],
      backgroundImage: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    },
  ];



  const specialOffers: SpecialOffer[] = [
    {
      id: '1',
      title: 'Weekend Special',
      description: '20% off on all weekend trips',
      discount: '20% OFF',
      validUntil: 'Valid until Apr 30',
      icon: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1752358668/gift_ijdagv.png',
    },
    {
      id: '2',
      title: 'Weekend Special',
      description: '20% off on all weekend trips',
      discount: '20% OFF',
      validUntil: 'Valid until Apr 30',
      icon: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1752358664/special-offer_oorbku.png',
    },

    
  ];

  const renderPopularRoute = ({ item }: { item: PopularRoute }) => (
    <TouchableOpacity onPress={() => router.push('/busListing/BusListing')} style={styles.routeCard}>
      <ImageBackground
        source={{ uri: item.backgroundImage }}
        style={styles.routeBackground}
        
        resizeMode="cover"
      >
        <LinearGradient
          colors={item.gradient}
          style={styles.routeOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.routeContent}>
            <View style={styles.routeHeader}>
              <View style={styles.routePoints}>
                <View style={[styles.routePoint, { backgroundColor: '#fff' }]} />
                <Text style={styles.routeCity}>{item.from}</Text>
              </View>
              <View style={styles.routeArrow}>
                <View style={styles.routeLine} />
                <Ionicons name="chevron-down" size={16} color="#fff" />
              </View>
              <View style={styles.routePoints}>
                <View style={[styles.routePoint, { backgroundColor: '#fff' }]} />
                <Text style={styles.routeCity}>{item.to}</Text>
              </View>
            </View>
            
            <View style={styles.routeBottom}>
              <View style={styles.routePriceContainer}>
                <Text style={styles.routePrice}>${item.price}</Text>
                <View style={styles.routeDuration}>
                  <Ionicons name="time-outline" size={16} color="rgba(255, 255, 255, 0.8)" />
                  <Text style={styles.routeDurationText}>{item.duration}</Text>
                </View>
              </View>
              
              <View style={styles.bookButton}>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );



  const renderSpecialOffer = ({ item }: { item: SpecialOffer }) => (
    <View style={styles.offerCard}>
      <View style={styles.offerContent}>
        <View style={styles.offerIcon}>
          <Image
           source={{ uri: item.icon }} style={{width:30, height: 30}} />
        </View>
        <View style={styles.offerText}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <Text style={styles.offerDescription}>{item.description}</Text>
          <View style={styles.offerValidity}>
            <Ionicons name="time-outline" size={14} color="#999" />
            <Text style={styles.offerValidityText}>{item.validUntil}</Text>
          </View>
        </View>
      </View>
      <View style={styles.offerDiscount}>
        <Text style={styles.offerDiscountText}>{item.discount}</Text>
      </View>
    </View>
  );



  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Slider */}
        {/* <View style={styles.heroContainer}>
          <FlatList
            ref={flatListRef}
            data={heroSlides}
            renderItem={renderHeroSlide}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onSlideChange}
          />
          <View style={styles.pagination}>
            {heroSlides.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.paginationDot,
                  currentSlide === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </View>
        </View> */}

        <BannerSlider />

        {/* Special Offers */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>Special Offers</Text>
          </View>
          <FlatList
            data={specialOffers}
            renderItem={renderSpecialOffer}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

            {/* Popular Routes */}
            <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIndicator} />
            <Text style={styles.sectionTitle}>Popular Routes</Text>
          </View>
          <FlatList
            data={popularRoutes}
            renderItem={renderPopularRoute}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.routesList}
          />
        </View>


    
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    marginTop: 20
  },
  scrollView: {
    flex: 1,
  },
  heroContainer: {
    height: 200,
    position: 'relative',
    paddingHorizontal: 20,
    borderRadius: 16,
    
    
  },
  heroSlide: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  heroOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  heroTitle: {
    fontSize: 28,
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#fff',
    width: 24,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIndicator: {
    width: 4,
    height: 20,
    backgroundColor: '#667eea',
    borderRadius: 2,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#333',
  },
  routesList: {
    paddingRight: 20,
    paddingBottom: 16,
  },
  routeCard: {
    borderRadius: 20,
    marginRight: 16,
    width: 240,
    height: 150,
    overflow: 'hidden',
   
  },
  routeBackground: {
    width: '100%',
    height: '100%',
  },
  routeOverlay: {
    flex: 1,
    padding: 20,
  },
  routeContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  routeHeader: {
    // marginBottom: 16,
  },
  routePoints: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 8,
  },
  routePoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  routeCity: {
    fontSize: 16,
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  routeArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginBottom: 8,
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#fff',
    marginRight: 4,
    opacity: 0.8,
  },
  routeBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  routePriceContainer: {
    flex: 1,
  },
  routePrice: {
    fontSize: 20,
    fontFamily: 'Raleway-Bold',
    color: '#fff',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
  },
  routeDuration: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDurationText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginLeft: 4,
    fontFamily: 'Lato-Regular',
  },
  bookButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderLeftWidth: 4,
    borderLeftColor: '#4facfe',
    borderColor: '#E5E7EB',
  },
  searchContent: {
    flex: 1,
  },
  searchRoute: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  searchFrom: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#333',
    marginRight: 8,
  },
  searchTo: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#333',
    marginLeft: 8,
  },
  searchDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchDateText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
    fontFamily: 'Lato-Regular',
  },
  searchButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 8,
  },
  offerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  offerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerIcon: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginRight: 16,
  },
  offerText: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 16,
    fontFamily: 'Raleway-Medium',
    color: '#333',
    marginBottom: 4,
  },
  offerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Lato-Regular',
  },
  offerValidity: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerValidityText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
    fontFamily: 'Lato-Regular',
  },
  offerDiscount: {
    backgroundColor: '#ff4757',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  offerDiscountText: {
    fontSize: 12,
    fontFamily: 'Raleway-Bold',
    color: '#fff',
  },
});

export default Hero;