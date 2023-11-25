/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RoutesApp from "@/routes/RoutesApp";
import HomeScreen from "@/screens/home/HomeScreen";
import theme from "@/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


export default function App() {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.white100 }}>
        <RoutesApp />
      </GestureHandlerRootView>
    </NavigationContainer>

  )
}