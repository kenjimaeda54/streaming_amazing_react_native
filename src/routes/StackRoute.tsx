import { NavigationModel } from "@/models/NavigationModel"
import SignIn from "@/screens/sign_in/SignIn"
import { createStackNavigator } from "@react-navigation/stack"
import RoutesApp from "./RoutesApp"
import PlayVideo from "@/screens/play_video/PlayVideo"


const { Screen, Navigator } = createStackNavigator<NavigationModel>()


export default function StackRoute() {


  return (
    <Navigator screenOptions={{
      headerShown: false
    }}>
      <Screen name="signIn" component={SignIn} />
      <Screen name="tabNavigator" component={RoutesApp} />
      <Screen name="playVideo" component={PlayVideo} />
    </Navigator>
  )

}