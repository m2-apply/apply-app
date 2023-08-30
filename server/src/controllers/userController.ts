import db from '../config/postgresSchema';
import dotenv from 'dotenv';
import { OAuth2Client } from 'google-auth-library';
dotenv.config();

type userControllerType = {
  generateAuthUrl: (req, res, next) => any;
  getAccessToken: (req, res, next) => any;
};

async function getUserData(access_token) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token${access_token}`,
  );
  const data = await response.json();
}

const userController: userControllerType = {
  generateAuthUrl: async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Refferer-Policy', 'no-referrer-when-downgrade');

    const redirectUrl = 'http://localhost:1337/api/sessions/oauth/google';

    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl,
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
      prompt: 'consent',
    });

    res.locals.url = { url: authorizeUrl };

    return next();
  },

  getAccessToken: async (req, res, next) => {
    const code = req.query.code;
    try {
      const redirectUrl = 'http://localhost:1337/api/sessions/oauth/google';
      const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectUrl,
      );

      //get token back
      const res = await oAuth2Client.getToken(code);
      // set credentials
      await oAuth2Client.setCredentials(res.tokens);
      console.log('Tokens acquired');

      // this is only permission for the data
      const user = oAuth2Client.credentials;

      await getUserData(user.access_token);
    } catch (err) {
      console.log('google oauth failed');
    }

    return next();
  },
};

export default userController;
