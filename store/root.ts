import { LangStore } from "./lang"
import { GodStore } from "./god"

export class RootStore {
  lang = new LangStore()
  god = new GodStore(this)
}
