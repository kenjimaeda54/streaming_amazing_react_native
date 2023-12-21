import { Constants } from "@/utility/Contants";
import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { SubscriptionModel } from "@/models/SubscriptionModel";
import { useUserAuthenticationStore } from "@/stores/userAuthenticationStore";
import { useShallow } from "zustand/react/shallow";
import { API_KEY } from "@env"


interface IUserSubscriptionService {
  data: SubscriptionModel
  isLoading: boolean
}

async function fetchSubscriptionUser(userToken: string, signal: AbortSignal): Promise<SubscriptionModel> {
  const response = await api.get(`/subscriptions?part=snippet&maxResults=10&mine=true&key=${API_KEY}`, {
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

  const { data = {} as SubscriptionModel, isLoading } = useQuery({ queryKey: [Constants.subscriptionUser, userStore.idToken], queryFn: ({ signal }) => fetchSubscriptionUser(userStore.idToken!, signal) })


  return {
    data,
    isLoading
  }

}