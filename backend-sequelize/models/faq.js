module.exports = (sequelize, DataTypes) => {
    const  Faq= sequelize.define('Faq', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      metatitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      metadescription: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      metatags: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      metaimage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      headertitle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      headerdescription: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      headerbuttonlabel: {
        type: DataTypes.STRING,
        allowNull: true
      },
      headerbuttonlink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      headerbgimage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'faqs', // Match the existing MySQL table name
      timestamps: false // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    return Faq;
  };
  