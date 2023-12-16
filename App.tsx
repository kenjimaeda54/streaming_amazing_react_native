/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */


import "react-native-devsettings";
import NavigationProvider from "@/stores/useNavigationProvider";
import ProviderRoute from "@/routes/ProviderRoute";



export default function App() {

  return (
    <NavigationProvider>
      <ProviderRoute />
    </NavigationProvider>
  )
}