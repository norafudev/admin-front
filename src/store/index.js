import { createStore } from "vuex"
import mutations from "./mutations"
import storage from "../utils/storage"

const state = {
  userInfo: storage.getItem("userInfo") || "",
  menuList: storage.getItem("menuList" || []),
  actionList: storage.getItem("actionList" || []),
}

const store = createStore({
  state,
  mutations,
})

export default store
