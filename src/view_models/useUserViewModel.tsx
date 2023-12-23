import { ChannelModel } from "@/models/ChannelModel";
import { PlayListItem } from "@/models/PlayListItem";
import { SubscriptionModel } from "@/models/SubscriptionModel";
import { UserAuthentication, UserModel } from "@/models/UserModel";
import { useChannelService } from "@/services/useChannelService";
import usePlayListChannelSubscriptionService from "@/services/usePlayListChannelSubscriptionService";
import useSubscriptionService from "@/services/useSubscriptionService";
import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from "@env"

interface IUseUserViewModel {
  handleLogin: () => void,
  dataSubscription: SubscriptionModel,
  user: UserAuthentication,
  isLoadingDataSubscription: boolean,
  isLoadingLogin: boolean,
  handleSingOut: () => void,
  handleWithChannelSubscription: (_channelId: string) => void,
  dataPlayListSubscription: (PlayListItem | undefined)[],
  isLoadingSubscription: boolean
  isLoadingChannel: boolean,
  channel: ChannelModel
  handleSearchChannel: (channelId: string) => void
}

//configurar android
//https://dev.to/suyashdev/google-authsignin-in-react-native-without-firebase-43n

//dica para fazer em ios configuracao
//https://chaim-zalmy-muskal.medium.com/hi-6d328bbd550f

export default function useUserViewModel(): IUseUserViewModel {
  const store = useUserAuthenticationStore(
    state => ({ update: state.updateUser, authentication: state.user })
  )
  const { data: dataSubscription, isLoading: isLoadingDataSubscription } = useSubscriptionService()
  const { refetch: refetchChannel, isLoading: isLoadingChannel, channelId: channelIdService } = useChannelService()
  const { data: dataPlayListSubscription, isLoading: isLoadingSubscription, refetch, channelId: channelIdSubscription } = usePlayListChannelSubscriptionService()
  const [isLoadingLogin, setIsLoadingLogin] = useState(true)
  const [channel, setChannel] = useState({} as ChannelModel)


  useEffect(() => {

    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube.force-ssl', 'https://www.googleapis.com/auth/youtube.channel-memberships.creator', 'https://www.googleapis.com/auth/youtube'],
      webClientId: WEB_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      offlineAccess: true,
      profileImageSize: 120,
    });


    handleIsSignIn()

  }, [])


  async function handleIsSignIn() {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn()
      if (isSignedIn) {
        const currentUser = await GoogleSignin.getCurrentUser()
        const userInfo = currentUser === null ? await GoogleSignin.signInSilently() : currentUser
        const token = await GoogleSignin.getTokens()
        const user: UserModel = {
          givenName: userInfo.user.givenName ?? userInfo.user.name,
          photo: userInfo.user.photo,
          email: userInfo.user.email

        }
        store.update({ idToken: token.accessToken, user })
      }
    } finally {
      setIsLoadingLogin(false)
    }

  }


  function handleSearchChannel(channelId: string) {
    channelIdService.current = channelId
    refetchChannel().then(it => {
      if (it.data != null) {
        setChannel(it.data)
      }
    })
  }



  async function handleLogin() {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn()
      const token = await GoogleSignin.getTokens()
      const user: UserModel = {
        givenName: userInfo.user.givenName ?? userInfo.user.name,
        photo: userInfo.user.photo,
        email: userInfo.user.email

      }
      store.update({ idToken: token.accessToken, user: user })
    } catch (error: unknown) {
      if (error instanceof Error && error.message === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("sem play services disponivel")
      } else if (error instanceof Error) {
        console.error(error.message)
      }

    }
  }

  async function handleSingOut() {
    try {
      await GoogleSignin.signOut()
      await GoogleSignin.revokeAccess()
      const user: UserModel = {
        givenName: null,
        photo: null,
        email: ""

      }
      store.update({ idToken: null, user: user })
    } catch (error) {
      console.log(error)
    }
  }


  function handleWithChannelSubscription(_channelId: string) {
    channelIdSubscription.current = _channelId
    refetch()
  }

  return {
    handleLogin,
    dataSubscription,
    user: store.authentication,
    isLoadingDataSubscription,
    isLoadingLogin,
    handleSingOut,
    handleWithChannelSubscription,
    dataPlayListSubscription,
    isLoadingSubscription,
    handleSearchChannel,
    channel,
    isLoadingChannel,

  }

}