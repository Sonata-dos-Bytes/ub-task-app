import { Redirect, Stack } from 'expo-router';
import { Text } from 'react-native';

import { useSession } from '@/src/contexts/auth-context';

export const unstable_settings = {
  initialRouteName: '(protected)/(tabs)',
};

export default function ProtectedLayout() {
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
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
