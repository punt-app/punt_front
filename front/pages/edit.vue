<template>
  <div>
    <p>{{ state }}</p>
    <div>
      <app-button 
        text="はじめての方"
        to="/"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  useContext,
} from "@nuxtjs/composition-api";
import firebase from '~/plugins/firebaseInit'

export default defineComponent({
  layout: 'main',
  async middleware({ route, $axios, redirect }) {
    const getFbLoginStatus = (): Promise<{uid: string}> => {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
          resolve(user)
        })
      })
    }
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

    /**
     * API で LINE アクセストークンの検証を行い、LINE からユーザの profile を取得する
     */
    const resLineVerified = await $axios.post('/verifyToken/accessToken', {
      token: route.query.code
    })
    if (resLineVerified instanceof Error) {
      console.error('Error', resLineVerified.message)
      return
    }
    const { profile } = resLineVerified.data

    /**
     * ローカルで firebase admin の createCustomToken が使えないため、リモートの api を叩いている
     * 
     * TODO: ローカルで auth 機能使えるようにする
     */
    const resFbCustomToken = await $axios.post(
      'https://asia-northeast1-punt-api-67f95.cloudfunctions.net/api/user/createCustomToken', {
        userId: profile.userId,
        name: profile.displayName
      }
    )
    const { token } = resFbCustomToken.data

    /**
     * カスタムトークンを生成して firebase にサインインする
     */
    const getSignedFbUser = () => {
      return new Promise((resolve, reject) => {
        firebase.auth().signInWithCustomToken(token)
          .then(res => {
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
    const fbSigedUser = await getSignedFbUser()
    if (fbSigedUser instanceof Error) {
      console.error('You cannot sign in with custom token.', fbSigedUser)
      return redirect('/login')
    }

    /**
     * カスタムトークンでサインインできたら firestore にユーザ登録する
     */
    const {
      userId,
      displayName
    } = profile

    const resAddUserFB = await $axios.post('/user', {
      line_user_id: userId,
      line_display_name: displayName
    })
    console.log('res: ', resAddUserFB)
  },
  setup() {
    const state = reactive({
    })

    const { $axios, route } = useContext()

    return {
      state
    }
  }
})
</script>

<style scoped lang="scss">
.fbAccessToken {
  overflow-wrap: break-word;
  max-width: 50rem;
}
</style>
