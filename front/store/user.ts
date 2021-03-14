import { $axios } from '../utils/api'
import { reactive } from '@nuxtjs/composition-api'
import User from '~/types/user'

export default function userStore() {
  const state = reactive({
    user: {}
  })

  return {
    get user() {
      return state.user
    },
    async getUser(userId) {
      const user: User = await $axios.$get('/user', {
        params: {
          userId
        }
      })
      return user
    }
  }
}

export type UserStore = ReturnType<typeof userStore>
