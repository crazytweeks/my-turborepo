import { config } from "./config.js";

const auth0config = {
  secret: config.AUTH0_SECRET,
  baseURL: config.AUTH0_BASE_URL,
  issuerBaseURL: config.AUTH0_ISSUER_BASE_URL,
  clientID: config.AUTH0_CLIENT_ID,
  audience: config.AUTH0_AUDIENCE,
  clientSecret: config.AUTH0_CLIENT_SECRET,
} as const;

export default auth0config;
