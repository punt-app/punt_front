<template>
  <div class="page__container">
    <p class="message">
      家事シェアはパートナーと家事を分担して見える化するサービスです。あなたが担当する家事を家事シェアが LINE でお知らせします。
    </p>
    <line-button
      class="button__line_account"
      button-text="LINE アカウント連携"
      :url="$env.LINE_MESSAGE_URL"
    />
  </div>
</template>

<script>
export default {
  layout: 'main'
}
</script>

<style scoped lang="scss">
@import "~assets/scss/main_page.scss";
</style>
