import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export type EnvVars = {
  NODE_ENV: string
  browser: boolean
  client: boolean
  mode: 'spa' | 'universal'
  modern: boolean
  server: boolean
  static: boolean
  APP_NAME: string
  // LINE
  LINE_MESSAGE_URL: string
  LINE_CLIENT_ID: string
  LINE_LOGIN_REDIRECT_URI: string
  FB_FUNCTIONS_URL: string
}

export const environments: EnvVars = {
  NODE_ENV: process.env.NODE_ENV!,
  browser: process.browser!,
  client: process.client!,
  mode: process.mode!,
  modern: process.modern!,
  server: process.server!,
  static: process.static!,
  APP_NAME: process.env.APP_NAME!,
  LINE_MESSAGE_URL: process.env.LINE_MESSAGE_URL!,
  LINE_CLIENT_ID: process.env.LINE_CLIENT_ID!,
  LINE_LOGIN_REDIRECT_URI: process.env.LINE_LOGIN_REDIRECT_URI!,
  FB_FUNCTIONS_URL: process.env.FB_FUNCTIONS_URL!,
}

export default defineNuxtPlugin((_, inject) => {
  inject('env', environments)
})

declare module '@nuxt/types' {
  interface Context {
    $env: EnvVars
  }
}
