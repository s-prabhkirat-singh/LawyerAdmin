// models/Home.js
module.exports = (sequelize, DataTypes) => {
    const Home = sequelize.define('Home', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
          model: 'pages', // References the 'pages' table
          key: 'id'
        }
      },
      metatitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      metadescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metatags: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      metaimage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      headertitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      headerdescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      headerbuttonlabel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      headerbuttonlink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      headerbgimage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bottomsectiontitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bottomsectiondescription: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bottomsectionimage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      tableName: 'Home', // Match the existing MySQL table name
      timestamps: false, // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    // Define associations if necessary
    Home.associate = (models) => {
      Home.belongsTo(models.Page, {
        foreignKey: 'id',
        targetKey: 'id'
      });
    };
  
    return Home;
  };
  