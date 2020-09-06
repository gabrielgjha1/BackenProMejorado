const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_ID);
const googleVerify =  async (token)=> {
    console.log(process.env.GOOGLE_ID)
    console.log(process.env.GOOGLE_SECRET)
    console.log(token)
  const ticket = await client.verifyIdToken({
      idToken:token,
      audience:process.env.GOOGLE_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  
  const payload = ticket.getPayload();
  const userid = payload['sub'];
  const {name,email,picture}= payload;
  return {nombre:name,email,img:picture};
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}

module.exports = {
    googleVerify
}