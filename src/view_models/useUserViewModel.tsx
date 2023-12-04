import { UserAuthentication, UserModel } from "@/models/UserModel";
import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import { useShallow } from "zustand/react/shallow"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";


interface IUseUserViewModel {
  handleLogin: () => void,
}

//configurar android
//https://dev.to/suyashdev/google-authsignin-in-react-native-without-firebase-43n

//dica para fazer em ios configuracao
//https://chaim-zalmy-muskal.medium.com/hi-6d328bbd550f

export default function useUserViewModel(): IUseUserViewModel {
  const update = useUserAuthenticationStore(
    state => state.updateUser
  )


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
      const userInfo = await GoogleSignin.signIn()
      const user: UserModel = {
        givenName: userInfo.user.givenName ?? userInfo.user.name,
        photo: userInfo.user.photo

      }
      update({ idToken: userInfo.idToken, user: user })
    } catch (error: unknown) {
      if (error instanceof Error && error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log
      } else if (error instanceof Error) {
        console.error(error.message)
      }

    }

  }

  return {
    handleLogin,
  }

}