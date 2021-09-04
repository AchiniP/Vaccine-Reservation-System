import { DataTypes } from 'Sequelize';
import { CLASS_NAMES } from '../const/globalConstant';


module.exports = (sequelize) => {
  sequelize.define(CLASS_NAMES.VACCINE_CENTER, {
    vaccineCenterId: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.STRING
    },
    vaccineCenterName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false,
    tableName: CLASS_NAMES.VACCINE_CENTER
  });
};
