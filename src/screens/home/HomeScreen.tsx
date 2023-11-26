import theme from "@/theme/theme";
import useSearchViewModel from "@/view_models/useSearchViewModel";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { emojiFromUtf16 } from "rn-emoji-picker"
import { styles } from "./home.styles";




export default function HomeScreen() {
  const { data, isLoading } = useSearchViewModel()



  if (isLoading) {

    return <Text>Loading</Text>
  }

  return (
    <SafeAreaView style={{
      flex: 1,
      paddingHorizontal: 13,
      paddingVertical: 10,
      gap: 10
    }}>
      <View style={styles.rowPresentation}>
        <Image source={require("../../../assets/images/bottom_tab/avatar_user.png")} style={{ width: 60, height: 60 }} />
        <View>
          <View style={styles.rowWelcome}>
            <Text style={styles.presentationWelcome}>Bem vindo</Text>
            <Text>{emojiFromUtf16('1F44B')} </Text>
          </View>
          <Text style={styles.presentationName}>Jonatan</Text>
        </View>
      </View>
      <Text style={styles.textSubscriptions}>Assinaturas</Text>

    </SafeAreaView>
  )
}