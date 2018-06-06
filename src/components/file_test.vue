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
      <b-col>
        <!--UPLOAD-->
        <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
          <h1>Upload Coords</h1>
          <div class="dropbox">
            <input type="file" multiple :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" accept="csv" class="input-file">
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

// let MapControl = require('../../static/js/mapControl').default
let api = require('../../src/api').default
// let mapCtl = new MapControl()

const STATUS_INITIAL = 0
const STATUS_SAVING = 1
const STATUS_SUCCESS = 2
const STATUS_FAILED = 3

export default {
  created: async () => {
    // mapCtl.globalMap = await document.getElementById('map-canvas')
    // mapCtl.newMap()
    'hi'
  },
  name: 'upload',
  data () {
    return {
      olcSize: false,
      map: null,
      selectOlcAlert: false,
      clickedData: {
        lat: '',
        lon: '',
        olcCode: ''
      },
      uploadedFiles: [],
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
    // loadMap () {
    //   mapCtl.loadOlc()
    // },
    // loadClickData () {
    //   this.clickedData = mapCtl.clickData()
    // },
    reset () {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL
      this.uploadedFiles = []
      this.uploadError = null
    },
    save (formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING

      api.getOlcs(formData)
        .then(x => {
          console.log('got olcs', x)
          this.uploadedFiles = [].concat(x)
          this.currentStatus = STATUS_SUCCESS
        })
        .catch(err => {
          console.log('err', err)
          this.uploadError = err.response
          this.currentStatus = STATUS_FAILED
        })
    },
    filesChange (fieldName, fileList) {
      // handle file changes
      const formData = new FormData()
      if (!fileList.length) return
      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append('olcFile', fileList[x])
        })
      this.save(formData)
    }
  },
  mounted: async function () {
    // this.map = await mapCtl
    // let _thisVue = this
    // this.map.globalMap.addListener('click', (e) => {
    //   if (_thisVue.olcSize) {
    //     mapCtl.placeMarkerAndPanTo(e.latLng, _thisVue.olcSize)
    //     _thisVue.loadClickData()
    //   } else {
    //     _thisVue.selectOlcAlert = true
    //   }
    // })
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
