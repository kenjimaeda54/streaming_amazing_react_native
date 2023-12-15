import { Text, View, Image, Pressable, StyleSheet } from "react-native";
import useUserViewModel from "@/view_models/useUserViewModel";
import theme from "@/theme/theme";


export default function SignIn() {
  const { handleLogin } = useUserViewModel()


  return (
    <View style={{ flex: 1 }}>
      <Image style={styles.image} resizeMode="cover" source={{ uri: "https://images.unsplash.com/photo-1638389746768-fd3020d35add?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }} />
      <View style={styles.content}>
        <Text style={styles.title}>Streaming Amazing</Text>
        <Text style={styles.contentText}>Seu aplicativo de streaming de videos.{'\n'}Este aplicativo é independente usamos sua conta do Youtube para personalizar sua experiencia. </Text>
      </View>
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Vamos começar</Text>
      </Pressable>
    </View>

  )

}


const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },
  content: {
    position: 'absolute',
    bottom: 200,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontFamily: theme.fonts.poppinsBold,
    fontSize: 35,
    color: theme.colors.white,
    textShadowOffset: {
      width: 0,
      height: 3
    },
    textShadowColor: "#000",
    textShadowRadius: 4.65,
  },
  contentText: {
    fontFamily: theme.fonts.latoRegular,
    fontSize: 20,
    lineHeight: 35,
    color: theme.colors.white,
    paddingHorizontal: 20,
    textShadowOffset: {
      width: 0,
      height: 3
    },
    textShadowColor: "#000",
    textShadowRadius: 4.65,
  },
  button: {
    position: "absolute",
    bottom: 70,
    left: 20,
    right: 20,
    paddingVertical: 17,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: theme.colors.white
  },
  textButton: {
    fontFamily: theme.fonts.latoLight,
    fontSize: 17,
    lineHeight: 25,
    color: theme.colors.black100,
  }
})