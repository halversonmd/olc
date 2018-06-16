import axios from 'axios'

const apiUrl = process.env.API_URL
var env = process.env.NODE_ENV

const client = axios.create({
  baseURL: apiUrl,
  json: true
})

var clientInfoApi = {
  getInfo () {
    return axios.get('https://json.geoiplookup.io/api').then((req) => {
      return req.data
    })
  }
}

var exec = {
  execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(function (req) {
      return req.data
    })
  },
  getOlcs (lat, lon, radius, size) {
    let params = 'lat=' + lat + '&lon=' + lon + '&rad=' + radius + '&sz=' + size
    return this.execute('get', '/api/olcCodes?' + params)
  },
  postOlcs (coords) {
    return this.execute('post', '/api/olcCodes', coords)
  },
  testGetOlcs () {
    return this.execute('get', '/api/testOlcs')
  },
  formSubmit (formData) {
    return this.execute('post', '/api/submit', formData)
  }
}

export default {
  exec, env, clientInfoApi
}
