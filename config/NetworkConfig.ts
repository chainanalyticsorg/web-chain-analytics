import { MappingState } from "app/store/standard/MappingState"
import { IotexMainnetConfig } from "./IotexMainnetConfig"
import { IotexTestnetConfig } from "./IotexTestnetConfig"
import { IotexNetworkState } from "../store/lib/IotexNetworkState"

export const IotexNetworkConfig = new IotexNetworkState({
  allowChains: [IotexTestnetConfig.chainId],
  chain: new MappingState({
    currentId: IotexMainnetConfig.chainId,
    map: {
      [IotexMainnetConfig.chainId]: IotexMainnetConfig,
      [IotexTestnetConfig.chainId]: IotexTestnetConfig,
    },
  }),
})
