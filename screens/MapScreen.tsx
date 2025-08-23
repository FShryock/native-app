import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import MapView, { Marker, Region, PROVIDER_DEFAULT } from 'react-native-maps';
import * as location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude:number }| null>(null);

  useEffect(() => {
    (
      async() =>{
        const {status} = await location.requestBackgroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission denied');
          return;
        }
        const currentLocation = await location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude
        });
      }
    )
  },[]);

  // setting up the Map 
  const initialLocation: Region = {
    latitude: userLocation?.latitude ?? 39.747251024246324,
    longitude: userLocation?.longitude ?? -104.94642581295749,
    //the smaller the number the more the camera zooms in
    latitudeDelta: 0.08,
    longitudeDelta: 0.08

  }
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialLocation}
        mapType={'standard'}
        provider={PROVIDER_DEFAULT}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        {/* <Marker coordinate={{
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude
        }}
          title="Volleyball Court"
          description="Sand Court"
        /> */}
          <Marker coordinate={{ latitude: 39.74725, longitude: -104.94642 }}
            title="Volleyball Court"
            description="Sand Court"
          >
            <View style={{
              backgroundColor: 'orange',
              padding: 5,
              borderRadius: 20,
              borderWidth: 2,
              borderColor: 'white'
            }}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>🏐</Text>
            </View>
        </Marker>
      </MapView>
       <TouchableOpacity style={styles.button} onPress={() => console.log('test')}>
        <Ionicons name={'navigate-outline'} color={'white'} size={24}/>
      </TouchableOpacity>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  customMarker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -12,
    marginTop: -12,
  },
  button: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#312e37bf',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },

});
