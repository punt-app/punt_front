import axios from 'axios'

const baseUrl = 
  process.env.NODE_ENV === 'production'
  ? process.env.API_URL
  : 'http://localhost:10080/'

console.log('baseUrl: ', baseUrl)

const axiosConfig = {
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  }
}

export default axiosConfig