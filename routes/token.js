const jwt = require('jsonwebtoken');
const config = require('../config')
const tokenList = {};

//--------------------------------------------HANDLING USER------------------------------------
const dbUser ={
  name:'xxx',
  password:'aaa'
}
//----------------------TOKEN HANDLING (genrerating access_token and refresh_token)----------------

module.exports.token =(req,res) =>{
  const user = req.body;
  console.log(user);
   if (JSON.stringify(user) == JSON.stringify(dbUser))
      console.log('yes');
    else
      console.log('no');
  if (JSON.stringify(user) == JSON.stringify(dbUser)){
  const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
      const refreshToken = jwt.sign(user, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife})
      const response = {
          "status": "Logged in",
          "token": token,
          "refreshToken": refreshToken,
      }
      tokenList[refreshToken] = response
      res.status(200).json(response);
     }
};

//------------------------------------REFRESH TOKEN----------------------------------------------------

module.exports.refToken = (req,res) =>{
// refresh token
const postData = req.body
// if refresh token exists
  if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "name": postData.name,
            "password": postData.password
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        // update the token in the list
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);
    } else {
        res.status(404).send('Invalid request')
    }
};
