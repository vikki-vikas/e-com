'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.Location.hasMany(
  db.Store,{
    foreignKey:"location_id"
  }
)

db.Store.belongsTo(db.Location,{
  foreignKey:"location_id"
})

db.Category.hasMany(
  db.Products,{
    foreignKey:'category_id'
  }
)

db.Products.belongsTo(
  db.Category,{
    foreignKey:'category_id'
  }
)

// -----------------------

db.SalesPerson.hasMany(
  db.Store,{
    foreignKey:"sales_person_id"
  }
)


db.Store.belongsTo(db.SalesPerson,{
  foreignKey:"sales_person_id"
})


// ----------------------

db.Store.hasMany(
  db.Orders,{
    foreignKey:"store_id"
  }
)

db.Orders.belongsTo(db.Store,{
  foreignKey:"store_id"
})


db.Products.hasMany(
  db.Orders,{
    foreignKey:"product_id"
  }
)

db.Orders.belongsTo(db.Products,{
  foreignKey:"product_id"
})

db.SalesPerson.hasMany(
  db.Orders,{
    foreignKey:"sales_person_id"
  }
)

db.Orders.belongsTo(db.SalesPerson,{
  foreignKey:"sales_person_id"
})


db.User.hasMany(
  db.Orders,{
    foreignKey:"manager_id"
  }
)

db.Orders.belongsTo(db.User,{
  foreignKey:"manager_id"
})


db.Category.hasMany(
  db.Orders,{
    foreignKey:"category_id"
  }
)

db.Orders.belongsTo(db.Category,{
  foreignKey:"category_id"
})

db.Location.hasMany(
  db.Orders,{
    foreignKey:"location_id"
  }
)

db.Orders.belongsTo(db.Location,{
  foreignKey:"location_id"
})

module.exports = db;
