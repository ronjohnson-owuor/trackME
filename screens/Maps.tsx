import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from '../styles/Styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function Maps() {
    // initialize the location variable
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const[name,setName] =useState("walk name");
    const navigation = useNavigation();
    // this is the starting point where the user will start his walk
    const [region, setRegion] = useState({
        
            latitudeDelta: 0.004,
            longitudeDelta: 0.004,
            latitude:0.0000,
            longitude: 0.0000
        
    });


    // save location
    const savePathCoordinates = async () => {
        try {
          // Get the walk name from AsyncStorage
          const walkName = await AsyncStorage.getItem('walk_name');
          
          // Check if walkName exists
          if (!walkName) {
            // Navigate to '/Start' screen if walk name is not set
            // Adjust your navigation logic as needed
            // @ts-ignore
            navigation.navigate('Start', { screen: 'walk name' });
            return;
          }
          setName(walkName);
          // Example of saving path coordinates
          let stringifiedArrayPath = JSON.stringify(pathCoordinates);
          
          // Save the path coordinates to AsyncStorage under the walkName
          await AsyncStorage.setItem(walkName, stringifiedArrayPath);
          console.log("👏 cordinates save");
          
        } catch (error) {
          console.error('Error saving coordinates:', error);
          // Handle error saving coordinates
          // For example, you can alert the user or log the error
          alert('Error saving coordinates. Please try again.');
        }
      };



    const [pathCoordinates, setPathCoordinates] = useState<Array<{ 
        latitude: number;
         longitude: number;
         latitudeDelta:number;
        longitudeDelta:number;
        accuracy: number;
    }>>([]);
    useEffect(() => {
        const intervalId = setInterval(updatePathCoordinates,500); // Update every 2seconds 
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
                      latitudeDelta: 0.004,
                      longitudeDelta: 0.004,
                      accuracy: location.coords.accuracy!
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
                latitudeDelta: 0.004,
                longitudeDelta: 0.004,
            })            
        }

    },[location?.coords]);


    useEffect(()=>{
            if(pathCoordinates.length !== 0){
                savePathCoordinates();
            }
    },[pathCoordinates]);

    return (
        <SafeAreaView style={styles.container}> 
            <View style={styles.LivePosUpdate}>
           
            <Text style={styles.LivePosUpdateText}>🚶‍♀️walk Name: {name}</Text>
            </View>         

            <MapView
            showsCompass={true}
            showsUserLocation={true}
            showsScale={true}
             region={pathCoordinates.length > 0 ?pathCoordinates[pathCoordinates.length-1]:region} style={styles.maps}>
                {/* starting point marker */}
                <Marker
                 coordinate={region}
                 pinColor="#000"
                 title="Start"
                 description="Starting point"
                 ></Marker>
                {/* current point marker */}
                {pathCoordinates.length > 0 &&
                  <Marker 
                  coordinate={pathCoordinates[pathCoordinates.length-1]}
                  pinColor="green"
                  title="currentPosition"
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
