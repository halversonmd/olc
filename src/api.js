import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080/',
  json: true
})

export default {
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
  }
}
