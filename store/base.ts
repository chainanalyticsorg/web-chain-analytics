import { makeAutoObservable } from "mobx"

export class Base {
    platform: string
    constructor () {
        makeAutoObservable(this)
    }
    get isMobile () {
       return this.platform === 'mobile'
    }
    setPlatform (val: string) {
     this.platform = val
    }
}