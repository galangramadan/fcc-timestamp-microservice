// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();
const port = 8080;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  try {
    const { date } = req.params;

    const data = new Date(date);

    if (data.getTime()) {
      res.status(200).send({ unix: data.getTime(), utc: data.toUTCString() });
    } else if (Number(date)) {
      const data = new Date(parseInt(date));
      res.status(200).send({ unix: data.getTime(), utc: data.toUTCString() });
    } else {
      throw new Error("Invalid Date");
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// listen for requests :)
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
