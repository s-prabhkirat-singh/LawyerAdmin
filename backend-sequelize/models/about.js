module.exports = (sequelize, DataTypes) => {
    const About = sequelize.define('About', {
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
      headerbgimage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section1title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section1description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      section1image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section1buttonlabel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section1buttonlink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section1yearsofexperience: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      section2title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      section2description: {
        type: DataTypes.TEXT,
        allowNull: true,
      }
    }, {
      tableName: 'About', // Match the existing MySQL table name
      timestamps: false, // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    // Define associations if necessary
    About.associate = (models) => {
      About.belongsTo(models.Page, {
        foreignKey: 'id',
        targetKey: 'id'
      });
    };
  
    return About;
  };
  