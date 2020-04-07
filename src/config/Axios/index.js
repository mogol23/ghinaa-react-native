import Axios from 'axios';

const instance =  Axios.create({
  baseURL: 'http://180.222.216.66:8080/api/v1/',
  headers: { 'Accept': 'application/json' },
  responseType: 'json'
})

export default instance;