import React, {useEffect} from "react";
import { useNavigation } from "@react-navigation/core";
import { StyleSheet, View, Text, KeyboardAvoidingView, TextInput, Image, Button, ScrollView, Pressable, TouchableOpacity } from 'react-native';

import {firebase} from './config';
const auth = firebase.auth();


const LoginScreen = () => {
    const navigation = useNavigation()

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    useEffect(() => {
        const logout = auth.onAuthStateChanged(user => {
            if (user) {
                //user is logged in
                navigation.navigate('Home');
                console.log('logged in');
            }
        })
        return logout
    })

    const handleLogin = () => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Eingeloggt mit: ', user.email);
            })
            .catch(error => alert(error.message))
    }
    const handleSignup = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            //.currentUser
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log('Registriert mit ', user.email);
            })
            .catch(error => alert(error.message))
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput placeholder={"Email"} style={styles.input} value={email} onChangeText={txt => setEmail(txt)}>

                </TextInput>
                <TextInput placeholder={"Password"} style={styles.input} value={password} onChangeText={txt => setPassword(txt)} secureTextEntry>

                </TextInput>

            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={styles.button}
                >
                    <Text sytle={styles.btnText}>Login</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSignup}
                    style={[styles.button, styles.btnOutline]}
                >
                    <Text sytle={styles.btnOutlineText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    );
}

export default LoginScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },


    inputContainer: {
        width: '80%',

    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    },
    btnContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,

    },
    button: {
        backgroundColor: '#D37506',
        width: '100%',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',


    },

    btnOutline: {
        borderColor: '#D37506',
        backgroundColor: 'white',
        borderWidth: 2,
        marginTop: 5,


    },
    btnText: {
        color: 'white',
        fontSize: 15,

    },

    btnOutlineText: {
        color: '#D37506',
        fontSize: 30,
    },
})


