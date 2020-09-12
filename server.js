// Stock Market Portfolio App
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const request = require("request");

const app = express();

const PORT = process.env.PORT || 5000;

// API KEY pk_145065d7af7646a0961e795aa8d0b395
// Create call_api function
function call_api(finishedAPI) {
  request(
    "https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_145065d7af7646a0961e795aa8d0b395",
    { json: true },
    (err, res, body) => {
      if (err) {
        return console.log(err);
      }

      if (res.statusCode === 200) {
        // console.log(body);
        finishedAPI(body);
      }
    }
  );
}

// Set Handlebars Middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

const otherstuff = "This is other stuff";

// Set handlebar routes
app.get("/", function (req, res) {
  call_api(function (doneAPI) {
    res.render("home", {
      stock: doneAPI,
    });
  });
});

// Create about page routes
app.get("/about", function (req, res) {
  res.render("about", {});
});

// Set Static Folder
app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Server Listening on port ${PORT}`));
