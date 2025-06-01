import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
} from "react-native"
import { useSession } from "@/src/contexts/auth-context"
import Header from "@/src/components/header"
import Card from "@/src/components/card"
import { useEffect, useState } from "react"
import { useTasks } from "@/src/hooks/use-tasks"
import colors from "@/src/constants/colors"

export default function Home() {
  const { user } = useSession()
  const userData = user()

  const {
    loading,
    error,
    fetchTasks,
    getTasksBy
  } = useTasks();
  const tasks = getTasksBy({
    include: ["upcoming", "due"]
  })
  const hasTasks = tasks && Object.values(tasks).length > 0;

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

  const [dotCount, setDotCount] = useState(0);
  const dots = ".".repeat(dotCount);

  useEffect(() => {
    if (!loading) return;             
    const interval = setInterval(() => {
      setDotCount(dc => (dc + 1) % 4); 
    }, 500);                           
    return () => clearInterval(interval);
  }, [loading]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          }
        >
          {hasTasks ? (
            Object.values(tasks).map((task, index) => (
              <Card key={index} data={task} />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              {loading ? (
                <Text style={styles.emptyText}>
                  Buscando atividades{dots}
                </Text>
              ) : (
                <Text style={styles.emptyText}>
                  Não há atividades por enquanto ;)
                </Text>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#94a3b8",
    fontStyle: "italic",
    textAlign: "center",
  },
})
