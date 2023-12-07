import { NavigationModel } from "@/models/NavigationModel"
import HomeScreen from "@/screens/home/HomeScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from "./component/TabBar"
import BookMark from "@/screens/book_mark/BookMark"
import Profile from "@/screens/profile/Profile"
import Live from "@/screens/live/LiveScreen"

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
    </Navigator>
  )
}