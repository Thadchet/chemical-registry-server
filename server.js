const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");
const Op = db.Sequelize.Op;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// enable cors
app.use(cors());
app.options("*", cors());

// database connection
db.sequelize
  .authenticate()
  .then(function (err) {
    console.log("Connection database has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Ahoy!" });
});

app.get("/test/api", (req, res) => {
  res.json({ message: "Test Api!" });
});

app.get("/test/api/inventory/latest", async (req, res) => {
  result = await db.inventory.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  });
  res.json({ message: result });
});

app.post("/test/api/add/inventory", async (req, res) => {
  const data = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  result = await db.inventory.create(data);
  return res.json({ message: result });
});

app.get("/test/api/inventory", async (req, res) => {
  const query = req.query;
  const search = query.search || "";
  if (search !== "") {
    result = await db.inventory.findAll({
      where: {
        [Op.or]: [
          { owner: { [Op.like]: `%${search}%` } },
          { chemical_name: { [Op.like]: `%${search}%` } },
          { code: { [Op.like]: `%${search}%` } },
          { un_no: { [Op.like]: `%${search}%` } },
          { cus_no: { [Op.like]: `%${search}%` } },
          { un_class: { [Op.like]: `%${search}%` } },
          { state: { [Op.like]: `%${search}%` } },
          { packing_size: { [Op.like]: `%${search}%` } },
          { packing_unit: { [Op.like]: `%${search}%` } },
          { storage: { [Op.like]: `%${search}%` } },
        ],
      },
    });
    return res.json({ message: result });
  } else {
    result = await db.inventory.findAll({});
    return res.json({ message: result });
  }
});

app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
