const path = require("path");
const express = require("express");
const bodyparser = require("body-parser");

const port = process.env.PORT || 3000;
const app = express();
const publicPath = path.join(__dirname, "client", "build");
app.use(bodyparser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(publicPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is up!");
});
