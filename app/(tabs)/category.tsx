import { Colors } from '@/constants/Colors';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Map each category to an image/icon with descriptions
const categories = [
  { 
    name: 'Pain & Stress', 
    description: 'Relief for headaches, muscle pain, and stress management',
    link: '/category/pain-management', 
    image: 'https://media.istockphoto.com/id/1294436222/photo/the-tension-is-really-turned-up-today.webp?a=1&b=1&s=612x612&w=0&k=20&c=a_izEpP7CQxov4PbSSYG4eH_N9j2PIMvGCdQt2JrRMY=',
    icon: 'medical-outline',
    gradient: ['#FEF3C7', '#FDE68A']
  },
  { 
    name: 'Cough & Cold', 
    description: 'Treatments for respiratory symptoms and seasonal illness',
    link: '/category/cough-cold', 
    image: 'https://media.istockphoto.com/id/1140145927/photo/flu-season-strikes-again.webp?a=1&b=1&s=612x612&w=0&k=20&c=Y3p6FPPSwzgHhPS7HoSAW0axEDH1A7iYic6Sr7BLSb8=',
    icon: 'snow-outline',
    gradient: ['#DBEAFE', '#BFDBFE']
  },
  { 
    name: 'Chronic Diseases', 
    description: 'Long-term medication for diabetes, hypertension, and more',
    link: '/category/chronic-diseases', 
    image: 'https://media.istockphoto.com/id/1302600139/photo/my-chest-is-closing-up.webp?a=1&b=1&s=612x612&w=0&k=20&c=8XV9OT4H36_Yn8D6-9eJBcFGBDSUkNWea_pjys2X_p4=',
    icon: 'heart-outline',
    gradient: ['#FEE2E2', '#FECACA']
  },
  { 
    name: 'Family Planning', 
    description: 'Contraceptives and reproductive health solutions',
    link: '/category/family-planning', 
    image: 'https://media.istockphoto.com/id/658501954/photo/happy-family-posing-together.webp?a=1&b=1&s=612x612&w=0&k=20&c=xdXrO9KBHVZY_ML7x41FYpzvo1bMEstRv6O8isT7XC0=',
    icon: 'people-outline',
    gradient: ['#F3E8FF', '#E9D5FF']
  },
  { 
    name: 'Vitamins & Supp', 
    description: 'Essential nutrients and dietary supplements',
    link: '/category/vitamins-supplements', 
    image: 'https://media.istockphoto.com/id/2206682811/photo/close-up-of-hands-holding-pills-and-a-glass-of-water.webp?a=1&b=1&s=612x612&w=0&k=20&c=Z5PzN56JlCbUAGdZWpRn8PCFyMaLPSnL1eO3coTYwQ0=',
    icon: 'fitness-outline',
    gradient: ['#D1FAE5', '#A7F3D0']
  },
  { 
    name: 'Other Ailments', 
    description: 'Specialized treatments for various health conditions',
    link: '/category/other-ailments', 
    image: 'https://media.istockphoto.com/id/2165323370/photo/malaria-vaccine.webp?a=1&b=1&s=612x612&w=0&k=20&c=k0n5SKsP0smbexni_lfijkBDCaGma8qpoJ6xDHPVGks=',
    icon: 'shield-outline',
    gradient: ['#FEF3C7', '#FDE68A']
  },
];

const MedicineCategory = ({ navigation }) => {
  const handleCategoryPress = (category) => {
    // Handle navigation based on your navigation setup
    // For example: navigation.navigate('CategoryScreen', { category: category.name });
    console.log('Category pressed:', category.name);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item)}
      activeOpacity={0.8}
    >
      {/* Image Container */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.categoryImage}
          resizeMode="cover"
        />
      </View>

      {/* Content */}
      <View style={styles.cardContent}>
        <Text style={styles.categoryName} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={styles.categoryDescription} numberOfLines={3}>
          {item.description}
        </Text>
      </View>

      {/* Explore Button */}
      <TouchableOpacity 
        style={styles.exploreButton}
        onPress={() => handleCategoryPress(item)}
      >
        <Text style={styles.exploreText}>Explore</Text>
        <Ionicons name="arrow-forward" size={14} color="#047857" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Category</Text>
      </View>
      
      <View style={styles.categoriesContainer}>
        <FlatList
          key="single-column"
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.name}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bg,
    paddingTop : 26,
    
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff", // gray-100
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#064E3B', // emerald-950
  },
  categoriesContainer: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 48,
  },
  flatListContent: {
    paddingBottom: 8,
  },
  categoryItem: {
    width: '100%',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.5,
    borderColor: '#E5E7EB',
    minHeight: 120,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.pri,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    overflow: 'hidden',
  },
  categoryImage: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#047857',
    lineHeight: 20,
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#6B7280',
    lineHeight: 18,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#047857',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
  },
  exploreText: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: Colors.pri,
    marginRight: 4,
  },
});

export default MedicineCategory;