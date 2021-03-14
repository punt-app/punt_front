// collection の設定
const collectionName: string = 'house'
import { collection } from '../utils/collection'
const houseCol = collection(collectionName)

import Users from './Users'

import { getServerTimestamp } from '../utils/getServerTimestamp'

const createHouseWithUser = (lineUserId: string, name: string, relationship: string) => {
  return new Promise(async(res: any, rej: any) => {
    let houseRes: any
    try {
      // house がすでにある場合はエラーを返す
      const isHouseIdExisted = await Users.hasHouseId(lineUserId)
      if (isHouseIdExisted) {
        res({
          statusCode: 501,
          message: 'Error: User has already registered the family account.'
        })
      }

      // house を追加する
      await houseCol.add({
        name,
        relationship,
        memberIds: [lineUserId],
        createdAt: getServerTimestamp()
      })
        .then(async(doc: any) => {
          houseRes = doc
        })

      // user doc に houseId を追加する
      await Users.updateUser({
        lineUserId: lineUserId,
        houseId: houseRes.id
      })
        .then(async(doc: any) => {
          res(doc)
        })
    } catch (error) {
      rej(new Error(error))
    }
  })
}

export default {
  createHouseWithUser
}
