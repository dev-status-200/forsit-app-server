const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Op = Sequelize.Op;

exports.login = (req, res) => {
  const { password, username } = req.headers;
  db.Users.findOne({where:{username:username, password:password}})
  .then(data => {
    if(data) {
      const payload = { username:`${data.name}`, loginId:`${data.id}` }
      jwt.sign(payload, 'qwertyuiodoasjrfbheskfhdsxcvboiswueorghbfo3urbn23o9h9hjklzxcvbnm', {expiresIn:"12h"},
      (err, token) => {
        if(err) return res.json({message: err})
        return res.json({
          status:"success",
          token: "BearerSplit"+token
        })
      })
    } else { 
      return res.json({status:"error"}) 
    }
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        //err.message || 
        "Some error occurred while retrieving user."
    });
  });
};

exports.verifyToken = (req, res) => {
  res.json({ status:"success", username:req.body.username })
}