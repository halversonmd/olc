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
  getCoords () {
    return this.execute('get', '/api/coords')
  },
  getOlcs (coords) {
    return this.execute('post', '/api/olcCodes', coords)
  }
}
