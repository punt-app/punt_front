<template>
  <div class="page__wrapper">
    <div class="page__container">
      <h1 class="title">
        家事シェア
      </h1>

      <user-provider>
        <Nuxt />
      </user-provider>
    </div>
  </div>
</template>

<script lang="ts">
import UserProvider from '~/components/UserProvider'

export default {
  components: { UserProvider }
}
</script>

<style>
@import "~assets/scss/main_page.scss";
</style>
