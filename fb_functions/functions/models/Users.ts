import admin from 'firebase-admin'

// collection の指定
const collectionName: string = 'user'
import { collection } from '../utils/collection'
const userCol = collection(collectionName)

import { convertGetResponse } from '../utils/convertGetResponse'
import { getServerTimestamp } from '../utils/getServerTimestamp'

const getUserList = () => {
  return new Promise(async(res: any, rej: any) => {
    try {
      const response = await userCol.get()
      const data = convertGetResponse(response)
      res(data)
    } catch (error) {
      rej(new Error(error))
    }
  })
}

const getUserById = (userId: string): any => {
  return new Promise(async(res: any, rej: any) => {
    try {
      const response = await userCol.doc(userId).get()
      res(response)
    } catch (error) {
      rej(new Error(error))
    }
  })
}

const hasHouseId = (userId: string): Promise<boolean> => {
  return new Promise(async(res: any, rej: any) => {
    try {
      const response: any = await userCol.doc(userId).get()
      const { houseId } = response.data()
      res(!!houseId)
    } catch (error) {
      rej(new Error(error))
    }
  })
}

const issueToken = (userId: string) => {
  return new Promise(async(res: any, rej: any) => {
    admin.auth().createCustomToken(userId)
      .then(token => {
        res(token)
      })
      .catch((error: any) => {
        rej(new Error(error))
      })
  })
}

const createUser = (lineUserId: string, lineDisplayName: string): any => {
  return new Promise(async(res: any, rej: any) => {
    try {
      await userCol.doc(lineUserId).set({
        lineUserId,
        lineDisplayName,
        createdAt: getServerTimestamp()
      })
        .then((doc: any) => {
          res(doc)
        })
    } catch (error) {
      rej(new Error(error))
    }
  })
}

const updateUser = (params: { lineUserId: string, houseId: string }) => {
  return new Promise(async(res: any, rej: any) => {
    const {
      lineUserId,
      houseId
    } = params
    try {
      await userCol.doc(lineUserId).update({
        houseId: houseId
      })
        .then((doc: any) => {
          res(doc)
        })
    } catch(error) {
      rej(new Error(error))
    }
  })
}

export default {
  getUserList,
  getUserById,
  hasHouseId,
  issueToken,
  createUser,
  updateUser
}
