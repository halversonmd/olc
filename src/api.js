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
  async getCoords () {
    var resp = await this.execute('get', '/api/coords')
    console.log(resp)
    return resp
  }
}
