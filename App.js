import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

//import components
import { GoalItem } from './components/GoalItem';
import { GoalInput } from './components/GoalInput';

export default function App() {

  const [textError, setTextError] = useState("");
  const [goalsList, setGoalsList] = useState([]); // to be a list of objects
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(true);
  }

  return (
    <>
      <StatusBar style="light"></StatusBar>
      {/* main view */}
      <View style={styles.appContainer}>
        <View style={styles.buttonContainer}>
          <Button title="Add New Goal!" color="#7627f5" onPress={toggleModal}></Button>
        </View>
        
        {/* view / div that holds the input and button */}
        <View style={styles.inputView}>
          {/* conditionally render GoalInput component */}
          {
            showModal && <GoalInput setTextError={setTextError} setGoalsList={setGoalsList} showModal={showModal} setShowModal={setShowModal}></GoalInput>
          }
          
          {/* conditionally render textError */}
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
            renderItem={(itemData) => { //callback function passed to renderItem automatically receives an object as an input-- each object contains metadata & represents each element in goalsList array
            return (
              <GoalItem goalItemData={itemData} setGoalsList={setGoalsList}></GoalItem> //property `item` on object contains our actual array element
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
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#0a001a",
  },

  buttonContainer: {
    padding: 8,
    position: "relative",
    top: 30,
  },

  inputView: {
    flex: 1,
    marginTop: 24,
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc"
  },

  textError: {
    color: "#FF00FF",
    marginTop: 20,
  },

  goalsContainer: {
    flex: 8,
  },

});
