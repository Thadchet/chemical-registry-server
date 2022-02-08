"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const db = {};

let sequelize = new Sequelize(
  "chemical_inventory",
  "bosskung",
  "084210",
  {
    host: "13.214.209.62",
    port: 3306,
    dialect: "mysql",
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//ส่วนนี้เป็นการ import model ของ table ใน database เข้ามาเพื่อตั้งต่า relation นะครับ
db.inventory = require("./inventory")(sequelize, Sequelize);

module.exports = db;
