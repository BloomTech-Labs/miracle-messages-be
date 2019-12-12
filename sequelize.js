import Sequelize from "sequelize";
import UserModel from "./models/user";

const sequelize = new Sequelize("database", "email", "password", {
  // gimme postgres, please!
  dialect: "postgres"
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log("Users db and user table have been created");
});

module.exports = User;
