import Axios from 'axios';

const Default = Axios.create({
  baseURL: 'https://www.dalwa.ghinaa-app.com:1080/api/v1/',
  headers: { Accept: 'application/json' },
  responseType: 'json'
})

export default Default;