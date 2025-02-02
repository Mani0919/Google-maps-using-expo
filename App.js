import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
const inital={
  latitude:37.33,
  longitude:-122,
  latitudeDelta:2,
  longitudeDelta:2
}
export default function App() {
 
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={inital} showsUserLocation={true} showsMyLocationButton={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
