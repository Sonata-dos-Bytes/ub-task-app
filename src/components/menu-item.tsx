import React from "react";
import { StyleSheet, View, Text, Pressable, Linking } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import type { ComponentProps } from "react";
type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

interface MenuItemProps {
    title: string;
    icon: MaterialIconName;
    url?: string;
    onPress?: () => void;
}

export default function MenuItem({ title, icon, url, onPress }: MenuItemProps) {
    const handlePress = () => {
        if (url) {
            Linking.openURL(url);
        } else if (onPress) {
            onPress();
        }
    };

    return (
        <Pressable
            onPress={handlePress}
            style={({ pressed }) => [
                styles.profileMenuItem,
                pressed && styles.pressed,
            ]}
        >
            <Text style={[styles.menuTitle, { fontFamily: "Poppins_700Bold" }]}>
                {title}
            </Text>
            <MaterialIcons name={icon} size={25} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    profileMenuItem: {
        flexDirection: "row",
        justifyContent: "space-between",
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
        width: "100%",
        minHeight: 50,
        alignItems: "center",
    },
    pressed: {
        opacity: 0.6,
    },
    menuTitle: {
        color: "#0D1B34",
        fontSize: 16,
        flex: 1,
        textAlign: "left",
    },
});
