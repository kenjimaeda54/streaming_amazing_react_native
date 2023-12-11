import useUserViewModel from "@/view_models/useUserViewModel";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColumnTitleAndSubTitle from "./components/column_title_and_subtitle/ColumnTitleAndSubtitle";
import { styles } from "./profile.styles";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { user, handleSingOut } = useUserViewModel()
  const { user: userSigIn } = user
  return (
    <SafeAreaView style={styles.container} >
      <Image style={styles.imageProfile} source={{ uri: userSigIn.photo ?? "" }} />
      <View style={styles.columnContent} >
        <ColumnTitleAndSubTitle title="Nome" subTitle={userSigIn.givenName ?? ""} />
        <ColumnTitleAndSubTitle title="Email" subTitle={userSigIn.email} />
      </View>
      <Pressable onPress={handleSingOut} >
        <Text style={styles.textSingOut}>Sair</Text>
      </Pressable>
    </SafeAreaView>
  )
}