import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';

export default function App() {

  const [textInput, setTextInput] = useState("");
  const [textError, setTextError] = useState("");
  const [goalsList, setGoalsList] = useState([]); // to be a list of objects

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
      const errorMessageTimeOut = setTimeout(() => {
        setTextError("");
      }, 3000)
    }
  };

  return (
    // main view
    <View style={styles.appContainer}>
      {/* view / div that holds the input and button */}
      <View style={styles.inputView}>
        <View style={styles.inputContainer}>
          <TextInput value={textInput} style={styles.textInput} placeholder="Your course goal!" onChangeText={handleInputChange}></TextInput>
          <Button title="Add Goal" onPress={handlePress}></Button>
        </View>

        {
          textError && (
            <View>
              <Text style={styles.textError}>{textError}</Text>
            </View>
          )
        }
      </View>

      {/* view / div that holds the list of goals */}
      <View style={styles.goalsContainer}>
      {/* using FlatList instead of ScrollView for optimization => FlatList only renders what is necessary on the phone's current view and lazy loads the remaining data as the user continues to scroll. This is better than ScrollView because ScrollView will render everything, regardless if we have a list that is 50, 100, or 1000 items long. */}
      {/*FlatList needs data and renderItem props */}
        <FlatList 
          data={goalsList} 
          renderItem={(itemData) => { //callback function passed to renderItem automatically receives an object as an input
          return (
            <View>
            {/* property `item` on itemData represents each element in the goalsList array */}
            {/* `text` property on itemData.item.text is pulling the text property off of each element stored in the array */}
              <Text style={styles.goalItem}>{itemData.item.text}</Text> 
            </View>
          )
        }}
        //FlatList requires a key, similar to when we map through array elements
        //since our data doesn't explicitly have a `key` property but instead has an `id` property, we can use `keyExtractor` prop to extract the `id` property on each array element and map it to a FlatList's internal key.
        keyExtractor={(item, index) => { // callback function automatically receives each array element and its index
          return item.id;
        }}
        >
        </FlatList>
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

  inputView: {
    flex: 1,
    marginTop: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },

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

  textError: {
    color: "#FF00FF",
    marginTop: 20,
  },

  goalsContainer: {
    flex: 8,
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
