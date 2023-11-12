const Sequelize = require('sequelize');
const db = require("../models");
const Op = Sequelize.Op;

exports.createDoctor = (req, res) => {
  const { password, username } = req.headers;
  db.Users.findOne({where:{username:username, password:password}})
  .then(data => {

  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        //err.message || 
        "Some error occurred while retrieving user."
    });
  });
};