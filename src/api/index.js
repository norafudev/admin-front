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
  getMenuList(params) {
    return axios.get("/menu/list", { params: params })
  },

  // 获取角色权限对应的菜单
  getPermissionList() {
    return axios.get("/menu/permissionList")
  },

  // 获取用户列表
  getUserList(params) {
    return axios.get("/users/list", { params: params })
  },

  // 删除用户，参数为userId组成的数组
  userDel(data) {
    return axios.delete("/users/delete", { data: data })
  },

  // 获取角色名称列表
  getRoleName() {
    return axios.get("/roles/allList")
  },

  // 获取部门列表
  getDeptList(params) {
    return axios.get("/dept/list", { params: params })
  },

  // 新增/编辑用户：action：add/edit
  submitUser(data) {
    return axios.post("/users/operate", data)
  },

  // 创建、编辑、删除菜单
  submitMenu(data) {
    return axios.post("menu/operate", data)
  },

  // 创建、编辑、删除角色
  submitRole(data) {
    return axios.post("roles/operate", data)
  },

  // 设置角色权限
  updateRolePermission(data) {
    return axios.post("/roles/update/permission", data)
  },

  // 获取角色列表
  getRoleList(params) {
    return axios.get("/roles/list", { params: params })
  },

  // 创建、编辑、删除部门
  deptOperate(data) {
    return axios.post("/dept/operate", data)
  },

  // 创建部门时，获取负责人列表
  getAllUserList() {
    return axios.get("/users/all/list")
  },
}

export default api
