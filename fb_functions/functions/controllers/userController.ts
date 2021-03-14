import Users from '../models/Users'
import { isErrorInstance } from '../utils/errorHandler'

/**
 * ユーザー一覧を取得する
 * @param req 
 * @param res 
 */
const list = async(req: any, res: any) => {
  const userList = await Users.getUserList()
  if (isErrorInstance(userList)) {
    return res.status(400).send('Error')
  }
  return res.status(200).send({
    users: userList
  })
}

/**
 * userId でユーザーを取得する
 * @param req 
 * @param res 
 */
const showById = async(req: any, res: any) => {
  const { userId } = req.query
  const user = await Users.getUserById(userId)
  if (isErrorInstance(user)) {
    return res.status(400).send('Error')
  }
  return res.status(200).json({
    id: user.id,
    data: user.data()
  })
}

/**
 * LINE ID token を発行する
 * @param req 
 * @param res 
 */
const issueToken = async(req: any, res: any) => {
  const {
    userId
  } = req.body

  const token = Users.issueToken(userId)
  if (isErrorInstance(token)) {
    return res.status(400).send('Error')
  }
  return res.status(200).send({
    token: token
  })
}

/**
 * firestore の user collection に doc を追加する
 * @param req 
 * @param res 
 */
const create = async(req: any, res: any) => {
  const {
    line_user_id,
    line_display_name
  } = req.body

  const result = Users.createUser(line_user_id, line_display_name)
  if (isErrorInstance(result)) {
    return res.status(400).send('Error')
  }
  return res.status(201).send({
    message: `Created a new user: ${result.uid}`
  })
}

export default {
  list,
  showById,
  issueToken,
  create
}
