const jwt = require('jsonwebtoken');

function verify(req, res, next){
  const token = req.headers["x-access-token"]?.split('Split')[1];
  if(token) {
    jwt.verify(token,'qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm', (err, decode) =>{
      if(err){
        return res.json({ 
          status:"error", 
          message:
            //err ||
            "Some Error Occured"
        });
      }
      req.user={};
      req.user.id = decode.id;
      req.user.username = decode.username;
      next();
    })
  } else {
    res.json({ status:"error" })
  }
}

module.exports = verify;