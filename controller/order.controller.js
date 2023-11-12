const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const db = require("../models");
const { Order } = require("../associations/orderAssociation");
const Op = Sequelize.Op;
const moment = require("moment");

exports.create = async(req, res) => {
  let data = req.body;
  const item = await db.Inventory.findOne({where:{id:req.body.InventoryId}, attributes:['price', 'stock']});
  await db.Inventory.update({stock:parseInt(item.stock)-data.qty},{where:{id:req.body.InventoryId}});
  const check = await Order.findOne({
    order:[['orderNo','DESC']], attributes:["orderNo"],
  });
  Order.upsert({
    ...data,
    price:data.qty*parseFloat(item.price),
    orderNo:check!==null?parseInt(check.orderNo)+1:1, 
    orderId:`OR-${check!==null?parseInt(check.orderNo)+1:1}/${moment().format("YY")}`
  }).then((x) => {
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

exports.sold = (req, res) => {
  Order.update({sold:'1'},{
    where:{id:req.headers.id}
  }).then((x) => {
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

exports.getTotal = (req, res) => {
  Order.findAll({attributes:['qty', 'price', 'sold']})
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

exports.getAllOrders = (req, res) => {
  Order.findAll({
    raw:true,
    include:[{
      model:db.Inventory
    }]
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