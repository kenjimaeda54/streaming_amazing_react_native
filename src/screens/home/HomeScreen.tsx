import theme from "@/theme/theme";
import { Text, View } from "react-native";




export default function HomeScreen() {
  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1
    }}>
      <Text style={{
        fontFamily: theme.fonts.poppinsLight,
      }} >Teste de font</Text>
    </View>
  )
}