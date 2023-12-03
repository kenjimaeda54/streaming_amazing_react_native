import { NavigationModel } from "@/models/NavigationModel"
import SignIn from "@/screens/sign_in/SignIn"
import { createStackNavigator } from "@react-navigation/stack"


const { Screen, Navigator } = createStackNavigator<NavigationModel>()


export default function AuthenticationRoute() {


  return (
    <Navigator>
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  )

}