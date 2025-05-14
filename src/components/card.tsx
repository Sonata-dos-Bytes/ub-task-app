import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons" // Para o ícone de relógio
import { Task } from "../types/task-types"
import { getRandomColor } from "../scripts/color"
import { useFonts } from "expo-font"
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts as usePoppinsFonts,
} from "@expo-google-fonts/poppins"

const Card = ({ data }: { data: Task }) => {
  const [fontsLoaded] = usePoppinsFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View
          style={{
            ...styles.iconContainer,
            backgroundColor: getRandomColor(),
          }}>
          <MaterialIcons name="description" size={24} color="white" />
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{
              ...styles.title,
              fontFamily: "Poppins",
              fontWeight: "700",
            }}>
            {data.title}
          </Text>
          <Text
            style={{
              ...styles.subtitle,
              fontFamily: "Poppins",
              fontWeight: "400",
            }}>
            {data.matter}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <MaterialIcons name="schedule" size={18} color="#fbbf24" />
        <Text
          style={{
            ...styles.dateText,
            fontFamily: "Poppins",
            fontWeight: "400",
          }}>
          {data.dateDetailsInPortuguese}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
    margin: 16,
    borderColor: "#dbeafe",
    borderWidth: 1,
    width: "100%",
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
    fontWeight: "bold",
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
