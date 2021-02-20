import envs from "../src/env";

const corsOptions = {
  origin: envs.front_url,
  credentials: true
}

export default corsOptions