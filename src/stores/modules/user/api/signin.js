import Vue from 'vue';

export default (email, password, code) => {

  var o = { email: email, password: password };

  var options = {};

  return Vue.Api.Post("URL", o, options);

};
