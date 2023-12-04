import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import AuthenticationRoute from "./AuthenticationRoute";
import { useShallow } from "zustand/react/shallow";
import RoutesApp from "./RoutesApp";


export default function Routes() {
  const { user } = useUserAuthenticationStore(useShallow(state => ({ user: state.user })))
  return (
    <>
      {user.idToken != null ? <RoutesApp /> : <AuthenticationRoute />}
    </>

  )
}