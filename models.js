const { sequelize } = require("./db");
const {  DataTypes } = require("sequelize");

const Dog = sequelize.define("Dog", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Dog is required',
      }
    },
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Color is required',
      }
    },
  },
  tail_length: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Tail is required',
      },
      isInt: {
        msg: 'Tail must be an integer',
      },
      min: {
        args: 1,
        msg: 'Tail length must be a positive number',
      },
    },
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Weight is required',
      },
      isInt: {
        msg: 'Weight must be an integer',
      },
      min: {
        args: 1,
        msg: 'Weight must be a positive number',
      },
    },
  },
});


module.exports = Dog