import { StyleSheet, View, Text, Pressable } from "react-native";

export const GoalItem = ({goalItemData, setGoalsList}) => {
    const {item: {text, id}} = goalItemData;

    const handleGoalRemoval = (id) => {
        setGoalsList((currentGoalsList) => currentGoalsList.filter((goal) => goal.id !== id));
    };

    return (
        <View style={styles.goalItem}>
            <Pressable 
                onPress={() => handleGoalRemoval(id)} 
                android_ripple={{color: "#210644"}}
                style={({pressed}) => pressed && styles.pressedItem} // can pass a function into the style prop. This function gets automatically called by Pressable whenever the `pressed` state changes => automatically get an object containing information about the `pressed` state, so we can destructure `pressed` off of this object directly. It is the same as doing (pressedData) => pressedData.pressed && styles.pressedItem
            >
                {/* property `item` on goalItemData contains the actual element in the goalsList array */}
                {/* `text` property on goalItemData.item.text is pulling the text property off of each element stored in the array */}
                <Text style={styles.goalText}>{text}</Text> 
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    goalItem: {
        backgroundColor: "#7627f5",
        borderRadius: 8,
        marginBottom: 10,
        width: "90%",
      },
      
      goalText: {
        color: "#ffffff",
        padding: 10,
      },

      pressedItem: {
        opacity: 0.5,
      }
})