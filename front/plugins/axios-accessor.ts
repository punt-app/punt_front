import { Plugin } from '@nuxt/types'
import { initializeAxios } from '~/utils/api'

const baseUrl = process.env.FB_FUNCTIONS_URL

export const accessor: Plugin = ({ $axios }): void => {
  $axios.setBaseURL(baseUrl)
  $axios.setHeader('Content-Type', 'application/json;charset=UTF-8')
  $axios.setHeader('Access-Control-Allow-Origin', '*')
  initializeAxios($axios)
};

export default accessor
