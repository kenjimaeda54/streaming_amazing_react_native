import useSearchViewModel from "@/view_models/useSearchViewModel";
import { Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { emojiFromUtf16 } from "rn-emoji-picker"
import { styles } from "./home.styles";
import { FlatList } from "react-native-gesture-handler";
import RowSubscription from "@/components/row_subscription/RowSubscription";
import { subscriptionsMock } from "@/mocks/subscriptionsMock";
import { videosMock } from "@/mocks/videosMock";
import RowVideos from "@/components/row_videos/RowVideos";




export default function HomeScreen() {
  const { data, isLoading } = useSearchViewModel()



  if (isLoading) {

    return <Text>Loading</Text>
  }

  return (
    <SafeAreaView edges={['top']} style={{
      flex: 1,
      paddingVertical: 10,
      gap: 10,

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
      <FlatList
        style={{
          height: 120
        }}
        data={subscriptionsMock}
        keyExtractor={(_, index) => `${index}`}
        snapToOffsets={[...Array(subscriptionsMock.length).map((_, i) => i * (70 - 30) + (i - 1) * 30)]}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment="start"
        decelerationRate="fast"
        scrollEventThrottle={16}
        renderItem={RowSubscription}
      />
      <FlatList
        data={videosMock}
        contentContainerStyle={{
          paddingHorizontal: 13
        }}
        keyExtractor={(_, index) => `${index}`}
        renderItem={RowVideos}
      />
    </SafeAreaView>
  )
}