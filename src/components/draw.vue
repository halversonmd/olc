<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <div class="col">
      <div class="row">
        <div class="col d-flex justify-content-between" style="max-width: 700px;">
          <p>
            Click around the map below to create custom geo boundaries using OLCs with various sizes.  The codes you choose will appear in the adjacent text box.
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col justify-content-between" style="max-width: 700px;">
          <div class="card-group">
            <div class="card border-light bg-light">
              <div class="card-header h-25">OLC Size:</div>
              <div class="card-body">
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
              </div>
            </div>
            <div class="card w-25 border-light bg-light">
              <div class="card-header h-25">Size Reference</div>
              <div class="card-body">
                <div class="col-sm col-sm-auto pr-0">
                  <b-img class="zoom border border-dark" :src="olcImg" width="60" height="40"/>
                </div>
              </div>
            </div>
            <div class="card border-light bg-light">
              <div class="card-header h-25">Options</div>
              <div class="card-body">
                <div class="btn-group-vertical" role="group" aria-label="Basic example">
                  <b-btn class="btn btn-secondary btn-sm" id="redraw" v-on:click="drawGrid">Draw Grid</b-btn>
                  <b-popover target="redraw"
                         triggers="hover"
                         placement="right"
                         container="body"
                         :disabled="canDraw===true">
                       Zoom in or select different size
                  </b-popover>
                  <b-btn class="btn btn-secondary btn-sm" v-on:click="clearMap">Clear Map</b-btn>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-row class="py-2">
        <b-col>
          <div id="map-canvas-draw" class="w-100" style="max-width: 700px; height: 500px"></div>
        </b-col>
        <b-col cols="3">
          <div class="d-flex align-items-start flex-column" style="height: 500px;">
            <div class="mb-auto p-2">
              <span>Selected OLCs:</span>
              <b-form-textarea
                v-model="olcText"
                :disabled="true"
                :max-rows="20">
              </b-form-textarea>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>

<script>

let MapControl = require('../../static/js/mapControl').default

let mapId = 'map-canvas-draw'
let mapCtl = new MapControl()

export default {
  created: async () => {
    mapCtl.globalMap = await document.getElementById(mapId)
    mapCtl.newMap(mapId)
  },
  name: 'olcDraw',
  data () {
    return {
      olcSize: 6,
      olcImg: '/static/img/olc_size_6.png',
      olcText: '',
      hasGrid: false,
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
      this.olcImg = '/static/img/olc_size_' + this.olcSize + '.png'
      window.ga('send', 'event', 'drawCtl', 'sizeChange', this.olcSize)
    },
    clearMap () {
      mapCtl.clear()
      window.ga('send', 'event', 'drawCtl', 'mapClear')
      this.hasGrid = false
      this.olcText = ''
    },
    loadOlcText () {
      this.olcText = mapCtl.olcText()
    },
    drawGrid () {
      if (this.canDraw) {
        mapCtl.drawGrid(this.olcSize)
        window.ga('send', 'event', 'drawCtl', 'drawGrid', this.olcSize)
        this.hasGrid = true
      }
    }
  },
  mounted: async function () {
    window.ga('send', 'event', 'mounted', 'draw')
    this.map = await mapCtl
    let _thisVue = this
    this.map.globalMap.addListener('click', (e) => {
      if (_thisVue.olcSize) {
        window.ga('send', 'event', 'mapClick', 'draw', 'hasGrid:' + JSON.stringify(_thisVue.hasGrid), _thisVue.olcSize)
        mapCtl.placeMarkerAndPanTo(e.latLng, _thisVue.olcSize)
        _thisVue.loadOlcText()
      } else {
        _thisVue.selectOlcAlert = true
      }
    })
    this.map.globalMap.addListener('bounds_changed', () => {
      _thisVue.canDraw = (this.map.globalMap.getZoom() >= _thisVue.zoomSize[_thisVue.olcSize])
    })
  }
}

</script>

<style scoped>
.zoom:hover {
    transform: scale(8);
    position: absolute;
    z-index: 1;
    transform-origin:top;
}
</style>
