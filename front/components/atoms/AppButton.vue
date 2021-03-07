<template>
  <div>
    <template v-if="to">
      <nuxt-link
        class="app_button"
        :to="to"
      >
        {{ text }}
      </nuxt-link>
    </template>
    <template v-else>
      <button
        class="app_button"
        @click="clickEvent"
      >
        {{ text }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true
    },
    to: {
      type: String,
      default: null
    },
    clickEvent: {
      type: Function,
      default: () => {}
    }
  }
})
</script>

<style lang="scss" scoped>
.app_button {
  color: $text-color-white;
  background-color: $button-color-gray;
  padding: 1.2rem 4.8rem;
  border-radius: 0.8rem;
  transition: 0.1s;

  &:hover {
    opacity: 0.6;
  }
}
</style>
