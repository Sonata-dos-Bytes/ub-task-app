import { router } from 'expo-router';
import { View, StyleSheet, Image } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from 'react-native-paper';

import { useSession } from '@/src/contexts/AuthContext';
import { LoginFormData, loginSchema } from '@schemas/LoginSchema';
import Colors from '@constants/Colors';

export default function Login() {
  const { signIn } = useSession();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      await signIn(data);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@assets/images/unibalsas-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text variant="headlineMedium" style={styles.title}>UB Task</Text>
        <Text variant="titleMedium" style={styles.subtitle}>
          Bem-vindo(a) ao seu novo aplicativo de listagem de ativdades da Unibalsas!
        </Text>

        <Controller
          control={control}
          name="login"
          render={({ field: { onChange, value, onBlur } }) => (
            
          )}
        />
        {errors.login && <Text style={{ color: "red" }}>{errors.login.message}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    height: 100,
  },
  formContainer: {
    flex: 0.6,
    paddingHorizontal: 30,
    justifyContent: 'flex-start',
    gap: 10,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.light.primaryDark,
  },
  subtitle: {
    fontFamily: 'Poppins_400Regular',
    color: Colors.light.textLightGray,
  }
});
