import { NavigationModel } from "@/models/NavigationModel"
import HomeScreen from "@/screens/home/HomeScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import TabBar from "./component/TabBar"
import BookMark from "@/screens/book_mark/BookMark"
import Location from "@/screens/location/Location"
import Profile from "@/screens/profile/Profile"

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
      tabBar={(props) => <TabBar {...props} />}
    >
      <Screen name="home" component={HomeScreen} />
      <Screen name="location" component={Location} />
      <Screen name="bookMark" component={BookMark} />
      <Screen name="profile" component={Profile} />
    </Navigator>
  )
}