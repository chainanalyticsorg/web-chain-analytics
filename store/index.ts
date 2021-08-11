import { toJS } from "mobx"
import { enableStaticRendering } from "mobx-react-lite"
import { createContext, useContext } from "react"
import { RootStore } from "./root"

const isServer = typeof window === "undefined"

enableStaticRendering(isServer)

export const rootStore = new RootStore()

export const StoresContext = createContext(rootStore)

export const useStore = () => useContext(StoresContext)

if (!isServer) {
  //@ts-ignore
  window.store = new Proxy(rootStore, {
    get(target, props, receiver) {
      return toJS(target[props])
    },
  })
}
