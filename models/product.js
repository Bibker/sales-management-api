module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('product',
        {
            title: DataTypes.STRING,
            price: DataTypes.STRING,
            description: DataTypes.STRING,
            category: DataTypes.STRING,
            image: {
                type: DataTypes.STRING,
                defaultValue:'product.png'
            }

        },
        {
            freezeTableName: true,
        });
    return Product;
}