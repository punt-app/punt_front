const express = require("express");
const router = express.Router()
const request = require('request')

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
  
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  const dataString = convertRequestDataString(reqToken)

  const options = {
    url: 'https://api.line.me/oauth2/v2.1/token',
    method: 'POST',
    headers: headers,
    body: dataString
  };

  (async function(){
    try{
      const result = await requestToken(options);
      console.log('📧', result)
      return res.status(200).send(JSON.parse(result))
    }catch(error){
      return res.status(400).send(error)
    }
  })();
})

router.get('/verify', async (req, res) => {
  const reqToken = req.body.token

  const options = {
    method: 'GET',
    url: `https://api.line.me/oauth2/v2.1/verify?access_token=${reqToken}`
  }

  (async function(){
    try{
      const result = await requestToken(options);
      return res.status(200).send(JSON.parse(result))
    }catch(error){
      return res.status(400).send(error)
    }
  })();
})

module.exports = router
