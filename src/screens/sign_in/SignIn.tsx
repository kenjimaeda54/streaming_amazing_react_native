import { Text, View, TouchableOpacity } from "react-native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { useEffect } from "react";


export default function SignIn() {

  useEffect(() => {

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.force-ssl', 'https://www.googleapis.com/auth/youtube.channel-memberships.creator', 'https://www.googleapis.com/auth/youtube'],
      webClientId: "129472962547-kiqeddbdh2kb7knnf39qfmejo2k1hlab.apps.googleusercontent.com",
      iosClientId: '129472962547-3ah1b2iakfg7jg5s7m4d3u8qffiuncpk.apps.googleusercontent.com',
      offlineAccess: true,
      profileImageSize: 120,
    });

  }, [])

  async function handleLogin() {
    try {

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);


    } catch (error: unknown) {
      if (error instanceof Error && error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log
      } else if (error instanceof Error) {
        console.error(error.message)
      }

    }



  }


  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Clique aqui para entrar</Text>
      </TouchableOpacity>
    </View>

  )

}