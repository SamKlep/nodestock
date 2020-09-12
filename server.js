const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const app = express();

const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const otherstuff = "This is other stuff";

// Set handlebar routes
app.get("/", function (req, res) {
  res.render("home", {
    stuff: otherstuff,
  });
});

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
