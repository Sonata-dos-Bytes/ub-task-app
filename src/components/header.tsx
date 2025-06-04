import { router } from "expo-router"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from "react-native"
import { Avatar } from "react-native-magnus"
import { useSession } from "../contexts/auth-context"
import { Feather } from "@expo/vector-icons"
import { IUserData } from "../types/user-type"

export default function Header({ user }: { user: IUserData }) {
  const { signOut } = useSession()

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View>
            {user.userPicture ? (
              <Avatar source={{ uri: user.userPicture }} size={40} />
            ) : (
              <Avatar bg="gray300" size={40} color="gray800">
                {user.userInitials}
              </Avatar>
            )}
          </View>
          <View style={{ width: "80%" }}>
            <Text
              style={{ ...styles.title, fontFamily: "Poppins_400Regular" }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              Olá,{" "}
              <Text
                style={{ fontFamily: "Poppins_600SemiBold" }}
              >
                {user.name
                  .split(" ")
                  .slice(0, 1)
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </Text>
            </Text>
            <Text
              style={{ ...styles.subtitle, fontFamily: "Poppins_500Medium" }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              R.A: {user.authorization.login}
            </Text>
          </View>
        </View>
        <View>
          <Feather
            name="log-out"
            size={20}
            color="#fff"
            onPress={() => {
              signOut()
              router.replace("/login")
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#9A3234",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#9A3234",
    paddingVertical: 45,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  headerContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 18,
  },
  subtitle: {
    color: "#fff",
    fontSize: 16,
  },
})
