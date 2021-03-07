<template>
  <div class="page__container">
    <p class="message">
      家事シェアはパートナーと家事を分担して見える化するサービスです。あなたが担当する家事を家事シェアが LINE でお知らせします。
    </p>

    <line-button
      class="button__line_account"
      button-text="LINE ログイン"
      :url="lineUrl"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, useContext } from "@nuxtjs/composition-api";
import { parseUrl } from '~/utils/parseUrl'

export default defineComponent ({
  layout: 'main',
  setup() {
    const {
      LINE_CLIENT_ID,
      LINE_LOGIN_REDIRECT_URI
    } = useContext().$env

    const lineUrl = parseUrl(
      'https://access.line.me/oauth2/v2.1/authorize', 
      {
        response_type: 'code',
        client_id: LINE_CLIENT_ID,
        redirect_uri: LINE_LOGIN_REDIRECT_URI,
        state: '12345abcde',
        scope: 'profile%20openid',
        nonce: '09876xyz'
      }
    )

    return {
      lineUrl
    }
  }
})
</script>

<style scoped lang="scss">
@import "~assets/scss/main_page.scss";
</style>
