import { Colors } from '@/constants/Colors';
import MyTicketsPage from '@/Screens/Tickets/MyTicket';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';



const TicketPage = () => {


  return (
    <View style={{ flex: 1}}>
      <MyTicketsPage />
 
    </View>
  );
};



export default TicketPage;