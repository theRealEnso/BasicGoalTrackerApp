import { StyleSheet, View, Text, Pressable } from "react-native";

export const GoalItem = ({goalItemData, setGoalsList}) => {
    const {item: {text, id}} = goalItemData;

    const handleGoalRemoval = (id) => {
        setGoalsList((currentGoalsList) => currentGoalsList.filter((goal) => goal.id !== id));
    };

    return (
        <Pressable onPress={() => handleGoalRemoval(id)}>
            <View>
                {/* property `item` on goalItemData contains the actual element in the goalsList array */}
                {/* `text` property on goalItemData.item.text is pulling the text property off of each element stored in the array */}
                <Text style={styles.goalItem}>{text}</Text> 
            </View>
        </Pressable>

    )
}

const styles = StyleSheet.create({
    goalItem: {
        backgroundColor: "#7627f5",
        color: "#ffffff",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        width: "90%",
      },
})