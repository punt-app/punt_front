<template>
  <div class="button--line_account">
    <a
      class="anchor"
      :href="url"
    >
      <span class="logo__wrapper">
        <img
          class="logo"
          src="~/assets/logos/line_logo.png"
          alt="line logo"
        >
      </span>
      <span class="button__text">
        {{ buttonText }}
      </span>
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      required: true
    }
  }
})

</script>

<style scoped lang="scss">
$line-base-color: #00c300;

.button--line_account {
  display: inline-flex;
  border-radius: 1rem;
  background-color: #00c300;
  margin-bottom: 16rem;

  &:hover {
    opacity: 1;
    background-color: #00e000;
  }
}

.anchor {
  display: flex;
  &:hover {
    opacity: 1;
  }
}

.logo__wrapper {
  display: inline-flex;
  align-items: center;
  padding: 0 0.8rem;
  border-right: 1px solid darken($line-base-color, 15%);

  .logo {
    min-width: 2.4rem;
    width: 2.4rem;
    min-height: 2.4rem;
    height: 2.4rem;

    @media (min-width: 640px) {
      min-width: 3rem;
      width: 3rem;
      min-height: 3rem;
      height: 3rem;
    }
  }
}

.button__text {
  color: #fff;
  font-size: 1.6rem;
  padding: 1.2rem 2.4rem;
}

</style>