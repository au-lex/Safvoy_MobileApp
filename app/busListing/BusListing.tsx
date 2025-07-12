import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BusList from '@/Screens/BusListing/BusListing'
import Header from '@/Screens/Home/Header'
import SafeLayout from '@/Layout/Layout'

const BusListing = () => {
  return (
    <SafeLayout>

    <View style={{flex:1, padding:10}}>
   
     <BusList />
    </View>
    </SafeLayout>
  )
}

export default BusListing

const styles = StyleSheet.create({})