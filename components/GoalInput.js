import { useState } from "react";

import { StyleSheet, View, TextInput, Button } from "react-native"

export const GoalInput = ({setTextError, setGoalsList}) => {
    const [textInput, setTextInput] = useState("");

    const handleInputChange = (enteredText) => {
        // console.log(enteredText);
        setTextInput(enteredText);
    };
    
    const handlePress = () => {
        if(textInput.length > 0){
          // setGoalsList([...goalsList, textInput]); // this works...
          // but, recommended way of updating state if state updates depend on the previous state -- pass a callback function that automatically receives the existing state as an input
          setGoalsList((currentGoals) => [...currentGoals, {text: textInput, id: Math.random().toString()}]);
          setTextInput("");
          setTextError("");
    
        } else {
          setTextError("Cannot add an empty goal!");
          setTimeout(() => {
            setTextError("");
          }, 3000)
        }
    };

    return (
        <View style={styles.inputContainer}>
            <TextInput value={textInput} style={styles.textInput} placeholder="Your course goal!" onChangeText={handleInputChange}></TextInput>
            <Button title="Add Goal" onPress={handlePress}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    textInput: {
        borderWidth: 1,
        borderColor: "#CCCCCC",
        width: "70%",
        marginRight: 8,
        padding: 8,
        backgroundColor: "#ffffff",
    },
})