const express = require("express");
const router = express.Router()
const convertGetResponse = require('../utils/convertGetResponse')

// collection の指定
const collectionName = 'message'
const collection = require('../utils/collection')(collectionName)

const getServerTimestamp = require('../utils/getServerTimestamp')

// すべてのメッセージを取得
router.get('/all', async (req, res) => {
  try {
    const response = await collection.get()
    const data = convertGetResponse(response)
    res.status(201).send(data)
  } catch (error) {
    res.status(400).send('Error')
  }
})

// メッセージを追加
router.post('/', async (req, res) => {
  const message = {
    text: req.body.text,
    createdAt: getServerTimestamp()
  };

  try {
    const response = await collection.add(message)
    res.status(201).send(`Created a new message: ${response.id}`)
  } catch (error) {
    res.status(400).send('Error')
  }
})

module.exports = router
