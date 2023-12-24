import { NextApiRequest, NextApiResponse } from "next";
import {
  AfterRefresh,
  getAccessToken,
  getSession,
  withApiAuthRequired,
} from "@auth0/nextjs-auth0";
import { config } from "@repo/shared";

const afterRefresh: AfterRefresh = (_req, _res, session) => {
  delete session.idToken;
  return session;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession(req, res);

    if (session?.accessToken) {
      const appSession = req.cookies.appSession;

      const data = {
        accessToken: session?.accessToken,
        appSession: appSession,
      };
      return res.status(200).json(data);
    }

    const info = await fetch(`${config.AUTH0_ISSUER_BASE_URL}/userinfo`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    console.log("info: ", await info.json());

    const { accessToken } = await getAccessToken(req, res, {
      afterRefresh,
      authorizationParams: {
        response_type: "code",
        audience: config.AUTH0_AUDIENCE,

        client_id: config.AUTH0_CLIENT_ID,
        client_secret: config.AUTH0_CLIENT_SECRET,

        client_assertion_type:
          "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      },
    });

    const appSession = req.cookies.appSession;

    const data = {
      accessToken: accessToken,
      appSession: appSession,
    };
    return res.status(200).json(data);
  } catch (e: any) {
    console.error(e?.message);
    return res.status(500).json({ error: e?.message });
  }
};

// const getTokenHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   let data: {
//     accessToken: string;
//     accessToken2: string;
//     appSession: string;
//     error: undefined | string;
//     auth0Config?: typeof auth0Config;
//   } = {
//     accessToken: undefined,
//     accessToken2: undefined,
//     appSession: undefined,
//     error: undefined,
//   };

//   const auth0 = new AuthenticationClient({
//     domain: auth0Config.baseURL,
//     clientId: auth0Config.clientID,
//     clientSecret: auth0Config.clientSecret,
//   });

//   const auth = auth0.oauth.authorizationCodeGrant({
//     code: req.headers.authorization,
//   });
//   console.log("auth: ", auth);

//   if (data.error) {
//     return res.status(500).json(data);
//   }

//   return res.status(200).json(data);
// };

export default withApiAuthRequired(handler);
