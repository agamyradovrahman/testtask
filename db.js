const {Sequelize} = require("sequelize");


const sequelize = new Sequelize("test", "root", "rahman1205.", {
    host: "localhost",
    dialect: "mysql" 
});


const DB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Succesfylly connected to the db")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {sequelize, DB}