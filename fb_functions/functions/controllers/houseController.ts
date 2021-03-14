import Houses from '../models/Houses'
import { isErrorInstance } from '../utils/errorHandler'

/**
 * @param req 
 * @param res 
 */
const create = async(req: any, res: any) => {
  const {
    line_user_id,
    familyName,
    relationship
  } = req.body

  const house: any = await Houses.createHouseWithUser(line_user_id, familyName, relationship)
  if (house?.statusCode === 501) {
    return res.status(501).send({
      message: house?.message || 'Error: User has already registered the family account.'
    })
  }
  if (isErrorInstance(house)) {
    return res.status(400).send('Error: create house')
  }
  return res.status(201).send({
    message: `Created a new house: ${house.uid}`
  })
}

export default {
  create
}