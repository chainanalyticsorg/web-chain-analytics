import { NetworkState } from "./lib/NetworkState"
import { makeAutoObservable } from "mobx"
import { MappingState } from "./standard/MappingState"
import { ChainState } from "./lib/ChainState"
import { EthNetworkState } from "./lib/EthNetworkState"
import { RootStore } from "./root"
import { NumberState } from "./standard/base"
import { eventBus } from "../lib/event"
import { IotexNetworkConfig } from "../config/NetworkConfig"
import { IotexNetworkState } from "./lib/IotexNetworkState"

export enum Network {
  ETH = "eth",
  BSC = "bsc",
  IOTEX = "iotex",
  POLYGON = "polygon",
}

export class GodStore {
  rootStore: RootStore
  network: MappingState<NetworkState> = new MappingState({
    currentId: "iotex",
    map: {
      iotex: IotexNetworkConfig,
    },
  })

  updateTicker = new NumberState()

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
    makeAutoObservable(this, {
      rootStore: false,
    })
    IotexNetworkConfig.god = this
  }
  get isIotxNetork() {
    return this.network.currentId.value == "iotex"
  }
  get isETHNetwork() {
    //@ts-ignore
    return ["eth", "bsc"].includes(this.network.currentId.value)
  }

  get eth(): EthNetworkState {
    return this.network.map.eth as EthNetworkState
  }

  get iotex(): IotexNetworkState {
    return this.network.map.iotex as IotexNetworkState
  }

  get isConnect() {
    return !!this.currentNetwork.account
  }
  get currentNetwork() {
    return this.network.current
  }
  get currentChain(): ChainState {
    return this.currentNetwork.currentChain
  }
  get Coin() {
    return this.currentChain.Coin
  }

  setNetwork(val: Network) {
    this.network.setCurrentId(val)
  }
  setChain(val: number) {
    this.currentNetwork.chain.setCurrentId(val)
    eventBus.emit("chain.switch")
  }
  setShowConnecter(value: boolean) {
    this.iotex.connector.showConnector = value
  }
}
