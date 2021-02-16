<template>
  <div class="page__wrapper">
    <div class="page__container">
      <h1 class="title">
        家事シェア
      </h1>

      <p class="message">
        家事シェアはパートナーと家事を分担して見える化するサービスです。あなたが担当する家事を家事シェアが LINE でお知らせします。
      </p>
      <line-button
        class="button__line_account"
        button-text="LINE アカウント連携"
        :url="$env.LINE_MESSAGE_URL"
      />
    </div>
    <button @click="getUsers()">get</button>
  </div>
</template>

<script>
export default {
  methods: {
    async getUsers() {
      const res = await this.$axios.get('http://localhost:5001/punt-api-67f95/us-central1/api/users')
      console.log('res: ', res)
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/scss/top_page.scss";
</style>
