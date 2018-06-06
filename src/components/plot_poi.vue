<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row class="py-2">
      <p>
        Open Location Codes have several uses.  One of which is geotargeting digial media campaigns. AppNexus, when used as a DSP allows you to geo target campaigns with OLCs.  The two main benefits to geotargeting with OLCs are targeting custom geo boundaries and ensuring accurate location inventory.
      </p>
      <p>
        Upload a CSV file (two columns - latitude and longitude) to see what an address list with a five mile radius looks like as OLCs.  You can also use the generated OLCs to geotarget campaigns on AppNexus.
      </p>
    </b-row>
    <b-row class="py-2">
      <b-col align-self="center" cols="8">
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <h1>Upload Coords</h1>
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files)" accept="csv" class="input-file">
              <p v-if="isInitial">
                Drag your file(s) here to begin<br> or click to browse
              </p>
              <p v-if="isSaving">
                Uploading {{ fileCount }} files...
              </p>
          </div>
        </form>
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
let api = require('../../src/api.js').default

let mapCtl = new MapControl()
const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

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
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'olcs'
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
      const olcs = await api.getOlcs(formData)
      mapCtl.plotList(olcs.olcCodes, olcs.pois)
    },
    filesChange (fieldName, fileList) {
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
