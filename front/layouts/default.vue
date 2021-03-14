<template>
  <div>
    <user-provider>
      <Nuxt />
    </user-provider>
  </div>
</template>

<script lang="ts">
import UserProvider from '~/components/UserProvider'

export default {
  components: { UserProvider }
}
</script>

<style>
</style>
