import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';

import { useSession } from '@context/AuthContext';

export const unstable_settings = {
  initialRouteName: '(protected)/home',
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
