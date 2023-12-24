import { Auth0Server, initAuth0 } from "@auth0/nextjs-auth0";
import { config } from "@repo/shared";

export const pageRouterAuth: Auth0Server = initAuth0({
  auth0Logout: !config.AUTH0_ISSUER_BASE_URL.startsWith("http://localhost"),
  routes: {
    login: "/api/page-router-auth/login",
    callback: "/api/page-router-auth/callback",
    postLogoutRedirect: "/page-router",
  },
});
