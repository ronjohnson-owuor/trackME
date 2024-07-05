import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../styles/Styles';
import Fontawesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


function Start() {

    const navigation = useNavigation();
    const [walkName,setwalkName] = useState("");
    const validateName = () =>{
        if (walkName == "") {
            alert("please enter a the name of your walk")
            return;
        }
        // redirect to maps
        //  @ts-ignore
        navigation.navigate("map");
    }


    


    return (
        <SafeAreaView style={styles.bodyView}>
            <Text style={styles.heading}>give your walk a name</Text>
            <TextInput onChangeText={(text)=>setwalkName(text)} placeholder='name your walk' style={styles.TextInput}></TextInput>
                <TouchableOpacity onPress={validateName} style={styles.startbutton}>
                   <Text style={styles.buttonText}><Fontawesome name='hourglass-start'/>&nbsp;&nbsp;start walk</Text> 
            </TouchableOpacity>
        </SafeAreaView>
    );
}

export default Start;