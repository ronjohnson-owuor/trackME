import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles/Styles';

function Maps() {
    // initialize the location variable
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    // this is the starting point where the user will start his walk
    const [region, setRegion] = useState({
        
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
            latitude:0.0000,
            longitude: 0.0000
        
    });



    const [pathCoordinates, setPathCoordinates] = useState<Array<{ 
        latitude: number;
         longitude: number;
         latitudeDelta:number;
        longitudeDelta:number;
    }>>([]);
    useEffect(() => {
        const intervalId = setInterval(updatePathCoordinates,2000); // Update every 2seconds 
        return () => clearInterval(intervalId);
    }, []);



    const updatePathCoordinates = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                alert('Please allow us to get your location');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            // Update pathCoordinates by appending the current location 
            if (location) {
                setPathCoordinates(prevPath => [
                    ...prevPath,
                    { latitude: location.coords.latitude,
                      longitude: location.coords.longitude,
                      latitudeDelta: 0.001,
                      longitudeDelta: 0.001,
                     }
                ]);
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            alert('Error fetching location. Please refresh and  try again.');
        }
    };


    // update the starting region to the starting index of our path cordinates when the choords changes
    useEffect(()=>{
        if(pathCoordinates.length > 0 && location?.coords){
            setRegion({
                latitude:pathCoordinates[0].latitude,
                longitude:pathCoordinates[0].longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            })            
        }

    },[location?.coords])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.LivePosUpdate}>
            <Text style={styles.LivePosUpdateText}>live latitude: {pathCoordinates.length === 0 ? 'fetching...' :pathCoordinates[pathCoordinates.length-1].latitude}</Text>
            <Text style={styles.LivePosUpdateText}>live longitude: {pathCoordinates.length === 0 ? 'fetching...' :pathCoordinates[pathCoordinates.length-1].longitude}</Text>
            </View>
            <MapView region={pathCoordinates.length > 0 ?pathCoordinates[pathCoordinates.length-1]:region} style={styles.maps}>
                {/* starting point marker */}
                <Marker
                 coordinate={region}
                 pinColor="white"
                 title="Start"
                 description="Starting point"
                 ></Marker>
                {/* current point marker */}
                {pathCoordinates.length > 0 &&
                  <Marker 
                  coordinate={pathCoordinates[pathCoordinates.length-1]}
                  pinColor="red"
                  title="end"
                  description="current point"
                  ></Marker> }
                  <Polyline
                  strokeColor='#3eb1be'
                  strokeWidth={3}
                  coordinates={pathCoordinates}
                  />
            </MapView>
        </SafeAreaView>
    );
}

export default Maps;
