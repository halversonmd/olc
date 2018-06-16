<template>
  <div id="myolc">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <router-link to="/">Home</router-link>
      <b-dropdown id="ddown-right" text="More" class="my-2 my-sm-0">
        <b-dropdown-item to="/about">About</b-dropdown-item>
        <b-dropdown-item to="/contact">Contact</b-dropdown-item>
      </b-dropdown>
    </nav>
    <br>
    <router-view></router-view>
    <br>
  </div>
</template>

<script>

export default {
  name: 'olc'
}
</script>

<style>
.navbar-nav > li > a, .navbar-brand {
    padding-top:5px !important; padding-bottom:0 !important;
    height: 30px;
}
.navbar {min-height:20px !important;}
#olc {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
