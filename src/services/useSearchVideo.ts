import { useQuery } from "@tanstack/react-query";
import api from "./api";
import { Constants } from "@/utility/Contants";
import { SearchVideoModel } from "@/models/SearchVideoModel";


interface IUseSearchVideo {
  isLoading: boolean,
  data: SearchVideoModel
}

async function searchVideo(): Promise<SearchVideoModel> {
  const response = await api.get(`/search?part=snippet&key=AIzaSyB6AoyBLzmy-zMXbC1LP-Gm6Xl-WrlXHFo`, {
    headers: {
      "Content-Type": "application/json",
    }
  })
  return response.data
}


export default function useSearchVideo(): IUseSearchVideo {


  const { data = {} as SearchVideoModel, isLoading } = useQuery({ queryKey: [Constants.searchMovie], queryFn: () => searchVideo() })


  return {
    data,
    isLoading
  }


}