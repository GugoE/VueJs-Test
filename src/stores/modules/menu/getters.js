export default {

  getMenuList: (state, getters) => {
    let menuList = [...state.menuList] || [];
      return menuList;
  }

}
