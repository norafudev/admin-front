import storage from "../utils/storage"

const mutations = {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
    // 改变vuex中的state后，也要更新localStorage中的数据
    storage.setItem("userInfo", userInfo)
  },
}

export default mutations
