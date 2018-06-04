import * as mutation_types from './mutation_types';

export default {

  [mutation_types.M_LOGIN_SUCCESS]( state, payload )
  {
    state.isAuthenticated = true;
    state.user = payload.user;
  },
  [mutation_types.M_LOGIN_FAIL]( state, payload )
  {
    state.isAuthenticated = false;
    state.user = null;
  },
  [mutation_types.M_LOGOUT_SUCCESS]( state )
  {
    state.isAuthenticated = false;
    state.user = null;
  },


}
