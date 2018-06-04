import Vue from 'vue'
import Router from 'vue-router'
import SignIn from '../components/user/SignIn'
import Home from '../components/home/Home'

import { store } from '../stores/store';

Vue.use (Router);

let router = new Router ({

  routes: [
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      meta: { closeForAuth: true }
    },
    {
      path: '/',
      name: 'home',
      component:Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: to => {
        store.dispatch('user/A_LOGOUT');
        return { path: '/sign-in' };
      }
    },
  ]

});

router.beforeEach((to, from, next) => {


  var ValidateRouter = () => {
    if (to.matched.some(record => record.meta.requiresAuth)) {

      if (store.state.user.isAuthenticated == false) {
        console.log(store.state.user.isAuthenticated)
        next({
          path: '/sign-in',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    }  else if (to.matched.some(record => record.meta.closeForAuth)) {
      if (store.state.user.isAuthenticated != false  && store.state.user.isAuthenticated != undefined) {
        next({
          path: '/'
        })
      } else {
        next()
      }
    }

  };
  next()
  ValidateRouter();

});

export default router;
