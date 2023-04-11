const generateRoutes = (menuList) => {
  let routes = []
  const deep = (menuList) => {
    menuList.map((item) => {
      //二级菜单
      if (item.action) {
        // 菜单数据格式：
        routes.push({
          name: item.component,
          path: item.path,
          meta: { title: item.menuName },
          component: item.component,
        })
      }
      if (item.children && !item.action) {
        deep(item.children)
      }
    })
  }
  deep(menuList)
  return routes
}

export default generateRoutes
