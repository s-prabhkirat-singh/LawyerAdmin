module.exports = (sequelize, DataTypes) => {
    const Services = sequelize.define('Services', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: true
      },
      slug: {
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
      section1title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      section1description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      section1image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      section1buttonlabel: {
        type: DataTypes.STRING,
        allowNull: true
      },
      section1buttonlink: {
        type: DataTypes.STRING,
        allowNull: true
      },
      section1yearsofexperience: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      section2title: {
        type: DataTypes.STRING,
        allowNull: true
      },
      section2description: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      tableName: 'Services', // Match the existing MySQL table name
      timestamps: false, // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    return Services;
  };
  