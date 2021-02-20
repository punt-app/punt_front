import * as functions from 'firebase-functions'
import express from 'express'
const router = express.Router()
import request from 'request'
import axios from 'axios'

// // collection の指定
// const collectionName: string = 'verifyToken'
// import { collection } from '../utils/collection'
// const verifyTokenCol = collection(collectionName)

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
    request(param, (error: Error, response: any, body: any) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}

// アクセストークンの発行
const getLineToken = async (code: string) => {
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
  return await requestToken(options)
}

// アクセストークンの検証
const verifyLineToken = async (token: string) => {
  const url: string = 'https://api.line.me/oauth2/v2.1/verify'

  return await axios.get(url, {
    params: {
      access_token: token
    }
  })
}

// アクセストークンの発行と検証
router.post('/token', async (req: any, res: any) => {
  const reqToken: string = req.body.token
  if (!reqToken) {
    return res.status(400).send({
      message: 'LINE code not found'
    })
  }

  const result = await getLineToken(reqToken)
  const lineAccessToken = JSON.parse(result).access_token
  if (!lineAccessToken) {
    return res.status(400).send({
      message: 'Access Token not found'
    })
  }

  const lineTokenVerified = await verifyLineToken(lineAccessToken)
  const verifiedData = lineTokenVerified.data
  if (!verifiedData.client_id) {
    return res.status(400).send({
      message: 'Access Token not verified'
    })
  }
  
  return res.status(200).send(verifiedData)
})

// TODO: export default に変更
module.exports = router
