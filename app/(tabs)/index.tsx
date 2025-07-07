import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/Screens/Home/Header'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Hero from '@/Screens/Home/Hero'

const Index = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>


      <Header />
<Hero />
    </SafeAreaView>
  )
}

export default Index

const styles = StyleSheet.create({})