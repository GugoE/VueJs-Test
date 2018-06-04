import Vue from 'vue';
import * as types from './types';
import * as mutation_types from './mutation_types';
import {SignInRequest} from "./api/methods";


export default {

  [types.A_LOGIN] ( context, payload ) {
      console.log(payload)
    SignInRequest (payload.email, payload.password, payload.code).then (
      ( response ) => {

      },

      ( error ) => {
        // сейчас заходит сюда просто нет url действующего, если бы был логика была бы в response
        if ( payload.email == 'test@gmail.com' && payload.password == '123456789' ) {

          context.commit (mutation_types.M_LOGIN_SUCCESS, {

          });

        } else {
          context.commit (mutation_types.M_LOGIN_FAIL, { error: error })

        }
      }
    ).catch (( error ) => {
      console.log(error)

      context.commit (mutation_types.M_LOGIN_FAIL, {
        error: error
      });
    });
  },

  [types.A_LOGOUT] ( context ) {
      context.commit (mutation_types.M_LOGOUT_SUCCESS);
  },
}
