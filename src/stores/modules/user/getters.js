export default {

  isUserAuthenticated: state => {
    return state.isAuthenticated;
  },
  getUsers: (state, getters) => {
    let users = [...state.users] || [];
    return users;
  }
}
