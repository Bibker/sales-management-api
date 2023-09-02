module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('order',
        {
            placed_by:
            {
                type: DataTypes.INTEGER,
                references: {
                    model: 'user', 
                    key: 'id', 
                },

            },
            products: DataTypes.STRING,
            total_amount: DataTypes.FLOAT,
        },
        {
            freezeTableName: true,
        });

    Order.associate = (models) => {
        Order.belongsTo(models.user, { foreignKey: 'placed_by', as: 'user' });
    };

    return Order;
}