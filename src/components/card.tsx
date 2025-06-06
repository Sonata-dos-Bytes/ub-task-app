import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { Task } from "../types/task-types"
import { getRandomColor } from "../scripts/color"
import { useRouter } from "expo-router"
import { useCountdown } from "../hooks/use-countdown";

const Card = ({ data }: { data: Task }) => {
  const router = useRouter();
  const [bgColor] = useState(() => getRandomColor());
  const { isOverdue, dinamicCountdownText } = useCountdown(data.dateEnd);

  const handlePress = () => {
    router.push({
      pathname: "/tasks/task",
      params: { ...data },
    });
  };

  return (
    <Pressable style={styles.card} onPress={handlePress}>
      <View style={styles.header}>
        <View
          style={{
            ...styles.iconContainer,
            backgroundColor: bgColor,
          }}>
          <MaterialIcons name="description" size={24} color="white" />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.title,
              fontFamily: "Poppins_700Bold",
            }}>
            {data.title}
          </Text>
          <Text
            style={{
              ...styles.subtitle,
              fontFamily: "Poppins_600SemiBold",
            }}>
            {data.matter}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <MaterialIcons name="schedule" size={18} color={isOverdue ? "#ef4444" : "#fbbf24"} />
        <Text
          style={{
            ...styles.dateText,
            fontFamily: "Poppins_500Medium",
            color: isOverdue ? "#ef4444" : "#fbbf24",
          }}>
          {dinamicCountdownText()}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    marginVertical: 12,
    borderColor: "#dbeafe",
    borderWidth: 1,
    width: "90%",
    minHeight: 160,
    alignSelf: "center",
    minWidth: 360,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconContainer: {
    backgroundColor: "#22c55e",
    padding: 8,
    borderRadius: 6,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: "#0D1B34",
    fontSize: 16,
  },
  subtitle: {
    color: "#94a3b8",
    marginTop: 4,
    textTransform: "uppercase",
    fontSize: 12,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    marginLeft: 6,
    color: "#f59e0b",
    fontSize: 14,
  },
})

export default Card
