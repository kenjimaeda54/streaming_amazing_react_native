import useUserViewModel from "@/view_models/useUserViewModel";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ColumnTitleAndSubTitle from "./components/column_title_and_subtitle/ColumnTitleAndSubtitle";
import theme from "@/theme/theme";


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


const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    gap: 10,
  },
  imageProfile: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center'
  },

  columnContent: {
    gap: 20,

  },
  textSingOut: {
    fontFamily: theme.fonts.poppinsMedium,
    fontSize: 18,
    color: theme.colors.red,
    marginTop: 50,
  }
})