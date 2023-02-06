import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, ScrollView, Button } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { RadioButton } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import firebase from 'firebase/compat';



const CreateQuiz = () => {


    const [quiz, setQuiz] = useState([])
    const [correctAnswer, setcorrectAnswer] = useState("answer0")

    const handleAddQuestion = () => {


        setQuiz([...quiz, {
            question: "",
            quizName: "",
            image: null,
            answer0: "",
            answer1: "",
            answer2: "",
            answer3: "",
            correctAnswer: "",
        }]);
    }

    const dataObject = {};


    const handleSave = () => {
        quiz.forEach((question, index) => {
            dataObject[`question${index + 1}`] = {
                ...question, correctAnswer: correctAnswer,
            };
        });

        firebase.firestore().collection('quiz').add(dataObject) //.doc()
            .then(() => {
                console.log('Quiz saved successfully');
                setQuiz([])
            })
            .catch((error) => {
                console.error('Error saving quiz', error);
            });
    };

    const pickImage = async (question) => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setQuiz(quiz.map(q => q === question ? { ...q, image: result.uri } : q));
        }

    }

    const takePhoto = async (question) => {
        try {
            const permissionRS = await ImagePicker.requestCameraPermissionsAsync();

            if (permissionRS.granted === false) {
                alert("No access to your camera");
                return;
            }

            let result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            console.log(result);

            if (!result.canceled) {
                setQuiz(quiz.map(q => q === question ? { ...q, image: result.uri } : q));
            }
        } catch (error) {
            console.error(error);
        }
    }

 





    return (


        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <ScrollView style={{ width: '100%' }}>

                <View style={{ alignItems: 'center', width: "100%", height: '100%' }}>

                    <TouchableOpacity onPress={handleAddQuestion} style={styles.btnAdd}>
                        <Text style={{ color: 'white' }}>Add Question</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSave} style={styles.btnSave}>
                        <Text style={{ color: 'white' }}>Save Quiz</Text>
                    </TouchableOpacity>

                    {quiz.map((question, index) => (

                        <View key={index} style={styles.cardStyle}>

                            <Text>Quiz name</Text>
                            <TextInput
                                style={styles.inputName}
                                placeholder="Quiz name"
                                value={question.quizName}
                                maxLength={20}
                                onChangeText={text => setQuiz(quiz.map(q => q === question ? { ...q, quizName: text } : q))}
                            />
                            <Text >Question</Text>
                            <View style={styles.container}>

                                <TextInput
                                    style={styles.inputQuestion}
                                    placeholder="Enter a question"
                                    value={question.question}
                                    maxLength={47}
                                    onChangeText={text => setQuiz(quiz.map(q => q === question ? { ...q, question: text } : q))}
                                />

                                <View style={{display:"flex", flexDirection: "row", marginBottom: 10, marginTop: 5}}>
                                    <TouchableOpacity onPress={() => pickImage(question)} title="Choose from Gallary" style={styles.openGallery} >
                                        <Text>Choose from Gallary</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => takePhoto(question)} title="take Photo" style={styles.takePhoto} >
                                        <Text>Take Photo</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.imageHalf}>

                                    <View >
                                        {question.image && <Image source={{ uri: question.image }} style={{ width: "100%", height: "100%", borderRadius: 10 }} />}
                                    </View>


                                </View>



                                <View style={styles.answerHalf}>



                                    <View style={styles.answerContainer}>
                                        <View style={styles.card_answer}>
                                            <TextInput
                                                style={styles.inputAnswer}
                                                placeholder="Enter a answer"
                                                value={question.answer0}
                                                maxLength={14}
                                                placeholderTextColor="white"
                                                color="white"
                                                onChangeText={text => {
                                                    setQuiz(quiz.map(q => q === question ? { ...q, answer0: text } : q))
                                                }}
                                            />
                                            <View style={styles.radio_btn}>
                                                <RadioButton
                                                    value="answer0"
                                                    status={correctAnswer === "answer0" ? "checked" : "unchecked"}
                                                    onPress={() => setcorrectAnswer("answer0")}
                                                    

                                                />
                                            </View>
                                        </View>



                                        <View style={styles.card_answer1}>

                                            <TextInput
                                                style={styles.inputAnswer}
                                                placeholder="Enter a answer"
                                                value={question.answer1}
                                                maxLength={14}
                                                placeholderTextColor="white"
                                                color="white"
                                                onChangeText={text => setQuiz(quiz.map(q => q === question ? { ...q, answer1: text } : q))}
                                            />
                                            <View style={styles.radio_btn}>
                                                <RadioButton
                                                    value="answer1"
                                                    status={correctAnswer === "answer1" ? "checked" : "unchecked"}
                                                    onPress={() => setcorrectAnswer("answer1")}

                                                />
                                            </View>
                                        </View>

                                        <View style={styles.card_answer2}>
                                            <TextInput
                                                style={styles.inputAnswer}
                                                placeholder="Enter a answer"
                                                value={question.answer2}
                                                maxLength={14}
                                                placeholderTextColor="white"
                                                color="white"
                                                onChangeText={text => setQuiz(quiz.map(q => q === question ? { ...q, answer2: text } : q))}
                                            />
                                            <View style={styles.radio_btn}>
                                                <RadioButton
                                                    value="answer2"
                                                    status={correctAnswer === "answer2" ? "checked" : "unchecked"}
                                                    onPress={() => setcorrectAnswer("answer2")}

                                                />
                                            </View>
                                        </View>

                                        <View style={styles.card_answer3}>
                                            <TextInput
                                                style={styles.inputAnswer}
                                                placeholder="Enter a answer"
                                                value={question.answer3}
                                                maxLength={14}
                                                placeholderTextColor="white"
                                                color="white"
                                                onChangeText={text => setQuiz(quiz.map(q => q === question ? { ...q, answer3: text } : q))}
                                            />

                                            <View style={styles.radio_btn}>
                                                <RadioButton
                                                    value="answer3"
                                                    status={correctAnswer === "answer3" ? "checked" : "unchecked"}
                                                    onPress={() => setcorrectAnswer("answer3")}
                                                />
                                            </View>
                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>



    );
};





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

    takePhoto: {
        borderColor: "gray",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "orange",
        marginLeft: 5,
        padding: 5,
        borderWidth: 2,
        width: "45%",
        height: "100%",
        
    },

    openGallery: {
        borderColor: "gray",
        alignItems: "center",
        backgroundColor: "orange",
        borderRadius: 10,
        padding: 5,
        borderWidth: 2,
        width: "45%",
        height: "100%",
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
        height: "35%",
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


export default CreateQuiz;