<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="py-2">
      <b-col cols="10">
        <p>
          Open Location Codes (OLCs) are innovative geographical indentifiers, developed by Google engineers.  Physically, the are retangular geographical areas that cover the globe in a grid-like pattern.  They come in five different sizes and each OLC had a unique indentifier.  They are also known as <a href="https://plus.codes/">Plus Codes</a>.
        </p>
        <p>
          Click the button below and you will see a circle centered in Manhattan with a five mile radius and twelve OLC codes of length six that roughly correlate to the same area.  This is to illustrate how OLCs can be used in place of lat/longs with radius for local digital advertising.
        </p>
      </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col align-self="center" cols="8">
        <button class="btn-primary sm" v-on:click="loadMap">Show OLCs</button>
      </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col>
        <!-- <div id="map-canvas" style="height: 500px; width: 700px"></div> -->
        <div id="map-canvas" class="w-100" style="height: 500px"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

let MapControl = require('../../static/js/mapControl').default

let mapCtl = new MapControl()

export default {
  created: async () => {
    mapCtl.globalMap = await document.getElementById('map-canvas')
    mapCtl.newMap()
  },
  name: 'overview',
  data () {
    return {
      olcSize: false,
      map: null,
      selectOlcAlert: false,
      clickedData: {
        lat: '',
        lon: '',
        olcCode: ''
      }
    }
  },
  methods: {
    async loadMap () {
      mapCtl.loadOlc()
    },
    loadClickData () {
      this.clickedData = mapCtl.clickData()
    }
  }
}

</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
