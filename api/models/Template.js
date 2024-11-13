import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Template = sequelize.define('Template', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['associated-entities', 'reporting-entity', 'risk-assessment', 'contracts-master', 'intra-group', 'ict-supply-chains', 'ict-risk-assessment', 'vendor-master']]
    }
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('draft', 'active', 'archived'),
    defaultValue: 'active'
  },
  createdById: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  updatedAt: DataTypes.DATE,
  createdAt: DataTypes.DATE
});

Template.belongsTo(User, { as: 'createdBy', foreignKey: 'createdById' });

export default Template;