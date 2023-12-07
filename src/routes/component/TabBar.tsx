import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { styleButton, styles } from "./tab_bar.style";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import theme from "@/theme/theme";


export default function TabBar({ ...props }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets()


  const listIcon = {
    'home': require("../../../assets/images/bottom_tab/home.png"),
    'profile': require("../../../assets/images/bottom_tab/profile.png"),
    'live': require("../../../assets/images/bottom_tab/live.png")
  } as unknown as { [key: string]: ImageSourcePropType }


  return (
    <View style={styles.container} >
      {props.state.routes.map((route, index) => {
        const { options } = props.descriptors[route.key]


        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
            ? options.title
            : route.name
        const isFocused = props.state.index === index

        const handleNavigation = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        }

        return (
          <TouchableOpacity onPress={handleNavigation} style={styleButton(isFocused).button} key={route.name} >
            <Image source={listIcon[label as string]} resizeMode="cover" style={{ width: 30, height: 30 }} tintColor={isFocused ? theme.colors.white : theme.colors.black100} />
          </TouchableOpacity>
        )

      })}

    </View>
  )


}