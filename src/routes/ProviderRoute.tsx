import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "@/services/query_client";
import theme from "@/theme/theme";
import Routes from "./Routes";
import { useNavigationContext } from "@/stores/useNavigationProvider"
import { NavigationContainer } from "@react-navigation/native";

export default function ProviderRoute() {
  const { navigationRef } = useNavigationContext()


  return (
    <NavigationContainer ref={navigationRef}>
      <QueryClientProvider client={queryClient} >
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: theme.colors.white100 }}>
          <Routes />
        </GestureHandlerRootView>
      </QueryClientProvider>
    </NavigationContainer>

  )
}