<template>
  <div id="myolc">
    <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand>Halvy</b-navbar-brand>
        <b-navbar-nav>
          <b-nav-item href="/overview">What are OLCs</b-nav-item>
          <b-nav-item href="/demo">Demo</b-nav-item>
        </b-navbar-nav>
        <b-collapse is-nav id="nav_collapse">
      </b-collapse>
    </b-navbar>
    <!-- <router-link to="/overview">Overview</router-link> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'olc'
}
</script>

<style>
#olc {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
