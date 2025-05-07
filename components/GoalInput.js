import { useState } from "react";

import { StyleSheet, View, TextInput, Button, Modal, Image } from "react-native"

export const GoalInput = ({setTextError, setGoalsList, showModal, setShowModal}) => {
    const [textInput, setTextInput] = useState("");

    const handleInputChange = (enteredText) => {
        // console.log(enteredText);
        setTextInput(enteredText);
    };
    
    const handleAddGoalPress = () => {
        if(textInput.length > 0){
          // setGoalsList([...goalsList, textInput]); // this works...
          // but, recommended way of updating state if state updates depend on the previous state -- pass a callback function that automatically receives the existing state as an input
          setGoalsList((currentGoals) => [...currentGoals, {text: textInput, id: Math.random().toString()}]);
          setTextInput("");
          setTextError("");
          setShowModal(false);
    
        } else {
          setTextError("Cannot add an empty goal!");
          setTimeout(() => {
            setTextError("");
          }, 3000)
        }
    };

    return (
        // modal has built in `visible` and `animationType` props we can use to add a slide effect when modal is toggled
        <Modal visible={showModal} animationType="slide"> 
            <View style={styles.inputContainer}>
                <Image source={require('../assets/images/goal.png')} style={styles.image}></Image>
                <TextInput value={textInput} style={styles.textInput} placeholder="Your course goal!" onChangeText={handleInputChange}></TextInput>
                
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title="Add Goal" color={"#b180f0"} onPress={handleAddGoalPress}></Button>
                    </View>
                    <View style={styles.button}>
                        <Button title="Cancel" color={"#f31282"} onPress={() => setShowModal(false)}></Button>
                    </View>
                    
                </View>
                
            </View>
        </Modal>
    )
};

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        backgroundColor: "#0a001a",
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },

    button: {
        width: "30%",
        marginHorizontal: 8,
    }
,
    textInput: {
        borderWidth: 1,
        borderColor: "#330485",
        borderRadius: 6,
        width: "100%",
        marginBottom: 10,
        padding: 16,
        backgroundColor: "#330485",
        color: "#ffffff"
    },

    image: {
        width: 100,
        height: 100,
        margin: 20,
    }
})