import { Task } from '@/src/types/task-types';
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function TaskDetails() {
    const params = useLocalSearchParams();
    const task: Task = params as unknown as Task;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text
                onPress={() => {
                    router.back();
                }}
            > Voltar </Text>

            <Text>Pagina Detalhes da Tarefa</Text>
            <Text>Nome: {task.title}</Text>
            <Text>Descrição: {task.dateDetailsInPortuguese}</Text>

            <Text
                onPress={() => {
                    // Redirecionar para a página de tarefas
                    console.log('Redirecionando...');
                }}
            >Redirecionar</Text>
        </View>
    );
}