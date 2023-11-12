const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require("../models");
const Op = Sequelize.Op;
const { Order } = require("../associations/orderAssociation");
const moment = require('moment');

exports.create = (req, res) => {
  db.Inventory.upsert(req.body)
  .then((x) => {
    res.json({status:"success", result:x})
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        //err.message || 
        "Some error occurred while retrieving data."
    });
  });
};

exports.getItem = (req, res) => {
  db.Inventory.findOne({where:{id:req.headers.id}})
  .then((x) => {
    res.json({status:"success", result:x})
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        //err.message || 
        "Some error occurred while retrieving data."
    });
  });
};

exports.getAllItems = (req, res) => {
  db.Inventory.findAll()
  .then((x) => {
    res.json({status:"success", result:x})
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        err.message || 
        "Some error occurred while retrieving data."
    });
  });
};

exports.getRevenue = (req, res) => {
  let obj = {
    createdAt: {
      [Op.gte]: moment().subtract(req.headers.option=='A'?6:req.headers.option=="B"?29:365,'days').toDate(),
      [Op.lte]: moment().add(1, "days").toDate(),
    },
  }
  if(req.headers.type && req.headers.type=="Sales"){
    obj = {...obj, sold:"1"}
  }
  Order.findAll({
    attributes:['id', 'price', 'qty', 'createdAt'],
    where:obj,
    include:[{
      model:db.Inventory,
      attributes:['id', 'name'],
    }],
    order: [["createdAt", "ASC"]],
  })
  .then((x) => {
    res.json({status:"success", result:x})
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        //err.message || 
        "Some error occurred while retrieving data."
    });
  });
};

exports.getAllItemsNames = (req, res) => {
  db.Inventory.findAll({attributes:['id', 'category']})
  .then((x) => {
    res.json({status:"success", result:x})
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        //err.message || 
        "Some error occurred while retrieving data."
    });
  });
};

exports.getComparison = (req, res) => {
  console.log(req.headers.option)
  console.log([req.headers.one, req.headers.two])
  Order.findAll({
    attributes:['id', 'price', 'qty', 'createdAt', 'InventoryId'],
    where:{
      sold:'1',
      createdAt: {
        [Op.gte]: moment().subtract(req.headers.option=='A'?6:req.headers.option=="B"?29:365,'days').toDate(),
        [Op.lte]: moment().add(1, "days").toDate(),
      },
    },
    include:[{
      model:db.Inventory,
      attributes:['name', 'category'],
      where:{category:[req.headers.one, req.headers.two],}
    }],
    order: [["createdAt", "ASC"]],
  })
  .then((x) => {
    res.json({status:"success", result:x})
  }).catch(err => {
    res.status(500).json({
      status:"error",
      message:
        err.message || 
        "Some error occurred while retrieving data."
    });
  });
};
