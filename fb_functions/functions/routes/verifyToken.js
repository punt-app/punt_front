const express = require("express");
const router = express.Router()
const request = require('request')
const axios = require('axios')

// collection の指定
const collectionName = 'verifyToken'
const collection = require('../utils/collection')(collectionName)

// request data の変換
const redirectUri = 'https://192.168.11.7:3000/edit'
const clientId = 1655667922
const clientSecret = 'f14b88eb580c522cf75bdbb79e4c802d'
const convertRequestDataString = code => {
  return `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`
}

const requestToken = param => {
  return new Promise((resolve, reject) => {
    request(param, (error, response, body) => {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    })
  })
}

// アクセストークンの発行
const getLineToken = async code => {
  const url = 'https://api.line.me/oauth2/v2.1/token'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const dataString = convertRequestDataString(code)
  const options = {
    url: url,
    method: 'POST',
    headers: headers,
    body: dataString
  };
  return await requestToken(options)
}

// アクセストークンの検証
const verifyLineToken = async token => {
  const url = 'https://api.line.me/oauth2/v2.1/verify'

  return await axios.get(url, {
    params: {
      access_token: token
    }
  })
}

// アクセストークンの発行と検証
router.post('/token', async (req, res) => {
  const reqToken = req.body.token
  if (!reqToken) {
    return res.status(400).send('LINE code not found')
  }

  const result = await getLineToken(reqToken)
  const lineAccessToken = JSON.parse(result).access_token
  if (!lineAccessToken) {
    return res.status(400).send('Access Token not found')
  }

  const lineTokenVerified = await verifyLineToken(lineAccessToken)
  const verifiedData = lineTokenVerified.data
  if (!verifiedData.client_id) {
    return res.status(400).send('Access Token not verified')
  }
  
  return res.status(200).send(verifiedData)
})

module.exports = router
