import * as functions from 'firebase-functions'

const {
  front_url,
  line_login_redirect_uri,
  line_client_id,
  line_client_secret
} = functions.config().project_config

interface Envs {
  front_url: string
  line_login_redirect_uri: string
  line_client_id: string
  line_client_secret: string
}

const envs: Envs = {
  front_url,
  line_login_redirect_uri,
  line_client_id,
  line_client_secret
}

export default envs