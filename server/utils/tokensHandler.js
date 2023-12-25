const db = require('../utils/db');
const jwt = require('jsonwebtoken');

const jwtMessages = require('../constants/jwt');
const responseMessages = require('../constants/responseMessages');

const TokensHandler = {

   generateAccessToken: payload => {
      const accessToken = jwt.sign(payload, 'Yasoalmenyaebali', { expiresIn: "10m" });
      return accessToken;
   },

   generateRefreshToken: payload => {
      const refreshToken = jwt.sign(payload, 'Yasoalmenyaebali', { expiresIn: "30d" });
      return refreshToken;
   },

   validateAccessToken: token => {
      try {
         jwt.verify(token, 'Yasoalmenyaebali');

         return responseMessages.success;
      } catch (error) {
         // если токен валиден, но истекло время
         if (error.expiredAt) {
            return jwtMessages.timeExpired;
         }

         return jwtMessages.needAuth;
      }
   },

   validateRefreshToken: async token => {
      try {
         const decodedAccess = jwt.decode(token);
         const usernameAccess = decodedAccess.username;

         const getRefresh = await db.query(`SELECT token FROM persons WHERE username = $1`, [usernameAccess]);

         if (!getRefresh.rows.length) return jwtMessages.needAuth;

         const refreshToken = getRefresh.rows[0].token;
         const decodedRefresh = jwt.decode(refreshToken);
         const usernameRefresh = decodedRefresh.username;

         if (usernameAccess !== usernameRefresh) return jwtMessages.needAuth;

         jwt.verify(refreshToken, 'Yasoalmenyaebali');

         return responseMessages.success;
      } catch (error) {
         return jwtMessages.needAuth;
      }
   },
};

module.exports = TokensHandler;
