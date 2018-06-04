<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" >
      <a class="navbar-brand" href="#">Test</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" v-for="menu of getMenuList">
            <a class="nav-link" href="#">{{menu.name}}<span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <div class="logout">
          <a href="#/logout">Log Out</a>
        </div>
      </div>
    </nav>
    <div class="tableData">
      <v-client-table :data="getUsers" :columns="columns" :options="options"></v-client-table>
    </div>
  </div>
</template>
<script>


  import Vue from 'vue'

  import {ServerTable, ClientTable, Event} from 'vue-tables-2';


  Vue.use(ClientTable);

  export default {
  name:"home",
  data () {
    return {
      columns: ['email', 'name','__slot:actions'],
      options: {

      }
    }
  },
  computed: {
    getMenuList(){
      return this.$store.getters["menu/getMenuList"];
    },
    getUsers(){
      console.log(this.$store.getters["user/getUsers"])
      return this.$store.getters["user/getUsers"];
    },
  }
}

</script>

<style>
  .navbar{
    margin-bottom: 90px!important;
  }
  .tableData {
    width: 75%;
    margin: 0 auto;
   }
</style>
