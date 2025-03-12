import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
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
          // console.log(location);
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
        mapType="hybrid" //map tyes 
        followsUserLocation
        showsUserLocation
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        region={region}
        onRegionChangeComplete={(e) => {
          setRegion({
            latitude: e.latitude,
            longitude: e.longitude,
            latitudeDelta: e.latitudeDelta,
            longitudeDelta: e.longitudeDelta,
          });
        }}
        // onDoublePress={(e)=>console.log(e)}
        // onTouchEnd={(e)=>console.log("touch",e)}
        onPoiClick={(event) => {
          console.log("Point of Interest Clicked:", event.nativeEvent);
          setRegion({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });
        }}
      >
        <Marker coordinate={region}>
          <Callout>
            <View style={{ padding: 10 }}>
              <Text>Latitude: {region.latitude}</Text>
              <Text>Longitude: {region.longitude}</Text>
            </View>
          </Callout>
        </Marker>
        <Circle
          center={{ latitude: region.latitude, longitude: region.longitude }}
          strokeColor="pink"
          radius={100}
          fillColor="rgba(255,192,203,0.4)"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapSearch;
