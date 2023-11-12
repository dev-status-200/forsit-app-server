module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        name:{ type:DataTypes.STRING },
        username:{ type:DataTypes.STRING },
        password:{ type:DataTypes.STRING },
        type:{ type:DataTypes.STRING },
    });
    return Users;
}