import Promise from 'promise';
import axios from 'axios';

const ApiAdapter = {

  install ( Vue, options ) {
    Vue.Axios = axios.create ({
      timeout: 60000
    });

    Vue.Api = {
      token: null,
    };

    Vue.Api.__ParseResponse = function ( response, resolve, reject ) {
      if ( response != undefined && response != null && response.hasOwnProperty ('status')
        && (response.status == 200 || response.status == 201 || response.status == 204) ) {

        var adapter = {
          status: response.status,
          status_message: response.statusText,
          data: response.data
        };

        resolve (adapter);
      } else {
        reject (response);
      }
    };

    /**
     * GET HTTP Request
     * @param endpoint
     * @param o
     * @param headers
     * @constructor
     */
    Vue.Api.Get = function ( endpoint, o, headers ) {
      return new Promise (( resolve, reject ) => {

        var data = {};
        if(o != undefined) data.params = o;
        if(headers != undefined) data.headers = headers;

        Vue.Axios.get (endpoint, data)
          .then (function ( response ) {
            console.log(response);
            Vue.Api.__ParseResponse (response, resolve, reject);
          }, ( error ) => {
            console.log("ERROR GET");
            console.log(error);
            Vue.Api.__ParseResponse (error.response, resolve, reject);
          })
          .catch (function ( error ) {
            console.log("CATCH GET");
            console.log(error);
            Vue.Api.__ParseResponse (error.response, resolve, reject);
          });
      });
    };

    /**
     * POST HTTP Request
     * @param endpoint
     * @param body
     * @param opt
     * @constructor
     */
    Vue.Api.Post = function ( endpoint, body, opt ) {
      return new Promise (( resolve, reject ) => {
        Vue.Axios.post (endpoint, body, opt)
          .then (( response ) => {
            Vue.Api.__ParseResponse (response, resolve, reject);
          }, ( error ) => {
            Vue.Api.__ParseResponse (error.response, resolve, reject);
          })
          .catch (( error ) => {
            Vue.Api.__ParseResponse (error.response, resolve, reject);
          });
      });
    };

    /**
     * PUT HTTP Request
     * @param endpoint
     * @param body
     * @param opt
     * @constructor
     */
    Vue.Api.Put = function ( endpoint, body, opt ) {
      return new Promise (( resolve, reject ) => {
        Vue.Axios.put (endpoint, body, opt)
          .then (( response ) => {
            Vue.Api.__ParseResponse (response, resolve, reject);
          }, ( error ) => {
            Vue.Api.__ParseResponse (error.response, resolve, reject);
          })
          .catch (( error ) => {
            Vue.Api.__ParseResponse (error.response, resolve, reject);
          });
      });
    };
  }
}

export default ApiAdapter;
