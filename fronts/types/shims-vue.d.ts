import { EnvVars } from '~/plugins/environments'

declare module 'vue/types/vue' {
  interface Vue {
    $env: EnvVars
  }
}