import React from 'react';
import {  Alert, SafeAreaView, Text,  TouchableOpacity, View } from 'react-native';
import styles from '../styles/Styles';
import Fontawesome from '@expo/vector-icons/FontAwesome';
import { Link } from '@react-navigation/native';

export default function Home() {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading_nav}>TRACK ME</Text>
      </View>
      <View style={styles.bodyView}>
        <Text style={styles.heading}>track yourself <Text style={{color:'#FF6347'}}>everywhere</Text></Text>
        <Text style={styles.explainer}>This app maps your movements while walking and draws it to you on a maps.Click to start mapping</Text>
        <TouchableOpacity style={styles.button}>
       <Link to='/Start' style={styles.buttonText}> <Fontawesome name='plus'/> new walk</Link>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}