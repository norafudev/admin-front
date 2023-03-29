import { createStore } from "vuex"
import mutations from "./mutations"
import storage from "../utils/storage"

const state = {
  userName: storage.getItem("userInfo") || "",
}

const store = createStore({
  state,
  mutations,
})

export default store
