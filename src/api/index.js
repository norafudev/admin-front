/**
 * api统一管理
 */

import axios from "./../utils/request"

const api = {
  // 登录
  login(data) {
    return axios.post("/users/login", data)
  },

  // 获取通知数量
  noticeCount() {
    return axios.get("/leave/count")
  },

  // 获取菜单列表
  menuList() {
    return axios.get("/menu/list")
  },
}

export default api
