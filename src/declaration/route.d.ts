import { NavigationModel } from "@/models/NavigationModel"


declare global {
  namespace ReactNavigation {
    interface RootParamList extends NavigationModel { }
  }
}

