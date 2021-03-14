import LineToken from '../models/LineToken'
import { isErrorInstance } from '../utils/errorHandler'

// アクセストークンの取得
const verifyLineToken = async(req: any, res: any) => {
  const reqToken: string = req.body.token
  if (!reqToken) {
    return res.status(400).send({
      message: 'LINE code not found'
    })
  }

  const result: any = await LineToken.getLineToken(reqToken)
  const lineAccessToken = JSON.parse(result).access_token
  if (isErrorInstance(lineAccessToken) || !lineAccessToken) {
    return res.status(400).send({
      message: 'Access Token not found'
    })
  }

  const lineTokenVerified: any = await LineToken.verifyLineToken(lineAccessToken)
  const verifiedData = lineTokenVerified.data
  if (isErrorInstance(verifiedData) || !verifiedData.client_id) {
    return res.status(400).send({
      message: 'Access Token not verified'
    })
  }

  const profile: any = await LineToken.getLineUserProfile(lineAccessToken)
  if (isErrorInstance(profile) || !profile.data.userId) {
    return res.status(400).send({
      message: 'User profile not found'
    })
  }

  return res.status(200).send({
    profile: profile.data
  })
}

export default {
  verifyLineToken
}
