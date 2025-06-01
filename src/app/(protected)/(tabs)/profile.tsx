import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native"
import { useSession } from '@/src/contexts/auth-context';
import { Avatar } from "react-native-magnus";
import MenuItem from "@/src/components/menu-item";

export default function Profile() {
  const { signOut, user } = useSession();
  const userData = user();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.profilePhoto}>
            <View>
              {userData?.userPicture ? (
                <Avatar source={{ uri: userData?.userPicture }} size={120} />
              ) : (
                <Avatar bg="gray300" size={40} color="gray800">
                  {userData?.userInitials}
                </Avatar>
              )}
            </View>
          </View>
          <Text
            style={{
              ...styles.title,
              fontFamily: "Poppins_700Bold",
            }}>
            {userData?.name}
          </Text>
          <Text
            style={{
              ...styles.subtitle,
              fontFamily: "Poppins_400Regular",
            }}>
            {userData?.email}
          </Text>
        </View>
        <ScrollView style={styles.profileMenu}>
          <MenuItem
            title="Portal do Aluno"
            icon="arrow-right"
            url="https://academico.unibalsas.edu.br/FrameHTML/web/app/edu/PortalEducacional/#/"
          />
          <MenuItem
            title="Portal EAD"
            icon="arrow-right"
            url="https://ead.unibalsas.edu.br/my/"
          />
          <MenuItem
            title="Sobre"
            icon="info"
            url="https://github.com/Sonata-dos-Bytes"
          />
          <MenuItem
            title="Sair"
            icon="logout"
            onPress={() => {
              signOut();
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    width: "100%",
    backgroundColor: "#9A3234",
  },
  profilePhoto: {
    marginTop: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    color: "#fff",
  },
  subtitle: {
    fontSize: 12,
    color: "#fff",
  },
  profileMenu: {
    flex: 1,
    flexDirection: "column",
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
})
