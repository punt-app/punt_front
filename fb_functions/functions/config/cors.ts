import envs from "../src/env";

const corsOptions = {
  origin: [envs.dev_front_url, envs.prod_front_url],
  credentials: true
}

export default corsOptions