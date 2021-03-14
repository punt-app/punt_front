import express from 'express'
const router = express.Router()

import lineTokenController from '../controllers/lineTokenController'

router.post('/accessToken', lineTokenController.verifyLineToken)

// TODO: export default に変更
module.exports = router
