import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { RadioButton } from 'react-native-paper';
import firebase from 'firebase/compat';



const Questions = ({ route }) => {

    console.log(route.params)
    const {quizName} = route.params?.quizName || '';

    const [data, setData] = useState([]);
    const [questionIndex, setquestionIndex] = useState(0)
    const [result, setResult] = useState("")

    useEffect(() => {
        firebase.firestore().collection('quiz').get()
            .then((querySnapshot) => {
                const dataArray = [];
                querySnapshot.forEach((doc) => {
                    dataArray.push(doc.data());

                });
                console.log(dataArray);
                setData(dataArray);

            });
    }, []);

    

    const handleAnswer = (answer) => {
        if(selectedQuestion.correctAnswer === answer){
            setquestionIndex(questionIndex + 1)
            setResult("Correct Answer")
        }else{
            setResult("Not correct")
        }
        
        
    };

    const selectedQuizData = data.find(quiz => quiz.quizName === quizName);
    const selectedQuestion = selectedQuizData && selectedQuizData[`question${questionIndex + 1}`];

    return (


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            
            <ScrollView style={{ width: '100%' }}>

                <View style={{ alignItems: 'center', width: "100%", height: '100%' }}>

                    {selectedQuestion && (

                        <View key={questionIndex} style={styles.cardStyle}>

                            <Text>Quizname: {selectedQuestion.quizName}</Text>

                            <Text>Question: {selectedQuestion.question}</Text>
                            
                            <View style={styles.container}>

                                <View style={styles.imageHalf}>

                                    <View >
                                        {selectedQuestion.image && (<Image source={{ uri: selectedQuestion.image }} style={{ width: "100%", height: "100%", borderRadius: 10 }} />)}
                                    </View>

                                </View>


                                <View style={styles.answerHalf}>



                                    <View style={styles.answerContainer}>
                                        <TouchableOpacity style={styles.card_answer} onPress={()=> handleAnswer("answer0")}>
                                            <Text>{selectedQuestion.answer0}</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.card_answer1} onPress={()=> handleAnswer("answer1")}>

                                            <Text>{selectedQuestion.answer1}</Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.card_answer2} onPress={()=> handleAnswer("answer2")}>
                                            <Text>{selectedQuestion.answer2}</Text>

                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.card_answer3} onPress={()=> handleAnswer("answer3")}>

                                            <Text>{selectedQuestion.answer3}</Text>

                                        </TouchableOpacity>

                                        <Text>{result}</Text>
                                    </View>

                                </View>
                            </View>
                        </View>
                    )}

                </View>
            </ScrollView>
        </View>



    );
};


export default Questions;


const styles = StyleSheet.create({

    btnAdd: {
        marginBottom: '1%',
        marginTop: '3%',
        backgroundColor: '#D37506',
        padding: 5,
        borderRadius: 8,
    },

    btnSave: {
        marginBottom: '2%',
        marginTop: '3%',
        backgroundColor: '#D37506',
        padding: 5,
        borderRadius: 8,
    },
    cardStyle: {
        width: "90%",
        marginTop: "4%",
        height: 600,
        padding: 20,
        borderRadius: 16,
        backgroundColor: "#ffffff",
        alignSelf: "center"
    },


    container: {

        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: "column",
        flexWrap: "wrap",
    },

    btnPhoto: {

    },


    imageHalf: {
        alignSelf: "center",
        width: "100%",
        height: "30%",
        borderRadius: 10,
        backgroundColor: 'gray',


    },
    answerHalf: {
        width: "100%",
        height: "37%",
        marginTop: 10,
    },

    //Radio button############################

    radio_btn: {
        backgroundColor: "white",
        borderRadius: 20,
        marginTop: 4,
    },


    //######################

    answerContainer: {

        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },

    card_answer: {
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 8,
        width: "48%",
        height: "52%",
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        backgroundColor: "#C60929",
    },

    card_answer1: {
        marginBottom: 10,
        marginLeft: 0,
        width: "48%",
        height: "52%",
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        backgroundColor: "#25076B",

    },

    card_answer2: {
        marginBottom: 10,
        marginLeft: 0,
        marginRight: 8,
        width: "48%",
        height: "52%",
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        backgroundColor: "#FFC00A",

    },

    card_answer3: {
        marginBottom: 10,
        marginLeft: 0,
        width: "48%",
        height: "52%",
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        backgroundColor: "#26890C",

    },


    inputContainer: {
        width: '80%',
        borderWidth: 2,
    },
    inputName: {
        maxWidth: '60%',
        padding: 5,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 6,
        marginBottom: 5,
    },
    inputQuestion: {
        width: "100%",
        maxWidth: '100%',
        padding: 5,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 6,
        marginBottom: 5,

    },
    inputDescription: {
        width: '100%',
        height: '60%',
        padding: 5,
        borderColor: 'gray',
        borderWidth: 2,
        borderRadius: 6,
    },

    inputAnswer: {
        width: "100%",
        padding: 5,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 6,
    },

})


