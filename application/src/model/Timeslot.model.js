import { DataTypes } from 'Sequelize';
import { CLASS_NAMES } from '../const/globalConstant';


module.exports = (sequelize) => {
  sequelize.define(CLASS_NAMES.TIMESLOT, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: CLASS_NAMES.TIMESLOT
  });
};
