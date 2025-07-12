import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const BannerSlider = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Banner data with background images for bus booking system
  const banners = [


 
    {
      id: 2,
      title: "Express Routes",
      subtitle: "Non-stop service to major cities",
      description: "Travel direct to Lagos, Abuja, Kano, Port Harcourt and more",
      buttonText: "View Routes",
      backgroundImage: "https://i.pinimg.com/1200x/83/45/68/834568533a71260dcb2a223918b9caca.jpg",
      gradientColors: ["rgba(34, 197, 94, 0.6)", "rgba(0, 5, 0, 0.8)"],
      icon: "navigation"
    },
    {
      id: 3,
      title: "VIP Experience",
      subtitle: "Luxury travel with premium amenities",
      description: "Executive buses with reclining seats, entertainment and refreshments",
      buttonText: "Book VIP",
      backgroundImage: "https://i.pinimg.com/1200x/2c/0c/e5/2c0ce5483a43a0735801214bb436f786.jpg",
      gradientColors: ["rgba(239, 68, 68, 0.6)", "rgba(0, 0, 0, 0.8)"],
      icon: "star"
    },

    {
      id: 1,
      title: "Book Your Journey",
      subtitle: "Safe & comfortable bus travel nationwide",
      description: "Choose from premium buses with AC, WiFi and comfortable seating",
      buttonText: "Book Now",
      backgroundImage: "https://i.pinimg.com/1200x/96/bb/cc/96bbcc813d0a7c61884b59abbadb368d.jpg",
      gradientColors: ["rgba(37, 99, 235, 0.6)", "rgba(0, 0, 6, 0.8)"],
      icon: "map-pin"
    },

  ];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });
        return nextIndex;
      });
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  const renderBanner = ({ item }) => (
    <TouchableOpacity style={styles.bannerContainer} activeOpacity={0.9}>
      <ImageBackground
        source={{ uri: item.backgroundImage }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={item.gradientColors}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.content}>
       
            
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>{item.buttonText}</Text>
              {/* <Icon name="arrow-right" size={16} color="#FFFFFF" /> */}
            </View>
          </View>

          {/* Dots indicator on the banner */}
          <View style={styles.dotsContainer}>
            {banners.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { opacity: currentIndex === index ? 1 : 0.4 }
                ]}
              />
            ))}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );

  const onScrollEnd = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={banners}
        renderItem={renderBanner}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScrollEnd}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 180,
    marginVertical: 8,
  },
  bannerContainer: {
    width: width - 32,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    marginHorizontal: 16,
  
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Raleway-Medium',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
   fontFamily: 'Raleway-Medium',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    lineHeight: 16,
    fontFamily:"Lato-Regular"
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 12,
   fontFamily: 'Raleway-Bold',
    color: '#FFFFFF',
    marginRight: 4,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 3,
  },
});

export default BannerSlider;