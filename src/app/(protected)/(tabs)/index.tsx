import { Text, View } from 'react-native';

import { useSession } from '@/src/contexts/auth-context';

export default function Home() {
  const { user } = useSession();
  const userData = user();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pagina Home</Text>
      
      <Text>Bem vindo {userData?.name}</Text>

      <Text>Login: {userData?.authorization.login}</Text>
    </View>
  );
}
