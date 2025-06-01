import { Task } from "../../../types/task-types";
import { Link, useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator, Linking, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { RenderHTML, RenderHTMLProps } from 'react-native-render-html';
import { Text } from "react-native-paper"
import { Button } from "react-native-magnus";
import Colors from "../../../constants/colors"
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons"
import { useCountdown } from "@/src/hooks/use-countdown";


export default function TaskDetails() {
    const { width } = useWindowDimensions();
    const params = useLocalSearchParams();
    const [loading, setLoading] = useState(false)
    const task: Task = params as unknown as Task;
    const { isOverdue, dinamicCountdownText } = useCountdown(task.dateEnd);

    const tagsStyles: RenderHTMLProps['tagsStyles'] = {
        h2: {
            fontSize: 20,
            fontWeight: '700',
            marginTop: 16,
            marginBottom: 8,
        },
        h3: {
            fontSize: 18,
            fontWeight: '600',
            marginTop: 12,
            marginBottom: 6,
        },
        p: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 12,
        },
        ul: {
            marginVertical: 6,
            paddingLeft: 16,
        },
        li: {
            fontSize: 16,
            lineHeight: 22,
            marginBottom: 4,
        },
    };

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
                        <Text style={{ ...styles.title, fontFamily: "Poppins_700Bold", paddingHorizontal: 5 }}>
                            {task.title}
                        </Text>
                    </View>
                    <Text style={{ ...styles.subtitle, fontFamily: "Poppins_600SemiBold" }}>
                        {task.matter}
                    </Text>
                </View>

                <View style={styles.date}>
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
            </View>

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={styles.contentContainer}>
                    <View style={styles.titleContent}>
                        <Text style={{ ...styles.title, fontFamily: "Poppins_700Bold" }}>
                            Descrição
                        </Text>
                    </View>

                    <RenderHTML
                        contentWidth={width}
                        source={{
                            html: task.taskDetails,
                        }}
                        baseStyle={{
                            fontFamily: "Poppins_400Regular",
                            color: "#000",
                            fontSize: 14,
                            lineHeight: 20,
                        }}
                        tagsStyles={tagsStyles}
                        enableExperimentalMarginCollapsing={true}
                    />
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
        width: "100%",
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
        backgroundColor: "#fff",
        bottom: 0,
        paddingHorizontal: 16,
        width: "100%",
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
});