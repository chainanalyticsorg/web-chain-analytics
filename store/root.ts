import { LangStore } from "./lang"
import { Base } from "./base"

export class RootStore {
  lang = new LangStore()
  base = new Base()
}
