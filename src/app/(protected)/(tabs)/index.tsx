import { Text, View, StyleSheet } from "react-native"

import { useSession } from "@/src/contexts/auth-context"
import Header from "@/src/components/header"

export default function Home() {
  const { user } = useSession()
  const userData = user()

  return (
    <View style={{ flex: 1 }}>
      {userData && <Header user={userData} />}

      <View style={styles.content}>
        <Text style={{ ...styles.title }} >Atividades Próximas</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 30,
  },
})
