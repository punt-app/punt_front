import express from 'express'
const router = express.Router()

// collection の指定
const collectionName = 'message'
import { collection } from '../utils/collection'
const messageCol = collection(collectionName)

// utils の取得
import { convertGetResponse } from '../utils/convertGetResponse'
import { getServerTimestamp } from '../utils/getServerTimestamp'

// すべてのメッセージを取得
router.get('/all', async (req: any, res: any) => {
  try {
    const response = await messageCol.get()
    const data = convertGetResponse(response)
    res.status(201).send(data)
  } catch (error) {
    res.status(400).send('Error')
  }
})

// メッセージを追加
router.post('/', async (req: any, res: any) => {
  const message = {
    text: req.body.text,
    createdAt: getServerTimestamp()
  };

  try {
    const response = await messageCol.add(message)
    res.status(201).send(`Created a new message: ${response.id}`)
  } catch (error) {
    res.status(400).send('Error')
  }
})

// TODO: export default に変更
module.exports = router
