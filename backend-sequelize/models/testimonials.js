module.exports = (sequelize, DataTypes) => {
    const Testimonials = sequelize.define('Testimonials', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      review_text: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: 'Testimonials', // Match the existing MySQL table name
      timestamps: false // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    return Testimonials;
  };
  