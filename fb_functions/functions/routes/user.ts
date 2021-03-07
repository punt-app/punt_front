import admin from 'firebase-admin'
import express from 'express'
const router = express.Router()

// collection の指定
const collectionName: string = 'user'
import { collection } from '../utils/collection'
const userCol = collection(collectionName)

import { convertGetResponse } from '../utils/convertGetResponse'
import { getServerTimestamp } from '../utils/getServerTimestamp'

// すべてのユーザーを取得
router.get('/all', async (req: any, res: any) => {
  try {
    const response = await userCol.get()
    const data = convertGetResponse(response)
    res.status(201).send(data)
  } catch (error) {
    res.status(400).send('Error')
  }
})

router.get('/', async (req: any, res: any) => {
  const userId = req.query.userId
  try {
    const response = await userCol.doc(userId).get()
    res.status(200).json({
      id: response.id,
      data: response.data()
    })
  } catch (error) {
    res.status(400).send('Error')
  }
})

// カスタムトークンを取得して返す
router.post('/createCustomToken', async (req: any, res: any) => {
  const {
    userId
  } = req.body

  admin.auth().createCustomToken(userId)
    .then(token => {
      return res.status(200).send({
        token: token
      })
    })
    .catch(e => {
      return res.status(400).send(e)
    })
})

// ユーザーを追加
router.post('/', async(req: any, res: any) => {
  const {
    line_user_id,
    line_display_name
  } = req.body

  try {
    const response = await userCol.add({
      line_user_id,
      line_display_name,
      createdAt: getServerTimestamp()
    })
    res.status(201).send(`Created a new user: ${response.id}`)
  } catch (error) {
    res.status(400).send('Error: create user')
  }
})

// TODO: export default に変更
module.exports = router
