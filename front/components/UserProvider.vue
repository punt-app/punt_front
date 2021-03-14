<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  provide
} from "@nuxtjs/composition-api";
import userStore from '~/store/user'
import UserKey from '~/composables/user-key'

export default defineComponent({
  setup() {
    provide(UserKey, userStore())

    const state = inject(UserKey)
    if (!state) {
      throw new Error('No User Key')
    }
    return {}
  }
})
</script>
