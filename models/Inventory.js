module.exports = (sequelize, DataTypes) => {
    const Inventory = sequelize.define("Inventory", {
        name:{ type:DataTypes.STRING },
        description:{ type:DataTypes.TEXT },
        price:{ type:DataTypes.FLOAT },
        img:{ type:DataTypes.STRING },
        stock:{ type:DataTypes.INTEGER },
        sold:{ type:DataTypes.INTEGER },
        category:{ type:DataTypes.STRING },
    });
    return Inventory;
}