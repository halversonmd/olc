<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="py-2">
      <p>
        Select an OLC size below and click around the map.
      </p>
    </b-row>
    <b-row class="py-2">
      <b-col align-self="center" cols="6">
        <h3>Size</h3>
        <input type="radio" id="ten" value=10 v-model="olcSize" v-on:change='setCanDraw'>
        <label for="ten">10</label>
        <input type="radio" id="eight" value=8 v-model="olcSize" v-on:change='setCanDraw'>
        <label for="eight">8</label>
        <input type="radio" id="six" value=6 v-model="olcSize" v-on:change='setCanDraw'>
        <label for="six">6</label>
        <input type="radio" id="four" value=4 v-model="olcSize" v-on:change='setCanDraw'>
        <label for="four">4</label>
        <input type="radio" id="two" value=2 v-model="olcSize" v-on:change='setCanDraw'>
        <label for="two">2</label>
      </b-col>
      <b-col align-self="center">
        <div id="redraw" class="my-3">
          <b-btn v-on:click="drawGrid" :disabled="canDraw===false">Draw Grid</b-btn>
          <b-popover target="redraw"
                 triggers="hover"
                 placement="left"
                 plaintext
                 :disabled="canDraw===true">
               Zoom in or select different size
        </b-popover>
        <b-btn v-on:click="clearMap">Clear Map</b-btn>
        </div>
      </b-col>
    </b-row>

    <b-row class="py-2">
      <b-col>
        <div id="map-canvas" style="height: 500px; width: 700px"></div>
      </b-col>
      <b-col cols="3">
        <span>Selected OLCs:</span>
        <b-form-textarea
          v-model="olcText"
          :disabled="true"
          :max-rows="15">
        </b-form-textarea>
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
  name: 'olcMap',
  data () {
    return {
      olcSize: 6,
      olcText: '',
      canDraw: true,
      map: null,
      selectOlcAlert: false,
      radius: '5',
      zoomSize: {
        2: 4,
        4: 6,
        6: 11,
        8: 15,
        10: 19
      },
      clickedData: {
        lat: '',
        lon: '',
        olcCode: ''
      }
    }
  },
  methods: {
    async loadMap () {
      mapCtl.loadOlc(this.radius, this.olcSize)
    },
    setCanDraw () {
      this.canDraw = this.map.globalMap.getZoom() >= this.zoomSize[this.olcSize]
    },
    clearMap () {
      mapCtl.clear()
      this.olcText = ''
    },
    loadOlcText () {
      this.olcText = mapCtl.olcText()
    },
    drawGrid () {
      if (this.canDraw) {
        console.log('olc size changed')
        mapCtl.drawGrid(this.olcSize)
      }
    }
  },
  mounted: async function () {
    this.map = await mapCtl
    let _thisVue = this
    this.map.globalMap.addListener('click', (e) => {
      if (_thisVue.olcSize) {
        mapCtl.placeMarkerAndPanTo(e.latLng, _thisVue.olcSize)
        _thisVue.loadOlcText()
      } else {
        _thisVue.selectOlcAlert = true
      }
    })
    this.map.globalMap.addListener('bounds_changed', () => {
      console.log('bounds_changed')
      _thisVue.canDraw = (this.map.globalMap.getZoom() >= _thisVue.zoomSize[_thisVue.olcSize])
    })
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
