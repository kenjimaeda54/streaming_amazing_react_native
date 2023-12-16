import { NavigationModel } from "@/models/NavigationModel"
import SignIn from "@/screens/sign_in/SignInScren"
import RoutesApp from "./RoutesApp"
import PlayVideo from "@/screens/play_video/PlayVideoScreen"
import SubscriptionVideos from "@/screens/channel_videos/SubscriptionVideosScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"


const { Screen, Navigator } = createNativeStackNavigator<NavigationModel>()


export default function StackRoute() {


  return (
    <Navigator screenOptions={{
      headerShown: false,
      presentation: 'modal',
      animationTypeForReplace: 'pop',
      animation: 'fade_from_bottom',
      animationDuration: 2000
    }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="tabNavigator" component={RoutesApp} />
      <Screen name="playVideo" component={PlayVideo} />
      <Screen name="subscriptionVideos" component={SubscriptionVideos} />
    </Navigator>
  )

}