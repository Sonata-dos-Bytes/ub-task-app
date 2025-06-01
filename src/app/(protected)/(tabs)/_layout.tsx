import colors from '@/src/constants/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: colors.light.primaryDark }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome6 size={28} name="house" color={color} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome5 size={28} name="user-alt" color={color} />,
        }}
      />
    </Tabs>
  );
}
