const express = require("express");
import("node-fetch");
const dotenv = require("dotenv");
const app = express();
const { engine } = require("express-handlebars");
app.engine("handlebars", engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
dotenv.config({ path: "./config/.env" });
const bodyParser = require("body-parser");
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/searchProducts", (req, res) => {
  res.render("searchProducts");
});
app.post("/searchProducts", (req, res) => {
  let search = req.body.productName;
  const url1 = `https://api.spoonacular.com/food/products/search?query=${search}&apiKey=${process.env.MYAPI}`;
  fetch(url1)
    .then((response) => response.json())
    .then((data) => {
      const myItem = data;
      res.render("item", { myItem: myItem });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
});

app.get("/searchRecipies", (req, res) => {
  res.render("searchRecipie");
});
app.post("/searchRecipies", (req, res) => {
  let search = req.body.productName;
  const url1 = `https://api.spoonacular.com/recipes/complexSearch?query=${search}&apiKey=${process.env.MYAPI}`;
  let page = 1;

  fetch(
    `${url1}&offset=${page}&addRecipeInformation=true&number=20&addRecipeNutrition=true&instructionsRequired=true`
  )
    .then((response) => response.json())
    .then((data) => {
      const myItem = data;
      console.log(myItem);

      res.render("recipies", { myItem: myItem });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error");
    });
});

app.get("/text", (req, res) => {
  res.render("text");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
