import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

export default function App() {

  const [textInput, setTextInput] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  const handleInputChange = (enteredText) => {
    // console.log(enteredText);
    setTextInput(enteredText);
  };

  const handlePress = () => {
    // setGoalsList([...goalsList, textInput]); // this works...
    // but, recommended way of updating state if state updates depend on the previous state -- pass a callback function that automatically receives the existing state as an input
    setGoalsList((currentGoals) => [...currentGoals, textInput]);
    setTextInput("");
  };

  return (
    // main view
    <View style={styles.appContainer}>
      {/* view / div that holds the input and button */}
      <View style={styles.inputContainer}>
        <TextInput value={textInput} style={styles.textInput} placeholder="Your course goal!" onChangeText={handleInputChange}></TextInput>
        <Button title="Add Goal" onPress={handlePress}></Button>
      </View>

      {/* view / div that holds the list of goals */}
      <View style={styles.goalsContainer}>
        <ScrollView>
          {
            goalsList && goalsList.map((goal, index) => {
              return <Text style={styles.goalItem} key={index}>{goal}</Text>
            })
          }
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#0a001a",
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    width: "70%",
    marginRight: 8,
    padding: 8,
    backgroundColor: "#ffffff",
  },

  goalsContainer: {
    flex: 5,
  },

  goalItem: {
    backgroundColor: "#7627f5",
    color: "#ffffff",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "90%",

  },


});
