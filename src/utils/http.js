import axios from 'axios'
import qs from 'qs'

const root = 'https://www.test.com'

export default {
  Test1 (params) {
    return axios.post(`${root}/Test1`, qs.stringify(params))
  },
  Test2 (params) {
    return axios.post(`${root}/Test2`, qs.stringify(params))
  }
}