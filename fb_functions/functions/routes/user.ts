export {}

const express = require("express");
const router = express.Router()
const convertGetResponse = require('../utils/convertGetResponse')

// collection の指定
const collectionName: string = 'user'
const collection = require('../utils/collection')(collectionName)

// すべてのユーザーを取得
router.get('/all', async (req: any, res: any) => {
  try {
    const response = await collection.get()
    const data = convertGetResponse(response)
    res.status(201).send(data)
  } catch (error) {
    res.status(400).send('Error')
  }
})

router.get('/', async (req: any, res: any) => {
  const userId = req.query.userId
  console.log('id: ', userId)
  try {
    const response = await collection.doc(userId).get()
    res.status(200).json({id:response.id, data:response.data()})
  } catch (error) {
    res.status(400).send('Error')
  }
})

// ユーザーを追加
router.post('/', async (req: any, res: any) => {
  const message = {
    text: req.body.text,
  };

  try {
    const response = await collection.add(message)
    res.status(201).send(`Created a new user: ${response.id}`)
  } catch (error) {
    res.status(400).send('Error')
  }
})

module.exports = router
