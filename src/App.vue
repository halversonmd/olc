<template>
  <div id="myolc">
    <!-- <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-nav>
        <b-nav-item href="/overview">What are OLCs</b-nav-item>
          <b-nav-item href="/draw">Draw</b-nav-item>
          <b-nav-item href="/convert">Convert</b-nav-item>
        </b-navbar-nav>
        <b-collapse is-nav id="nav_collapse">
      </b-collapse>
    </b-navbar> -->
    <b-tabs>
      <b-tab title="Overview" active>
        <br>
        <olcOverview/>
      </b-tab>
      <b-tab title="Convert" >
        <br>
        <plotPoi/>
      </b-tab>
      <b-tab title="Draw">
        <br>
        <draw/>
      </b-tab>
    </b-tabs>
  </div>

</template>

<script>

import olcOverview from '@/components/olc_overview'
import plotPoi from '@/components/plot_poi'
import draw from '@/components/draw'

export default {
  name: 'olc',
  components: {draw, olcOverview, plotPoi}
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
