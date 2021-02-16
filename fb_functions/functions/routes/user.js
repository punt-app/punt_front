const express = require("express");
const router = express.Router()
const convertGetResponse = require('../utils/convertGetResponse')

// collection の指定
const collectionName = 'user'
const request = require('../utils/request')(collectionName)

// すべてのユーザーを取得
router.get('/all', async (req, res) => {
  try {
    const response = await request.get()
    const data = convertGetResponse(response)
    res.status(201).send(data)
  } catch (error) {
    res.status(400).send('Error')
  }
})

// ユーザーを追加
router.post('/', async (req, res) => {
  const message = {
    text: req.body.text,
  };

  try {
    const response = await request.add(message)
    res.status(201).send(`Created a new user: ${response.id}`)
  } catch (error) {
    res.status(400).send('Error')
  }
})

module.exports = router
