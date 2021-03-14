import firebase from '~/plugins/firebaseInit'
import { Context } from '@nuxt/types'

const getFbLoginStatus = (): Promise<{uid: string}> => {
  return new Promise(resolve => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve(user)
      unsubscribe()
    })
  })
}

export default async function ({ route, redirect, $axios }): Promise<Context> {
  const fbLoginStatus = await getFbLoginStatus()
  /**
   * firebase にログインしてあり、かつ firestore にユーザ情報があるときは処理を止める。
   */
  if (fbLoginStatus?.uid) {
    const resGetUser = await $axios.get('https://asia-northeast1-punt-api-67f95.cloudfunctions.net/api/user/', {
      params: {
        userId: fbLoginStatus.uid
      }
    })
    if (resGetUser.data.id) {
      console.log('Already logged in fb.')
      return
    }
  }
  if (route.name !== 'login') {
    return redirect('/login')
  }
}
