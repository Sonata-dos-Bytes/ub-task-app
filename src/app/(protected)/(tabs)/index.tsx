import { Text, View, StyleSheet } from "react-native"

import { useSession } from "@/src/contexts/auth-context"
import Header from "@/src/components/header"
import { useTasks } from "@/src/hooks/use-tasks"
import { useEffect } from "react"

export default function Home() {
  const { user } = useSession()
  const userData = user()

  const { tasks, loading, error, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

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
