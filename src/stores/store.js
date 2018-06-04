import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import UserModule from './modules/user/store';
import MenuModule from './modules/menu/store';


export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user: UserModule,
    menu: MenuModule,
  }
});
