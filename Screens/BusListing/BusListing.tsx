import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { AntDesign, MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

interface BusJourney {
  id: string
  company: string
  serviceType: string
  price: number
  departureTime: string
  departureLocation: string
  arrivalTime: string
  arrivalLocation: string
  duration: string
  amenities: {
    wifi: boolean
    power: boolean
    tv: boolean
    snacks: boolean
  }
}

const busJourneys: BusJourney[] = [
  {
    id: "1",
    company: "Express Lines",
    serviceType: "Premium Sleeper",
    price: 45.0,
    departureTime: "07:00",
    departureLocation: "New York",
    arrivalTime: "11:30",
    arrivalLocation: "Boston",
    duration: "4h 30m",
    amenities: {
      wifi: true,
      power: true,
      tv: true,
      snacks: true,
    },
  },
  {
    id: "2",
    company: "Coastal Transport",
    serviceType: "Standard",
    price: 32.0,
    departureTime: "08:30",
    departureLocation: "New York",
    arrivalTime: "13:45",
    arrivalLocation: "Boston",
    duration: "5h 15m",
    amenities: {
      wifi: true,
      power: true,
      tv: false,
      snacks: false,
    },
  },
  {
    id: "3",
    company: "City Connect",
    serviceType: "Economy",
    price: 28.5,
    departureTime: "09:00",
    departureLocation: "New York",
    arrivalTime: "14:00",
    arrivalLocation: "Boston",
    duration: "5h 00m",
    amenities: {
      wifi: false,
      power: true,
      tv: false,
      snacks: false,
    },
  },
]

const CustomHeader = ({ title }: { title: string }) => {
  const router = useRouter()
  return (
    <View style={headerStyles.headerContainer}>
      <TouchableOpacity onPress={()=> router.back()} style={headerStyles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={headerStyles.headerTitle}>{title}</Text>
      <View style={headerStyles.placeholder} /> {/* Placeholder for alignment */}
    </View>
  )
}

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff", // Or match your app's background
    borderBottomWidth: 1,
    borderBottomColor: "#eee",

  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 15,
   fontFamily: 'Raleway-Bold',
    color: "#333",
  },
  placeholder: {
    width: 24 + 10, // Width of icon + padding
  },
})

export default function BusList() {
  const router = useRouter()
  return (
    <View style={styles.safeArea}>
      <CustomHeader title="Bus Search Results" />
      <View style={styles.container}>
       

        <ScrollView style={styles.scrollViewContent}>
          <View>
          <View style={styles.headerCard}>
          <View style={styles.headerRow}>
            <View style={styles.headerColumn}>
              <Text style={styles.headerLabel}>From</Text>
              <Text style={styles.headerValue}>New York</Text>
            </View>
            <AntDesign name="arrowright" size={24} color="#6A0DAD" />
            <View style={styles.headerColumn}>
              <Text style={[styles.headerLabel, styles.alignRight]}>To</Text>
              <Text style={[styles.headerValue, styles.alignRight]}>Boston</Text>
            </View>
          </View>
          <View style={styles.headerRow}>
            <View style={styles.headerColumn}>
              <Text style={styles.headerLabel}>Date</Text>
              <Text style={styles.headerValue}>June 15, 2025</Text>
            </View>
            <View style={styles.headerColumn}>
              <Text style={[styles.headerLabel, styles.alignRight]}>Passengers</Text>
              <Text style={[styles.headerValue, styles.alignRight]}>2 Adults</Text>
            </View>
          </View>
        </View>

        <View style={styles.resultsSummary}>
          <Text style={styles.resultsCount}>15 buses found</Text>
          <TouchableOpacity style={styles.sortButton}>
            <MaterialCommunityIcons name="filter-variant" size={16} color="#6A0DAD" />
            <Text style={styles.sortButtonText}>Sort by</Text>
          </TouchableOpacity>
        </View>
          </View>
          {busJourneys.map((journey) => (
            <View key={journey.id} style={styles.busCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.companyName}>{journey.company}</Text>
                  <Text style={styles.serviceType}>{journey.serviceType}</Text>
                </View>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>${journey.price.toFixed(2)}</Text>
                  <Text style={styles.perPerson}>per person</Text>
                </View>
              </View>

              <View style={styles.timeLine}>
                <View style={styles.timeLocation}>
                  <Text style={styles.time}>{journey.departureTime}</Text>
                  <Text style={styles.location}>{journey.departureLocation}</Text>
                </View>
                <View style={styles.durationBarContainer}>
                  <View style={styles.durationBar} />
                  <Text style={styles.durationText}>{journey.duration}</Text>
                </View>
                <View style={styles.timeLocation}>
                  <Text style={styles.time}>{journey.arrivalTime}</Text>
                  <Text style={styles.location}>{journey.arrivalLocation}</Text>
                </View>
              </View>

              <View style={styles.amenities}>
                {journey.amenities.wifi && (
                  <View style={styles.amenityItem}>
                    <FontAwesome5 name="wifi" size={16} color="#666" />
                    <Text style={styles.amenityText}>WiFi</Text>
                  </View>
                )}
                {journey.amenities.power && (
                  <View style={styles.amenityItem}>
                    <MaterialCommunityIcons name="power-plug" size={16} color="#666" />
                    <Text style={styles.amenityText}>Power</Text>
                  </View>
                )}
                {journey.amenities.tv && (
                  <View style={styles.amenityItem}>
                    <Ionicons name="tv-outline" size={16} color="#666" />
                    <Text style={styles.amenityText}>TV</Text>
                  </View>
                )}
                {journey.amenities.snacks && (
                  <View style={styles.amenityItem}>
                    <MaterialCommunityIcons name="coffee" size={16} color="#666" />
                    <Text style={styles.amenityText}>Snacks</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  safeArea: {
    flex: 1,
    

  },
  headerCard: {


    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
  
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerColumn: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    fontFamily: 'Raleway-Medium',
  },
  headerValue: {
    fontSize: 18,
   fontFamily: 'Raleway-Bold',
    color: "#333",
  },
  alignRight: {
    textAlign: "right",
  },
  resultsSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 15,
  },
  resultsCount: {
    fontSize: 16,
    color: "#666",
    fontFamily: 'Raleway-Medium',
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDE7F6", // Light purple
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  sortButtonText: {
    color: "#6A0DAD", // Darker purple
    marginLeft: 5,
    fontSize: 14,
    fontFamily: 'Raleway-Medium',
  },
  scrollViewContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  busCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 15,
  },
  companyName: {
    fontSize: 18,
   fontFamily: 'Raleway-Bold',
    color: "#333",
  },
  serviceType: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
    fontFamily: 'Raleway-Medium',
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 18,
   fontFamily: 'Raleway-Bold',
    color: "#6A0DAD", // Darker purple
  },
  perPerson: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  timeLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeLocation: {
    alignItems: "center",
  },
  time: {
    fontSize: 18,
   fontFamily: 'Raleway-Bold',
    color: "#333",
  },
  location: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
    fontFamily:'Lato-Regular',
  },
  durationBarContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: "center",
  },
  durationBar: {
    height: 4,
    backgroundColor: "#D1C4E9", 
    width: "100%",
    borderRadius: 2,
  },
  durationText: {
    fontSize: 12,
    color: "#666",
    marginTop: 8,
       fontFamily:'Lato-Regular'
  },
  amenities: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    gap: 15,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15, 
  },
  amenityText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 5,
       fontFamily:'Lato-Regular'
  },
})
