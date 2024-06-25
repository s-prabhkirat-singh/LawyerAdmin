module.exports = (sequelize, DataTypes) => {
    const FaqQuestionAnswers = sequelize.define('FaqQuestionAnswers', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      faq_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'faqs', // References the 'faq' table
          key: 'id'
        }
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      tableName: 'faq_question_answers', // Match the existing MySQL table name
      timestamps: false // Disable timestamps if the table doesn't have createdAt and updatedAt columns
    });
  
    return FaqQuestionAnswers;
  };
  