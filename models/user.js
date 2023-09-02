module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user',
        {
            fullname: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            freezeTableName: true,
        });
    return User;
}