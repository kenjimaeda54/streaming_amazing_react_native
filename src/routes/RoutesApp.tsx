import { NavigationModel } from "@/models/NavigationModel"
import HomeScreen from "@/screens/home/HomeScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from "./component/TabBar"
import BookMark from "@/screens/channel_videos/SubscriptionVideosScreen"
import Profile from "@/screens/profile/ProfileScreen"
import Live from "@/screens/live/LiveScreen"
import StackRoute from "./StackRoute"

export default function RoutesApp() {

  const { Navigator, Screen } = createBottomTabNavigator<NavigationModel>()

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black"
        }
      }}
      initialRouteName="signIn"
      tabBar={(props) => <TabBar {...props} />}
    >
      <Screen name="home" component={HomeScreen} />
      <Screen name="live" component={Live} />
      <Screen name="profile" component={Profile} />
      <Screen name="stackRoute" component={StackRoute} />
    </Navigator>
  )
}