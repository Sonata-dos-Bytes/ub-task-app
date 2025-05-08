import { Text, View } from 'react-native';

import { useSession } from '@/src/contexts/auth-context';

export default function Profile() {
  const { signOut, user } = useSession();
  const userData = user();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Pagina Perfil</Text>

      <Text
        onPress={() => {
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
