import * as functions from 'firebase-functions'
import request from 'request'
import axios from 'axios'

// request data の変換
const redirectUri: string = functions.config().project_config.line_login_redirect_uri
const clientId: string = functions.config().project_config.line_client_id
const clientSecret: string = functions.config().project_config.line_client_secret
const convertRequestDataString = (code: string): string => {
  return `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`
}

interface headers {
  'Content-Type': string
}
interface params {
  url: string,
  method: string,
  headers: headers,
  body: string
}

const requestToken = (param: params): Promise<string> => {
  return new Promise((resolve, reject) => {
    request(param, (error, response: any, body: any) => {
      if (error) {
        reject(new Error(error))
      } else {
        resolve(body)
      }
    })
  })
}

const getLineToken = (code: string) => {
  return new Promise(async(resolve, reject) => {
    const url = 'https://api.line.me/oauth2/v2.1/token'
    const headers: headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    const dataString = convertRequestDataString(code)
    const options: params = {
      url: url,
      method: 'POST',
      headers: headers,
      body: dataString
    };
    const res = await requestToken(options)
    resolve(res)
  })
}

// アクセストークンの検証
const verifyLineToken = async (token: string) => {
  return new Promise(async(resolve: any, reject: any) => {
    const url: string = 'https://api.line.me/oauth2/v2.1/verify'

    const res = await axios.get(url, {
      params: {
        access_token: token
      }
    })
    if (!res) {
      reject(new Error(res))
    }
    resolve(res)
  })
}

// アクセストークンの検証
const getLineUserProfile = async (token: string) => {
  return new Promise(async(resolve: any, reject: any) => {
    const url: string = 'https://api.line.me/v2/profile'

    const res = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    if (!res) {
      reject(new Error(res))
    }
    resolve(res)
  })
}

export default {
  getLineToken,
  verifyLineToken,
  getLineUserProfile
}
