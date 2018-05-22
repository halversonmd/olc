<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="py-2">
      <p>
        Select an OLC size below and click around the map.
      </p>
    </b-row>
    <b-row class="py-2">
      <b-col align-self="center" cols="8">
        <table class="table">
          <thead>
            <tr>
              <th>Lat</th>
              <th>Lon</th>
              <th>OLC</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ clickedData.lat }}</td>
              <td>{{ clickedData.lon }}</td>
              <td>{{ clickedData.olcCode }}</td>
            </tr>
          </tbody>
        </table>
        <select @change="selectOlcAlert=false" v-model="olcSize" class="chart-btn">
          <option value=false>Select OLC Size</option>
          <option value=2>2</option>
          <option value=4>4</option>
          <option value=6>6</option>
          <option value=8>8</option>
          <option value=10>10</option>
        </select>
        <b-alert variant="danger"
             dismissible
             :show="selectOlcAlert"
             @dismissed="selectOlcAlert=false">
          Select Size!
        </b-alert>
      </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col>
        <div id="map-canvas" style="height: 500px; width: 700px"></div>
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
  },
  mounted: async function () {
    this.map = await mapCtl
    let _thisVue = this
    this.map.globalMap.addListener('click', (e) => {
      if (_thisVue.olcSize) {
        mapCtl.placeMarkerAndPanTo(e.latLng, _thisVue.olcSize)
        _thisVue.loadClickData()
      } else {
        _thisVue.selectOlcAlert = true
      }
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
