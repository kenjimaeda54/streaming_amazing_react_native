/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import RoutesApp from "@/routes/RoutesApp";
import HomeScreen from "@/screens/home/HomeScreen";
import { queryClient } from "@/services/query_client";
import theme from "@/theme/theme";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-devsettings";
import Routes from "@/routes/Routes";



export default function App() {



  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient} >
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.white100 }}>
          <Routes />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </NavigationContainer>

  )
}