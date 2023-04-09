/**
 * api统一管理
 */

import axios from "./../utils/request"

const api = {
  // 登录
  login(data) {
    // return axios.post("/users/login", data)
    return axios.post("/users/login", data, { baseURL: "/api" })
  },

  // 获取通知数量
  getNoticeCount() {
    return axios.get("/leave/count")
  },

  // 获取菜单列表
  getMenuList(params) {
    // return axios.get("/menu/list", { params: params })
    return axios.get("/menu/list", { baseURL: "/api", params: params })
  },

  // 获取用户列表
  getUserList(params) {
    // return axios.get("/users/list", { params: params })
    return axios.get("/users/list", { baseURL: "/api", params: params })
  },

  // 删除用户，参数为userId组成的数组
  userDel(data) {
    // return axios.delete("/users/delete", { data: data })
    return axios.post("/users/delete", data, { baseURL: "/api" })
  },

  // 获取角色名称列表
  getRoleName() {
    // return axios.get("/roles/allList")
    return axios.get("/roles/allList", { baseURL: "/api" })
  },

  // 获取部门列表
  getDeptList() {
    return axios.get("/dept/list")
  },

  // 新增/编辑用户：action：add/edit
  submitUser(data) {
    // return axios.post("/users/operate", data)
    return axios.post("/users/operate", data, { baseURL: "/api" })
  },

  // 创建、编辑、删除菜单
  submitMenu(data) {
    // return axios.post("menu/operate", data)
    return axios.post("menu/operate", data, { baseURL: "/api" })
  },

  // 创建、编辑、删除角色
  submitRole(data) {
    // return axios.post("roles/operate", data)
    return axios.post("roles/operate", data, { baseURL: "/api" })
  },

  // 设置角色权限
  updateRolePermission(data) {
    // return axios.post("/roles/update/permission", data)
    return axios.post("/roles/update/permission", data, { baseURL: "/api" })
  },

  // 获取角色列表
  getRoleList(params) {
    // return axios.get("/roles/list", { params: params })
    return axios.get("/roles/list", { baseURL: "/api", params: params })
  },
}

export default api
