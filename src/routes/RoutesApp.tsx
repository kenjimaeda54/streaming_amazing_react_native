import { NavigationModel } from "@/models/navigation_model"
import HomeScreen from "@/screens/home/HomeScreen"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

export default function RoutesApp() {

  const { Navigator, Screen } = createBottomTabNavigator<NavigationModel>()

  return (
    <Navigator>
      <Screen name="home" component={HomeScreen} />
    </Navigator>
  )
}