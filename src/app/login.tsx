import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '@/src/contexts/AuthContext';

export default function Login() {
  const { signIn } = useSession();

  const handleLogin = async () => {
    try {
      await signIn({ login: '22.1.71557', password: 'PEDROEROSA' });
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={handleLogin}>
        Sign In
      </Text>
    </View>
  );
}
