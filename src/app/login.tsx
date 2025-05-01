import { router } from 'expo-router';
import { View, StyleSheet, Image, Pressable, Keyboard, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Text } from 'react-native-paper';
import { Input, Icon, Button } from "react-native-magnus";

import { useSession } from '@/src/contexts/AuthContext';
import { LoginFormData, loginSchema } from '@schemas/LoginSchema';
import Colors from '@constants/Colors';
import { useState } from 'react';

export default function Login() {
  const { signIn } = useSession();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null);
    setLoading(true);
    try {
      await signIn(data);
      router.replace('/');
    } catch (err: any) {
      setErrorMessage(
        err?.message ?? 'Falha no login. Verifique suas credenciais.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
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
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                mt="lg"
                p="md"
                placeholder="E-mail ou R.A"
                focusBorderColor="blue700"
                prefix={
                  <Icon name="user" color="gray900" fontFamily="Feather" />
                }
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                editable={!loading}
              />
            )}
          />
          {errors.login && (
            <Text style={styles.errorText}>{errors.login.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                mt="md"
                p="md"
                placeholder="Senha"
                focusBorderColor="blue700"
                secureTextEntry={!showPassword}
                prefix={
                  <Icon name="key" color="gray900" fontFamily="Feather" />
                }
                suffix={
                  <Pressable onPress={() => setShowPassword((v) => !v)}>
                    <Icon
                      name={showPassword ? 'eye-off' : 'eye'}
                      color="gray900"
                      fontFamily="Feather"
                      fontSize={18}
                    />
                  </Pressable>
                }
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                editable={!loading}
              />
            )}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          )}

          {errorMessage && (
            <Text style={[styles.errorText, { marginTop: 10 }]}>
              {errorMessage}
            </Text>
          )}

        <View style={styles.buttonWrapper}>
            <Button
              block
              rounded="lg"
              h={50}
              bg={Colors.light.primaryDark}
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
            >
              {loading ? (
                <ActivityIndicator color={Colors.light.surface} />
              ) : (
                <Text variant="titleMedium" style={{ color: Colors.light.textLight, fontWeight: 'bold' }}>
                  Entrar Agora
                </Text>
              )}
            </Button>
          </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'flex-end',
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
  },
  buttonWrapper: {
    marginTop: 30,
  },
  errorText: {
    color: Colors.light.error || 'red',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
});
