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
  FB_API_KEY: string
  FB_AUTH_DOMAIN: string
  FB_PROJECT_ID: string
  FB_STORAGE_BUCKET: string
  FB_MESSAGING_SENDER_ID: string
  FB_APP_ID: string
  FB_MEASUREMENT_ID: string
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
  FB_API_KEY: process.env.FB_API_KEY!,
  FB_AUTH_DOMAIN: process.env.FB_AUTH_DOMAIN!,
  FB_PROJECT_ID: process.env.FB_PROJECT_ID!,
  FB_STORAGE_BUCKET: process.env.FB_STORAGE_BUCKET!,
  FB_MESSAGING_SENDER_ID: process.env.FB_MESSAGING_SENDER_ID!,
  FB_APP_ID: process.env.FB_APP_ID!,
  FB_MEASUREMENT_ID: process.env.FB_MEASUREMENT_ID!
}

export default defineNuxtPlugin((_, inject) => {
  inject('env', environments)
})

declare module '@nuxt/types' {
  interface Context {
    $env: EnvVars
  }
}
