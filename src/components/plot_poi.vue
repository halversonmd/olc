<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="py-2">
      <b-col cols="12">
        <p>
          Open Location Codes have several uses.  One of which is geotargeting digial media campaigns. AppNexus, when used as a DSP allows you to geo target campaigns with OLCs.  The two main benefits to geotargeting with OLCs are targeting custom geo boundaries and ensuring accurate location inventory.
        </p>
        <p>
          Upload a CSV file (two columns - latitude and longitude) to see what an address list with a five mile radius looks like as OLCs.  You can also use the generated OLCs to geotarget campaigns on AppNexus.
        </p>
    </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col cols="3">
        <div class="card border-light bg-light">
          <div class="card-header h-15">Upload Coords:</div>
          <div class="card-body">
            <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
              <div class="dropbox">
                <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event)" accept="csv" class="input-file">
                  <p v-if="isSaving">
                    Uploading {{ fileCount }} files...
                  </p>
              </div>
            </form>
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card border-light bg-light">
          <div class="card-header h-15">Select radius:</div>
          <div class="card-body">
            <input type="radio" id="five" value=5 v-model="radius">
            <label for="five">5</label>
            <input type="radio" id="ten" value=10 v-model="radius">
            <label for="ten">10</label>
          </div>
        </div>
      </b-col>
      <b-col cols="3">
        <div class="card border-light bg-light">
          <div class="card-header h-15">Plot on map:</div>
          <div>
            <b-form-checkbox id="checkbox1" v-model="plotMap">
              Plot on map
            </b-form-checkbox>
            <div>(Uncheck for faster processing)</div>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col>
        <div id="map-canvas-plot" class="w-100" style="height: 500px"></div>
      </b-col>
      <b-col cols="3">
        <span>New OLCs:</span>
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
let Papa = require('../../static/js/papaparse.min.js')

let mapCtl = new MapControl()
let mapId = 'map-canvas-plot'
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  created: async () => {
    mapCtl.globalMap = await document.getElementById(mapId)
    mapCtl.newMap(mapId)
  },
  name: 'olcMap',
  data () {
    return {
      olcSize: false,
      plotMap: true,
      radius: 5,
      map: null,
      olcText: '',
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'olcs',
      loading: false
    }
  },
  computed: {
    isInitial () {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving () {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess () {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed () {
      return this.currentStatus === STATUS_FAILED
    }
  },
  methods: {
    reset () {
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    async upload (file) {
      const reader = new FileReader()
      var fileData = await new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result)
        reader.onerror = error => reject(error)
        reader.readAsText(file)
      })
      var coords = Papa.parse(fileData).data.slice(1)
      var olcData = await mapCtl.coordsToOlc(coords, this.radius, 6)
      if (this.plotMap) {
        mapCtl.plotList(olcData.olcCodes, olcData.pois)
      }
      this.olcText = mapCtl.olcText(olcData.olcCodes)
      this.loading = false
      window.ga('send', 'event', 'upload', 'success')
    },
    filesChange (event) {
      window.ga('send', 'event', 'upload', 'change')
      this.loading = true
      const input = event.target
      if ('files' in input && input.files.length > 0) {
        this.upload(input.files[0])
      }
    }
  },
  mounted: async function () {
    window.ga('send', 'event', 'mounted', 'plotPoi')
    this.reset()
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
