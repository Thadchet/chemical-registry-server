const express = require("express");
const app = express();
const db = require("./models");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.get("/inventory/latest", async (req, res) => {
  result = await db.inventory.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  });
  res.json({ message: result });
});

app.post("/add/inventory", async (req, res) => {
  const data = {
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  result = await db.inventory.create(data);
  return res.json({ message: result });
});

app.get("/inventory", async (req, res) => {
  const query = req.query;
  const search = query.search || "";
  if (search !== "") {
    result = await db.inventory.findAll({
      where: {
        owner: search,
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
