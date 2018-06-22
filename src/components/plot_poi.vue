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
      <b-col align-self="center" cols="8">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <h1>Upload Coords</h1>
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files)" accept="csv" class="input-file">
              <p v-if="isSaving">
                Uploading {{ fileCount }} files...
              </p>
          </div>
        </form>
      </b-col>
    </b-row>
    <b-row class="py-2">
      <b-col>
        <div id='spinner' class='loader' v-show='loading'></div>
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
let api = require('../../src/api.js').default.exec

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
    async upload (formData) {
      const olcs = await api.postOlcs(formData)
      mapCtl.plotList(olcs.olcCodes, olcs.pois)
      this.olcText = mapCtl.olcText(olcs.olcCodes)
      this.loading = false
      this.loading = false
      mapCtl.enable()
      window.ga('send', 'event', 'upload', 'success')
    },
    initLoad () {
      mapCtl.disable()
      var mp = document.getElementById('map-canvas-plot')
      var width = mp.offsetWidth
      width = (Math.round((width / 2) * 10) / 10) - 50
      var loadingDiv = document.getElementById('spinner')
      loadingDiv.style.marginLeft = JSON.stringify(width) + 'px'
    },
    filesChange (fieldName, fileList) {
      this.loading = true
      this.initLoad()
      window.ga('send', 'event', 'upload', 'change')
      const formData = new FormData()
      if (!fileList.length) return
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append('olcFile', fileList[x])
        })
      this.upload(formData)
    }
  },
  mounted: async function () {
    window.ga('send', 'event', 'mounted', 'plotPoi')
    this.reset()
  }
}

</script>

<style scoped>
.loader {
  position: absolute;
  z-index: 1;
  margin-top: 190px;
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
