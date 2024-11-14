import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Template from './Template.js';

const Report = sequelize.define('Report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  data: {
    type: DataTypes.JSON
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  status: {
    type: DataTypes.ENUM('draft', 'completed'),
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

Report.belongsTo(Template);
Report.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });

export default Report;