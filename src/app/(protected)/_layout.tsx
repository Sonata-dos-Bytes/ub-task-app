import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

import { useSession } from '@/src/contexts/auth-context';

export const unstable_settings = {
  initialRouteName: '(protected)/index',
};

export default function AppLayout() {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/login" />;
  }
  
  return (
    <Stack>
        <Stack.Screen 
            name="index"
            options={{
                headerShown: false,
            }}
        />
    </Stack>
  );
}
