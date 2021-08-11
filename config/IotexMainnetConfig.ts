import { ChainState } from "../store/lib/ChainState"
import { RPC_URLS } from "../lib/web3-react"
import { CoinState } from "app/store/lib/CoinState"

export const IotexMainnetConfig = new ChainState({
  name: "IoTeX",
  chainId: 4689,
  networkKey: "iotex",
  rpcUrl: RPC_URLS[4689],
  logoUrl: "/images/iotex.svg",
  explorerURL: "https://iotexscan.io",
  explorerName: "IoTeXScan",
  Coin: new CoinState({
    symbol: "IOTX",
    decimals: 18,
  }),
  info: {
    blockPerSeconds: 5,
    multicallAddr: "io14n8zjjlh6f0733wxftj9r97ns78ksspmjgzh7e",
    theme: {
      bgGradient: "linear(to-r, #0BDAD5, #44FEB2)",
    },
  },
})
