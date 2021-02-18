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
const convertRequestDataString = token => {
  return `grant_type=authorization_code&code=${token}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`
}

const requestToken = (param) => {
  return new Promise((resolve, reject) => {
    request(param, (error, response, body) => {
      if (error) {
        reject('できなかった')
      } else {
        resolve(body)
      }
    })
  })
}

// アクセストークンを発行する
router.post('/token', async (req, res) => {
  const reqToken = req.body.token
  if (!reqToken) {
    return res.status(400).send('Access Token not found')
  }

  const result = await getLineToken(reqToken)
  const resultJson = JSON.parse(result)
  if (!resultJson.access_token) {
    return res.status(400).send(resultJson)
  }
  return res.status(200).send(resultJson)
})

const getLineToken = async reqToken => {
  const url = 'https://api.line.me/oauth2/v2.1/token'
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const dataString = convertRequestDataString(reqToken)
  const options = {
    url: url,
    method: 'POST',
    headers: headers,
    body: dataString
  };
  return await requestToken(options)
}

// アクセストークンの検証
router.get('/verify', async (req, res) => {
  const reqToken = req.body.token
  if (!reqToken) {
    return res.status(400).send('Access Token not found')
  }

  const url = 'https://api.line.me/oauth2/v2.1/verify'

  await axios.get(url, {
    params: {
      access_token: reqToken
    }
  })
    .then(resul => {
      return res.status(200).send(resul.data)
    })
    .catch(e => {
      return res.status(400).send(e)
    })
})

module.exports = router
