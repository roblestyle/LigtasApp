const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const UploadedImage = sequelize.define("UploadedImage", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "users", // Ensure this matches exactly with your Users table name or model name
      key: "id",
    },
  },
});

UploadedImage.belongsTo(User, { foreignKey: "userId" });

module.exports = UploadedImage;
