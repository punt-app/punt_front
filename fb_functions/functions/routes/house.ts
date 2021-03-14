import express from 'express'
const router = express.Router()

import houseController from '../controllers/houseController'

// house ドキュメントを作成する
router.post('/', houseController.create)

// TODO: export default に変更
module.exports = router
