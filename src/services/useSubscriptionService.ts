import { Constants } from "@/utility/Contants";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { SubscriptionModel } from "@/models/SubscriptionModel";
import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import { useShallow } from "zustand/react/shallow";


interface IUserSubscriptionService {
  data: SubscriptionModel
  isLoading: boolean
}

async function fetchSubscriptionUser(userToken: string, signal: AbortSignal): Promise<SubscriptionModel> {
  const response = await api.get("/subscriptions?part=snippet&maxResults=10&mine=true&key=AIzaSyC6pfq4kSrvQk1eJ55K6cr_89a2z5HbCPo", {
    headers: {
      Authorization: `Bearer ${userToken}`
    },
    signal
  })
  return response.data
}


export default function useSubscriptionService(): IUserSubscriptionService {
  const { userStore } = useUserAuthenticationStore(
    useShallow(state => ({ userStore: state.user }))
  )

  const { data = {} as SubscriptionModel, isLoading } = useQuery({ queryKey: [Constants.subscriptionUser], queryFn: ({ signal }) => fetchSubscriptionUser(userStore.idToken!, signal) })


  return {
    data,
    isLoading
  }

}