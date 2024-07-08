import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/Styles';
import Fontawesome from '@expo/vector-icons/FontAwesome';
import { Link, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Start() {

    const navigation = useNavigation();
    const [walkName,setwalkName] = useState("");
    const validateName = async () =>{
        if (walkName == "") {
            alert("please enter a the name of your walk")
            return;
        }
        // save the walk_name
        let personHasWalkedAlready = await AsyncStorage.getItem(walkName);
        if(personHasWalkedAlready){
            alert("that walk is already in the database enter another name");
            return;
        }
        await AsyncStorage.setItem("walk_name",walkName);
        // redirect to maps
        //  @ts-ignore
        navigation.navigate("map",{screen:'start walking'});
    }


    


    return (
        <SafeAreaView style={styles.bodyView}>
            <Text style={styles.heading}>give your walk a name</Text>
            <TextInput onChangeText={(text)=>setwalkName(text)} placeholder='name your walk' style={styles.TextInput}></TextInput>
                <TouchableOpacity onPress={validateName} style={styles.startbutton}>
                   <Text style={styles.buttonText}><Fontawesome name='hourglass-start'/>&nbsp;&nbsp;start walk</Text> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
       <Link to='/route' style={styles.buttonText}> <Fontawesome name='plus'/>my routes</Link>
      </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Start;