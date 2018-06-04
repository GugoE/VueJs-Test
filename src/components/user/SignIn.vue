<template>

  <div class="container">

    <form class="form-signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
      <label for="inputPassword"  class="sr-only">Password</label>
      <input type="password"  v-model="password" id="inputPassword" class="form-control" placeholder="Password" required="">
      <div class="checkbox">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button @click="SignIn" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>

  </div>

</template>

<script>

  import * as types from '../../stores/modules/user/types';
  import * as mutation_types from '../../stores/modules/user/mutation_types';

  export default {

    name: 'SignIn',

    data () {
      return {
        email: "",
        password: "",
      }
    },


    mounted () {

      this.storeMutationSubscriber =
        this.$store.subscribe (( mutation, state ) => {

          switch ( mutation.type ) {
            case "user/" + mutation_types.M_LOGIN_SUCCESS:

              this.email = "";
              this.password = "";
              this.$router.push ('/');

              break;

            case "user/" + mutation_types.M_LOGIN_FAIL:
              const status = mutation.payload.error.status;

              switch(status)
              {
                case 500:
                  this.error = this.$t ('Something went wrong') + ' [500]';
                  break;
                case 503:
                  this.isWant2FACode = true;
                  return;
                case 403:
                  this.error = this.$t ('Wrong Google Authentication code');
                  break;
              }
              break;
          }

        });
    },

    beforeDestroy () {

      if ( this.storeMutationSubscriber != null ) {
        this.storeMutationSubscriber ();
        this.storeMutationSubscriber = null;
      }
    },

    computed: {

      isUserAuthenticated () {
        return this.$store.getters[ "user/isUserAuthenticated" ];
      },
    },
    methods: {
      SignIn: function () {
        this.$store.dispatch ("user/" + types.A_LOGIN, {
          email: this.email,
          password: this.password,
          code: this.code
        }, (error) => {
          console.log(error)
        });
      }
    }
  }

</script>

<style>

form.form-signin {
  width: 30%;
  margin: 0 auto;
}
form.form-signin input {
  margin-bottom: 10px;
}

</style>
