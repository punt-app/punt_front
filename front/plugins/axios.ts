const baseUrl = process.env.FB_FUNCTIONS_URL

const axiosConfig = {
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  }
}

export default axiosConfig