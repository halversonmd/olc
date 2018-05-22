import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080/',
  json: true
})

export default {
  async execute (method, resource, data) {
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getCoords () {
    var coords = [[40.817271964012974, -74.03211564029554], [40.817271964012974, -73.97716188630599], [40.76721868577083, -74.08706939428511], [40.76721868577083, -74.03219843277579], [40.76721868577083, -73.97732747126648], [40.76721868577083, -73.92245650975717], [40.71716540752868, -74.08706939428511], [40.71716540752868, -74.03228095473358], [40.71716540752868, -73.97749251518206], [40.71716540752868, -73.92270407563053], [40.66711212928654, -74.03236320723352], [40.66711212928654, -73.97765702018192]]
    return coords
  }
}
