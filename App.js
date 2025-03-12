import { View, Text } from 'react-native'
import React from 'react'
import MapSearch from './Map/locationsearch'

export default function App() {
  return (
    <View style={{display:'flex',justifyContent:"center"}}>
      <MapSearch/>
    </View>
  )
}