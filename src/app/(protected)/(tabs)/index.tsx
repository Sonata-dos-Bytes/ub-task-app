import { Text, View } from 'react-native';
import { useSession } from '@/src/contexts/auth-context';
import { useTasks } from '@/src/hooks/use-tasks';
import { use, useEffect } from 'react';
import { Link } from 'expo-router';

export default function Home() {
  const { user } = useSession();
  const userData = user();

  const { tasks, loading, error, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pagina Home</Text>

      <Text>Bem vindo {userData?.name}</Text>

      <Text>Login: {userData?.authorization.login}</Text>

      {tasks.map((task, i) => (
        <Link href={{
          pathname: `/tasks/task`,
          params: { 
            ...task,
          },
        }}><Text key={i}>{task.title}</Text></Link>
      ))}

      <Text
        onPress={() => {
          fetchTasks();
        }}
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007bff',
        }}
        >
        Recarregar
      </Text>
    </View>
  );
}
