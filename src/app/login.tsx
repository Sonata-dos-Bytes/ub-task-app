import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { Controller, useForm } from "react-hook-form"
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  View,
} from "react-native"
import { Button, Div, Icon, Input } from "react-native-magnus"
import { Text } from "react-native-paper"

import Colors from "@/src/constants/colors"
import { useSession } from "@/src/contexts/auth-context"
import { LoginFormData, loginSchema } from "@/src/schemas/login-schema"
import { useState } from "react"

export default function Login() {
  const { signIn } = useSession()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage(null)
    setLoading(true)
    try {
      await signIn(data)
      router.replace("/")
    } catch (err: any) {
      setErrorMessage(
        err?.message ?? "Falha no login. Verifique suas credenciais."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
      <View style={styles.formContainer}>
        <View style={styles.logoContainer}>
          {/* 
            <Image
              source={require('@assets/images/unibalsas-logo.png')}
              style={styles.logo}
              resizeMode="contain"
            /> 
          */}

          <View style={styles.logoWrapper}>
            <Image
              source={require("@assets/images/unibalsas-mini-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text
          variant="headlineMedium"
          style={{ ...styles.title, fontFamily: "Poppins_700Bold" }}>
          UB Task
        </Text>
        <Text
          variant="titleMedium"
          style={{ ...styles.subtitle, fontFamily: "Poppins_400Regular" }}>
          Bem-vindo(a) ao seu novo aplicativo de listagem de ativdades da
          Unibalsas!
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
              prefix={<Icon name="user" color="gray900" fontFamily="Feather" />}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              editable={!loading}
            />
          )}
        />
        {errors.login && (
          <Text
            style={{ ...styles.errorText, fontFamily: "Poppins_400Regular" }}>
            {errors.login.message}
          </Text>
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
              prefix={<Icon name="key" color="gray900" fontFamily="Feather" />}
              suffix={
                <Pressable onPress={() => setShowPassword((v) => !v)}>
                  <Icon
                    name={showPassword ? "eye-off" : "eye"}
                    color="gray900"
                    fontFamily="Feather"
                    fontSize={16}
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
          <Text
            style={{ ...styles.errorText, fontFamily: "Poppins_400Regular" }}>
            {errors.password.message}
          </Text>
        )}

        {errorMessage && (
          <Text
            style={[
              styles.errorText,
              { marginTop: 10, fontFamily: "Poppins_400Regular" },
            ]}>
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
            onPress={handleSubmit(onSubmit)}>
            {loading ? (
              <ActivityIndicator color={Colors.light.surface} />
            ) : (
              <Text
                variant="titleMedium"
                style={{
                  color: Colors.light.textLight,
                  fontFamily: "Poppins_600SemiBold",
                }}>
                Entrar Agora
              </Text>
            )}
          </Button>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressable: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },

  // logoContainer: {
  //   flex: 0.4,
  //   alignItems: 'center',
  //   justifyContent: 'flex-end',
  //   paddingBottom: 20,
  // },
  // logo: {
  //   height: 100,
  // },

  logoContainer: {
    flex: 0.4,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingBottom: 20,
  },
  logoWrapper: {
    padding: 10,
    borderWidth: 2,
    borderColor: Colors.light.borderGray,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 0.5,
  },
  logo: {
    height: 35,
    width: 35,
    borderRadius: 10,
  },
  formContainer: {
    flex: 0.6,
    paddingHorizontal: 30,
    justifyContent: "flex-start",
    gap: 10,
  },
  title: {
    color: Colors.light.primaryDark,
  },
  subtitle: {
    color: Colors.light.textLightGray,
    marginBottom: 10,
  },
  buttonWrapper: {
    marginTop: 30,
  },
  errorText: {
    color: Colors.light.error || "red",
    fontSize: 14,
    marginTop: 4,
    textAlign: "left",
  },
})
