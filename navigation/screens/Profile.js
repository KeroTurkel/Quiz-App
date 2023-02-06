import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList, Button, useWindowDimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';

import { firebase } from './config';
const auth = firebase.auth();

export default function Profile() {

    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={styles.logout_btn} onPress={() => {
                auth.signOut().then(() => {
                    navigation.navigate("Login");
                    console.log('User logged out');
                    alert('You are logged out');
                })
                    .catch(error => {
                        console.error(error);
                    });
            }}>
                <Text style={{fontSize: 20}}>Logout</Text>
                
            </TouchableOpacity>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },

    logout_btn:{
        width: "50%",
        alignItems: "center",
        backgroundColor: '#D37506',
        padding: 10,
        borderRadius: 8,
    },
})