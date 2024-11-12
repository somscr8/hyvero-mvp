import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Template = sequelize.define('Template', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  sections: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'draft'),
    defaultValue: 'draft'
  },
  createdById: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
});

Template.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });

export default Template;