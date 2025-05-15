import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native"

import { useSession } from "@/src/contexts/auth-context"
import Header from "@/src/components/header"
import Card from "@/src/components/card"
import { useState } from "react"
import { useTasks } from "@/src/hooks/use-tasks"

export default function Home() {
  const { user } = useSession()
  const { 
    tasks,
    loading,
    error,
    fetchTasks 
  } = useTasks();
  const userData = user()

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    if (!userData) return

    setRefreshing(true)

    try {
      await fetchTasks();
    } catch (error) {
      console.error("Erro ao atualizar tarefas:", error)
    } finally {
      setRefreshing(false)
    }
  }

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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {tasks &&
            Object.values(tasks).map((task, index) => (
              <Card key={index} data={task} />
            ))}
        </ScrollView>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 20,
    width: "100%",
  },
})
