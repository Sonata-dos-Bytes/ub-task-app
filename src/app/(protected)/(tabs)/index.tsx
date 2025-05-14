import { Text, View, StyleSheet } from "react-native"

import { useSession } from "@/src/contexts/auth-context"
import Header from "@/src/components/header"
import Card from "@/src/components/card"

export default function Home() {
  const { user, tasks } = useSession()
  const userData = user()

  return (
    <View style={{ flex: 1 }}>
      {userData && <Header user={userData} />}

      <View style={styles.content}>
        <View style={styles.titleContent}>
          <Text
            style={{
              ...styles.title,
              fontFamily: "Poppins_700Bold",
            }}>
            Atividades Próximas
          </Text>
        </View>

        {tasks &&
          Object.values(tasks).map((task, index) => (
            <Card key={index} data={task} />
          ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    width: "100%",
    backgroundColor: "white",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    fontSize: 20,
    color: "#0D1B34",
    textAlign: "left",
    marginBottom: 5,
  },
  titleContent: {
    width: "100%",
  },
})
