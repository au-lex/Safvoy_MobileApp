import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/Screens/Home/Header'

import Hero from '@/Screens/Home/Hero'
import SafeLayout from '@/Layout/Layout'

const Index = () => {
  return (

    <SafeLayout>


      <View style={{ flex: 1 }}>


        <Header />
        <Hero />
      </View>
    </SafeLayout>
  )
}

export default Index

const styles = StyleSheet.create({})