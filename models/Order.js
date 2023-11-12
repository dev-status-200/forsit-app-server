module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
        orderNo:{ type:DataTypes.INTEGER },
        orderId:{ type:DataTypes.STRING },
        qty:{ type:DataTypes.INTEGER },
        price:{ type:DataTypes.FLOAT },
        sold:{ 
            type:DataTypes.INTEGER,
            defaultValue: "0",
        },
    });
    return Order;
}