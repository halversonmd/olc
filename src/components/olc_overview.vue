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
        <b-btn id="overviewLoad" class="btn-primary sm" v-on:click="loadMap" :disabled="olcsLoaded">Show OLCs</b-btn>
      </b-col>
    </b-row>
    <b-row class="py-2" cols="12">
      <b-col cols="10">
        <div id="map-canvas-overview" class="w-100" style="height: 500px"></div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>

let MapControl = require('../../static/js/mapControl').default

let mapCtl = new MapControl()
let mapId = 'map-canvas-overview'

export default {
  created: async () => {
    mapCtl.globalMap = await document.getElementById(mapId)
    mapCtl.newMap(mapId)
    window.ga('send', 'event', 'created', 'overview')
  },
  name: 'overview',
  data () {
    return {
      olcsLoaded: false
    }
  },
  methods: {
    async loadMap () {
      window.ga('send', 'event', 'buttonClick', 'overviewLoad')
      await mapCtl.loadOlc()
      this.olcsLoaded = true
    },
    outboundClick (event) {
      window.ga('send', 'event', {
        eventCategory: 'Outbound Link',
        eventAction: 'click',
        eventLabel: event.target.href,
        transport: 'beacon'
      })
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
