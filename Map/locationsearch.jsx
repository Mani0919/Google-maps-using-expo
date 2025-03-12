import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const MapSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [region, setRegion] = useState(null);
  const mapRef = useRef(null);

  // Get initial location when component mounts
  useEffect(() => {
    const getInitialLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          // If permission denied, use default location
          setRegion({
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        } else {
          // Get current location
          const location = await Location.getCurrentPositionAsync({});
          console.log(location)
          setRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }
      } catch (error) {
        // If there's an error, use default location
        setRegion({
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
      } finally {
        setIsLoading(false);
      }
    };

    getInitialLocation();
  }, []);

  if (isLoading || !region) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View className="relative">
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={region}
          region={region}
          // onRegionChange={(e)=>console.log(e)}
          onRegionChangeComplete={(e)=>{
            setRegion({
              latitude: e.latitude,
              longitude:e.longitude,
              latitudeDelta: e.latitudeDelta,
              longitudeDelta: e.longitudeDelta,
            });
          }}
        >
          <Marker coordinate={region} />
        </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapSearch;
