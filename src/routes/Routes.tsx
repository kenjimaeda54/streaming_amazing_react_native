import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import StackRoute from "./StackRoute";
import { useShallow } from "zustand/react/shallow";
import RoutesApp from "./RoutesApp";
import useUserViewModel from "@/view_models/useUserViewModel";
import { Text } from "react-native";


export default function Routes() {
  const { user, isLoadingLogin } = useUserViewModel()

  if (isLoadingLogin) {
    return <Text>Carregando</Text>
  }

  return (
    <>
      {user.idToken != null ? <RoutesApp /> : <StackRoute />}
    </>

  )
}