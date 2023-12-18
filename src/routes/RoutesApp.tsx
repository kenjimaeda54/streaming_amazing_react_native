import { NavigationModel } from "@/models/NavigationModel"
import HomeScreen from "@/screens/home/HomeScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from "./component/TabBar"
import Profile from "@/screens/profile/ProfileScreen"
import Live from "@/screens/live/LiveScreen"
import StackRoute from "./StackRoute"
import { useNavigationContext } from "@/stores/useNavigationProvider"


export default function RoutesApp() {
  const { navigationRef } = useNavigationContext()
  const { Navigator, Screen } = createBottomTabNavigator<NavigationModel>()


  function isBottomTab(): boolean {
    const routeName = navigationRef.getCurrentRoute()?.name
    return (routeName === "home" || routeName === "live" || routeName === "profile");

  }

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white"
        }

      }}
      initialRouteName="signIn"
      tabBar={(props) => isBottomTab() && <TabBar {...props} />}
    >
      <Screen name="home" component={HomeScreen} />
      <Screen name="live" component={Live} />
      <Screen name="profile" component={Profile} />
      <Screen name="stackRoute" component={StackRoute} />
    </Navigator>
  )
}