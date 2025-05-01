import Colors from "@/src/constants/Colors";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { StyleSheet } from 'react-native'

interface btnProps {
    text: String;
    disable?: boolean;
    onPress?: Function;
}

export default function ButtonConfirm({
    text = "",
    disable = false,
    onPress = () => {},
}: btnProps) {
    return (
        <TouchableOpacity
            style={[styles.btn, { opacity: disable ? 0.31 : 1 }]}
            onPress={() => onPress()}
            disabled={disable ? true : false}
        >
            <Text style={styles.btnText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btn: {
        width: "100%",
        height: "auto",
        backgroundColor: Colors.light.primary,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 16, 
        borderRadius: 6,
    },
    btnText: {
        fontSize: 16,
        fontWeight: "500",
        height: 24,
        textAlign: "center",
        color: Colors.light.textLight,
    },
});