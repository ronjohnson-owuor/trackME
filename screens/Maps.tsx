import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles/Styles';

function Maps() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [region, setRegion] = useState({
        latitude: -0.0483369,
        longitude: 34.7847439,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    });

    const [pathCoordinates, setPathCoordinates] = useState<Array<{ latitude: number; longitude: number }>>([]);

    useEffect(() => {
        const intervalId = setInterval(updatePathCoordinates, 300000); // Update every 5 minutes (300000 milliseconds)

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
                    { latitude: location.coords.latitude, longitude: location.coords.longitude }
                ]);
            }
        } catch (error) {
            console.error('Error fetching location:', error);
            alert('Error fetching location. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.LivePosUpdate}>
            <Text style={styles.LivePosUpdateText}>Latitude: {region.latitude}</Text>
            <Text style={styles.LivePosUpdateText}>Longitude: {region.longitude}</Text>
            </View>
            <MapView region={region} style={styles.maps}>
                <Marker coordinate={region}></Marker>
            </MapView>
        </SafeAreaView>
    );
}

export default Maps;
