import { SearchVideoModel } from "@/models/SearchVideoModel";
import useSearchVideo from "@/services/useSearchVideo";

interface IUseSearchViewModel {
  data: SearchVideoModel
  isLoading: boolean
}


export default function useSearchViewModel() {

  const { data, isLoading } = useSearchVideo()

  return {
    data,
    isLoading
  }
}