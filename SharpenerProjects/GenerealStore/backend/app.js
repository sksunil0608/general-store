const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const cors = require("cors");
const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

const productRoute = require('./routes/product')

app.use(productRoute)
async function startServer() {
  try {
    const result = await sequelize.sync();
    app.listen(3000);
  } catch (err) {
    console.log(err);
  }
}
startServer();
