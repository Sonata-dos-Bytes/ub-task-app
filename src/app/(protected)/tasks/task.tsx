import { Task } from "../../../types/task-types";
import { Link, useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Linking, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper"
import { Button } from "react-native-magnus";
import Colors from "../../../constants/colors"
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons"


export default function TaskDetails() {
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(false)
    const task: Task = params as unknown as Task;

    const onBack = () => {
        if (Platform.OS === "web") {
            window.history.back();
        } else {
            router.back();
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.header}>
                <View style={styles.textContainer}>
                    <View style={styles.headerContent}>
                        <TouchableOpacity onPress={onBack}>  
                            <MaterialIcons name="arrow-back" size={24} color="#0D1B34" />
                        </TouchableOpacity>
                        <Text style={{ ...styles.title, fontFamily: "Poppins_700Bold" }}>
                            {task.title}
                        </Text>
                    </View>
                    <Text style={{ ...styles.subtitle, fontFamily: "Poppins_600SemiBold" }}>
                        {task.matter}
                    </Text>
                </View>

                <View style={styles.date}>
                    <MaterialIcons name="schedule" size={18} color="#fbbf24" />
                    <Text style={{ ...styles.dateText, fontFamily: "Poppins_500Medium" }}>
                        {task.dateDetailsInPortuguese}
                    </Text>
                </View>
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.titleContent}>
                        <Text style={{ ...styles.title, fontFamily: "Poppins_700Bold" }}>
                            Descrição
                        </Text>
                    </View>

                    <Text style={{ ...styles.descriptionDetails, fontFamily: "Poppins_400Regular" }}>
                        {task.taskDetails}
                    </Text>
                </ScrollView>

                <View style={styles.buttonWrapper}>
                    <Button
                        block
                        rounded="lg"
                        h={50}
                        bg={Colors.light.primaryDark}
                        disabled={loading}
                        onPress={() => Linking.openURL(task.url)}
                    >
                        {loading ? (
                            <ActivityIndicator color={Colors.light.surface} />
                        ) : (
                            <Text
                                variant="titleMedium"
                                style={{
                                    color: Colors.light.textLight,
                                    fontFamily: "Poppins_600SemiBold",
                                }}
                            >
                                Visualizar no Portal
                            </Text>
                        )}
                    </Button>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 16,
        backgroundColor: "#F8F9FA",
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20,
        borderColor: "#8696BB1C",
        borderWidth: 2,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight ?? 0 : 20,
        paddingBottom: 20,
        marginBottom: 10,
        overflow: "hidden",
    },
    headerContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 10,
    },
    textContainer: {
        marginTop: 20,
    },
    date: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    dateText: {
        marginLeft: 6,
        color: "#f59e0b",
        fontSize: 14,
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    titleContent: {
        marginBottom: 12,
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
    descriptionDetails: {
        color: "#000",
        fontSize: 14,
        lineHeight: 20,
    },
    buttonWrapper: {
        position: "absolute",
        bottom: 20,
        left: 16,
        right: 16,
    },
});