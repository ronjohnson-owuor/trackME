import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/Styles';
import Fontawesome from '@expo/vector-icons/FontAwesome';

function Routes() {
        const [allRoutes,setallRoutes] = useState<string[]>([]);
        const getAllRoutes = async  () => {
         let routes = await AsyncStorage.getAllKeys();
         setallRoutes(Array.from(routes));
        }

        useEffect(()=>{
          getAllRoutes();
        },[]);


    return (
<ScrollView>
    {
        allRoutes.map((route,index)=>(
            <View key={index}>
                <Text >{route}</Text>
                <TouchableOpacity  style={styles.startbutton}>
                   <Text style={styles.buttonText}><Fontawesome name='trash'/>&nbsp;&nbsp;delete</Text> 
            </TouchableOpacity>
            <TouchableOpacity  style={styles.startbutton}>
                   <Text style={styles.buttonText}><Fontawesome name='eye'/>&nbsp;&nbsp;view</Text> 
            </TouchableOpacity>
                </View>
           
        ))
    }
    
</ScrollView>
    );
}

export default Routes;