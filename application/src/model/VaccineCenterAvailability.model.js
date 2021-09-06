import { DataTypes } from 'Sequelize';
import { CLASS_NAMES } from '../const/globalConstant';


module.exports = (sequelize) => {
  sequelize.define(CLASS_NAMES.VACCINE_CENTER_AVAILABILITY, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    vaccineCenterId: {
      type: DataTypes.STRING,
      references: {
        model: CLASS_NAMES.VACCINE_CENTER,
        key: 'id'
      }
    },
    timseSlotId: {
      type: DataTypes.INTEGER,
      references: {
        model: CLASS_NAMES.TIMESLOT,
        key: 'id'
      }
    },
    date: {
      allowNull: false,
      type: DataTypes.DATE, 
    },
    count: {
      allowNull: false,
      type: DataTypes.INTEGER, 
    }
  }, {
    indexes: [
      {
        unique: true,
        fields: ['vaccineCenterId', 'timseSlotId', 'date']
      }
    ],
    timestamps: false,
    tableName: CLASS_NAMES.VACCINE_CENTER_AVAILABILITY
  });
};
