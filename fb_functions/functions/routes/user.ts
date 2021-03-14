import express from 'express'
const router = express.Router()

import userController from '../controllers/userController'

// すべてのユーザーを取得
router.get('/all', userController.list)

// ユーザーを取得
router.get('/', userController.showById)

// // カスタムトークンを取得して返す
router.post('/createCustomToken', userController.issueToken)

// ユーザーを追加
router.post('/', userController.create)

// TODO: export default に変更
module.exports = router
