module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        'product',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING
            },
            price: {
                type: DataTypes.DOUBLE
            },
            imageUrl: {
                type: DataTypes.STRING
            }
        },
        { underscored: true }
    );
};