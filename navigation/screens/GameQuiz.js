import { StyleSheet, Text, Image, View, TouchableOpacity, FlatList, Button, ScrollView } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import firebase from 'firebase/compat';
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const GameQuiz = () => {

    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [selectedQuizName, setselectedQuizName] = useState("")


 

    useEffect(() => {
        const unsubscribe = firebase.firestore().collection('quiz').onSnapshot(querySnapshot => {
            const dataArray = [];
            querySnapshot.forEach(doc => {
                dataArray.push(doc.data());
            });
            setData(dataArray);
        });

        return () => {
            unsubscribe();
        }
    }, [data]);

    
    const handleonQuiz = (quizName) => {
        //console.log("quizName: " + quizName)
        setselectedQuizName(quizName);
        console.log("selectedQuizname : "+ selectedQuizName)
        navigation.navigate('Questions',{quizName: quizName});
    }




    return (

        <View style={styles.container}>
            <ScrollView style={{ width: '100%' }}>
                {data.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.quizlist} onPress={() => handleonQuiz(item.question1.quizName)} >
                        <Text>Quizname: {item.question1.quizName}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}



/*
<Text>Quizname: { JSON.stringify(item.question1)}</Text>
                <Text>{console.log(JSON.stringify(item.question1))}</Text>


<TouchableOpacity style={styles.quizlist} key={index}>
                    <Text>Quizname: {item.quizName}</Text>
                    {console.log(data.quizName)}
                </TouchableOpacity>*/


const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },

    quizlist: {
        width: "90%",
        marginTop: "4%",
        height: 60,
        padding: 20,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        alignSelf: "center"
    },



})


export default GameQuiz;