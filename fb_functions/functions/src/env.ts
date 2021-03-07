import * as functions from 'firebase-functions'

const {
  dev_front_url,
  prod_front_url,
  line_login_redirect_uri,
  line_client_id,
  line_client_secret
} = functions.config().project_config

interface Envs {
  dev_front_url: string
  prod_front_url: string
  line_login_redirect_uri: string
  line_client_id: string
  line_client_secret: string
}

const envs: Envs = {
  dev_front_url,
  prod_front_url,
  line_login_redirect_uri,
  line_client_id,
  line_client_secret
}

export default envs