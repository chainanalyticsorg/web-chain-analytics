import numeral from "numeral"
import BN from "bignumber.js"
import Bowser from "bowser"

export const helper = {
  browser: () => Bowser.getParser(window.navigator.userAgent),
  promise: {
    async sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms))
    },
    async runAsync<T, U = Error>(promise: Promise<T>): Promise<[U | null, T | null]> {
      return promise.then<[null, T]>((data: T) => [null, data]).catch<[U, null]>((err) => [err, null])
    },
  },
  env: {
    isIopayMobile: () => navigator.userAgent && (navigator.userAgent.includes("IoPayAndroid") || navigator.userAgent.includes("IoPayiOs")),
    isBrowser: () => typeof window === "object",
    onBrowser(func) {
      if (this.isBrowser()) {
        func()
      }
    },
  },
  json: {
    safeParse(val: any) {
      try {
        return JSON.parse(val)
      } catch (error) {
        return val
      }
    },
  },
  string: {
    toFixString(str, length) {
      if (str && str.length > length) {
        return str.substr(0, length) + "..."
      } else {
        return str
      }
    },
    truncate(fullStr = "", strLen, separator) {
      if (fullStr.length <= strLen) return fullStr

      separator = separator || "..."

      var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow / 2),
        backChars = Math.floor(charsToShow / 2)

      return fullStr.substr(0, frontChars) + separator + fullStr.substr(fullStr.length - backChars)
    },
  },
  number: {
    countNonZeroNumbers: (str: string) => {
      let index = 0
      const length = str.length
      for (; index < length && (str[index] === "0" || str[index] === "."); index += 1);
      return length - index - Number(str.includes("."))
    },
    toPrecisionFloor: (str: number | string, options?: { decimals?: number; format?: string }) => {
      const { decimals = 6, format = "" } = options || {}
      if (!str || isNaN(Number(str))) return ""

      if (helper.number.countNonZeroNumbers(String(str)) <= decimals) return String(str)
      const numStr = new BN(str).toFixed()
      let result = ""
      let index = 0
      const numLength = numStr.length

      for (; numStr[index] === "0" && index < numLength; index += 1);

      if (index === numLength) return "0"

      if (numStr[index] === ".") {
        // number < 0
        result = "0"
        for (; (numStr[index] === "0" || numStr[index] === ".") && index < numLength; index += 1) {
          result = result + numStr[index]
        }
      }
      let resultNumLength = 0
      for (; index < numLength && (resultNumLength < decimals || !result.includes(".")); index += 1) {
        result = result + numStr[index]

        if (numStr[index] !== ".") resultNumLength += 1
      }
      if (format) {
        return numeral(Number(result)).format(format)
      }

      return new BN(result).toFixed()
    },
    getBN: (value: number | string | BN) => {
      return value instanceof BN ? value : typeof value === "string" ? new BN(Number(value)) : new BN(value)
    },
  },
  token: {
    decodeCandidateHexName(hexx: string): string {
      return Buffer.from(String(hexx).replace(/^0x/, ""), "hex")
        .toString("utf8")
        .replace(/^(\u0000+)/g, "")
        .replace(/\u0000/g, "#")
    },
  },
}
