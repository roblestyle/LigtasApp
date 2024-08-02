const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ligtas", "root", "", {
  dialect: "mysql",
  host: "localhost", // Update with your database host
  timezone: "+08:00", // Adjust this based on your database server's timezone
});

module.exports = sequelize;

// const sequelize = new Sequelize('parapoia_shop_ims', 'parapoia_shop_ims', 'Shopims1123!', {
//   dialect: 'mysql',
//   host: 'localhost', // Update with your database host
//   timezone: '+08:00', // Adjust this based on your database server's timezone
// });

// module.exports = sequelize;
