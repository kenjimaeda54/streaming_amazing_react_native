import { Text, View, Image, Pressable } from "react-native";
import { GoogleSignin, } from "@react-native-google-signin/google-signin"
import { useEffect } from "react";
import { styles } from "./sign_in.styles";
import useUserViewModel from "@/view_models/useUserViewModel";


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