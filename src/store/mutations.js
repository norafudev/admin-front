import storage from "../utils/storage"

const mutations = {
  saveUserInfo(state, userInfo) {
    state.userInfo = userInfo
    // 改变vuex中的state后，也要更新localStorage中的数据
    storage.setItem("userInfo", userInfo)
  },
  saveMenuList(state, menuList) {
    state.menuList = menuList
    storage.setItem("menuList", menuList)
  },
  saveActionList(state, actionList) {
    state.actionList = actionList
    storage.setItem("actionList", actionList)
  },
}

export default mutations
