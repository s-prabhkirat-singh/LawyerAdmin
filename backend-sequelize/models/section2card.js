module.exports = (sequelize, DataTypes) => {
    const AboutUsSectiontwoCards = sequelize.define('AboutUsSectiontwoCards', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      about_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'About', // References the 'About' table
          key: 'id'
        }
      },
      count: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      icon: {
        type: DataTypes.STRING,
        allowNull: true
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      tableName: 'AboutUsSectiontwoCards', // Match the existing MySQL table name
      timestamps: false, // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    // Define associations if necessary
    AboutUsSectiontwoCards.associate = (models) => {
      AboutUsSectiontwoCards.belongsTo(models.About, {
        foreignKey: 'about_id',
        targetKey: 'id'
      });
    };
  
    return AboutUsSectiontwoCards;
  };
  