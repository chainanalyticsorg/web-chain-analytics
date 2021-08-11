import { NetworkState } from "./NetworkState"
import { makeAutoObservable } from "mobx"
import Antenna from "iotex-antenna"
import { ChainState } from "./ChainState"
import BigNumber from "bignumber.js"
import { WsSignerPlugin } from "iotex-antenna/lib/plugin/ws"
import { validateAddress } from "iotex-antenna/lib/account/utils"
import { Contract } from "iotex-antenna/lib/contract/contract"
import retry from "promise-retry"
import { GodStore } from "../god"
import { TransactionResponse } from "@ethersproject/providers"
import toast from "react-hot-toast"
import { rootStore } from "../index"
import { MappingState } from "../standard/MappingState"
import { eventBus } from "../../lib/event"
import { hooks } from "../../lib/hooks"
import { JsBridgeSignerMobile } from "../../lib/js-plugin"
import { IotexMulticall } from "../../lib/multicall"
import { helper } from "../../lib/helper"
import { StorageState } from "../standard/StorageState"
import { CallParams } from "../../../types"

export enum IotexConnector {
  IopayDesktop = "iopay-desktop",
  IopayExtension = "iopay-extension",
}

export class IotexNetworkState implements NetworkState {
  god: GodStore
  //contract
  chain: MappingState<ChainState>
  account: string = ""
  antenna?: Antenna
  multiCall: IotexMulticall
  allowChains: number[]

  info = {}

  connector: {
    latestProvider: StorageState<String>
    showConnector: boolean
  } = {
    //@ts-ignore
    latestProvider: null,
    showConnector: false,
  }
  walletInfo = {
    visible: false,
  }
  constructor(args: Partial<IotexNetworkState>) {
    Object.assign(this, args)

    helper.env.onBrowser(() => {
      this.connector.latestProvider = new StorageState({ key: "latestIotexProvider" })
    })
    makeAutoObservable(this)
  }
  get currentChain() {
    return this.chain.current
  }
  async loadBalance() {
    const { accountMeta } = await this.antenna!.iotx.getAccount({ address: this.account })
    if (!accountMeta) throw new Error("loadBalance failed")
    this.currentChain.Coin.balance.setValue(new BigNumber(accountMeta.balance.toString()))
  }

  activeConnector() {
    if (this.antenna) {
      //@ts-ignore
      this.antenna = null
    }
    toast.promise(
      hooks.waitAccount(5000),
      {
        loading: helper.env.isIopayMobile() ? rootStore.lang.t("connector.loading.mobile") : rootStore.lang.t("connector.loading"),
        success: rootStore.lang.t("connector.success"),
        error: rootStore.lang.t("connector.failed"),
      },
      { id: "connector" }
    )

    localStorage.setItem("latestIotexProvider", "true")
    this.initAntenna()
  }

  async initAntenna() {
    if (!this.getAntenna().iotx.accounts?.length) {
      return setTimeout(() => {
        this.initAntenna()
      }, 500)
    }
    this.account = this.getAntenna().iotx.accounts[0].address
    eventBus.emit("wallet.onAccount")
  }

  getAntenna() {
    if (this.antenna) {
      return this.antenna
    }
    let signer

    if (helper.env.isBrowser() && !helper.env.isIopayMobile()) {
      signer = new WsSignerPlugin()
      // } else if (GodUtils.isMobile) {
    } else if (helper.env.isIopayMobile()) {
      signer = new JsBridgeSignerMobile()
    }

    const antenna = signer ? new Antenna(this.currentChain.rpcUrl, { signer }) : new Antenna(this.currentChain.rpcUrl)
    this.antenna = antenna
    return antenna
  }

  async execContract({ address, abi, method, params = [], options = {} }: { address: string; abi: any; method: string; params?: any[]; options?: any }): Promise<Partial<TransactionResponse>> {
    const contract = new Contract(abi, address, { provider: this.antenna!.iotx, signer: this.antenna!.iotx.signer })
    const hash = await contract.methods[method](...params, Object.assign({ gasLimit: "2000000", gasPrice: "1000000000000" }, options))
    const wait = () =>
      new Promise<void>((resolve, reject) => {
        retry(
          //@ts-ignore
          (retry) => {
            console.log({ hash })
            return this.antenna!.iotx.getReceiptByAction({ actionHash: hash }).catch(retry)
          },
          { minTimeout: 5000, maxTimeout: 5000 }
        ).then(
          (res: any) => {
            res.status = res.receiptInfo.receipt.status
            resolve(res)
          },
          () => {
            reject()
          }
        )
      })
    //@ts-ignore
    return { hash, wait }
  }
  async multicall(calls: CallParams[]): Promise<any[]> {
    //@ts-ignore
    const res = await this.multiCall.batch(
      calls.map((i) => {
        const { abi, address, method, params } = i
        return { abi, address, method, params }
      })
    )
    res.forEach((v, i) => {
      const callback = calls[i].handler
      if (typeof callback == "function") {
        //@ts-ignore
        callback(v)
      } else {
        if (callback && callback.setValue) {
          callback.setValue(new BigNumber(v.toString()))
        }
      }
    })
    return res
  }
  setAccount(account: string) {
    this.account = account
  }

  async sign(message: string) {
    const antenna = this.getAntenna()
    if (antenna.iotx.signer && antenna.iotx.signer.signMessage) {
      const signed = await antenna.iotx.signer.signMessage(message)
      if (typeof signed === "object") {
        return Buffer.from(signed).toString("hex")
      }
      return signed
    }
    const account = antenna.iotx.accounts[0]
    const sig = account && (await account.sign(message))
    return (sig && sig.toString("hex")) || ""
  }

  isAddressaVailable(address: string): boolean {
    return validateAddress(address)
  }
}
