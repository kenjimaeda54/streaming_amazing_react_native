import { NavigationContainerRefWithCurrent, useNavigationContainerRef } from "@react-navigation/native";
import React, { useContext, createContext, ReactNode, MutableRefObject } from "react";


interface INavigationContext {
  navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList>
}

const NavigationContext = createContext<INavigationContext>({} as INavigationContext)


export default function NavigationProvider({ children }: { children: ReactNode }) {
  const navigationRef = useNavigationContainerRef()


  return (
    <NavigationContext.Provider value={{ navigationRef: navigationRef }}>
      {children}
    </NavigationContext.Provider>
  )

}


function useNavigationContext(): INavigationContext {
  const context = useContext(NavigationContext)
  return context
}

export { useNavigationContext, NavigationProvider }