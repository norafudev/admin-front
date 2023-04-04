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
  getNoticeCount() {
    return axios.get("/leave/count")
  },

  // 获取菜单列表
  getMenuList() {
    return axios.get("/menu/list")
  },

  // 获取用户列表
  getUserList(params) {
    return axios.get("/users/list", { params: params })
  },

  // 删除用户，参数为userId组成的数组
  userDel(data) {
    return axios.delete("/users/delete", { data: data })
  },
}

export default api
