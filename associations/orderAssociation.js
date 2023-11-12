const { DataTypes } = require('sequelize')
const { Order, Inventory } = require("../models")

Inventory.hasMany(Order, {
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Order.belongsTo(Inventory);

module.exports = { Order, Inventory }