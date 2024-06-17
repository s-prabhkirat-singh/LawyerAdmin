// models/Page.js
module.exports = (sequelize, DataTypes) => {
    const Page = sequelize.define('Page', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      sequence: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    }, {
      tableName: 'pages', // Match the existing MySQL table name
      timestamps: false, // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    return Page;
  };
  