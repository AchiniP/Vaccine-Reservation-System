import { DataTypes } from 'Sequelize';
import { CLASS_NAMES } from '../const/globalConstant';


module.exports = (sequelize) => {
  sequelize.define(CLASS_NAMES.USER_VACCINE_STATUS, {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      primaryKey: true,
    },   
    nic: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    vaccineSlotId: {
      type: DataTypes.INTEGER,
      references: {
        model: CLASS_NAMES.VACCINE_CENTER_AVAILABILITY,
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED'),
    },
    selectedDate: {
      type: DataTypes.DATE
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['nic']
      }
    ],
    timestamps: false,
    tableName: CLASS_NAMES.USER_VACCINE_STATUS
  });
};
