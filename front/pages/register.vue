<template>
  <div>
    <form @submit.prevent="addHouseWithUser()">
      <label　for="name">ファミリー名</label>
      <input
        type="text"
        id="name"
        name="family_name"
        v-model="state.formData.familyName"
      >

      <fieldset>
        <legend>続柄</legend>
        <template v-for="(relation, index) in relations">
          <label :key="`relation_${index}`">
            {{ relation.label }}
            <input
              type="radio"
              name="relationship"
              :value="relation.value"
              @change="updateValue"
            >
          </label>
        </template>
      </fieldset>
    </form>
    <p>{{ isFormDataFilled }}</p>
    <p>{{ state }}</p>
  </div>
</template>

<script lang="ts">
import { 
  computed,
  defineComponent,
  inject,
  reactive,
  useAsync,
  useContext
} from '@nuxtjs/composition-api'
import firebase from '~/plugins/firebaseInit'
import UserKey from '~/composables/user-key'

const initFirebaseAuth = (): Promise<{uid: string}> => {
  return new Promise(resolve => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      resolve(user)
      unsubscribe()
    })
  })
}

export default defineComponent({
  setup() {
    const relations = [
      {
        label: '夫',
        value: 'husband'
      },
      {
        label: '妻',
        value: 'wife'
      }
    ]

    const state = reactive({
      fbUserId: null,
      userList: [],
      formData: {
        relationship: null,
        familyName: null
      }
    })

    const { $axios } = useContext()

    const userState = inject(UserKey)
    if (!userState) {
      throw new Error(`${UserKey} is not provided.`)
    }

    useAsync(async() => {
      const user = await initFirebaseAuth()
      const { uid } = firebase.auth().currentUser
      state.fbUserId = uid
    })

    const updateValue = (event: Event): void => {
      if (event.target instanceof HTMLInputElement) {
        const {
          name,
          value
        } = event.target
        state.formData[name] = value
      }
    }

    const isFormDataFilled = (
      computed((): boolean => Object.keys(state.formData).every(key => state.formData[key]))
    )

    const addHouseWithUser = async () => {
      if (!isFormDataFilled.value) {
        return
      }

      await $axios.post('/house', {
        line_user_id: state.fbUserId,
        ...state.formData
      })
        .then(res => {
          console.log(res)
        })
        .catch((error) => {
          console.error(error.response.data.message)
        })
    }

    return {
      state,
      relations,
      updateValue,
      isFormDataFilled,
      addHouseWithUser
    }
  }
})
</script>
