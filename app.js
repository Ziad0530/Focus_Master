const express = require("express");
const bodyParser = require("body-parser");
const http = require("http");
const req = require("request");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signUp.html");
});

// request.setHeader("Content-Type", "application/json");
// request.setHeader("fSessionId", "0809202210513091081");
app.post("/", function (req, res) {
  const name = req.body.Name;
  const code = req.body.Code;

  const data = {
    data: [
      {
        sName: name,
        sCode: code,
        iAccountType: 5,
      },
    ],
  };
  const jsonData = JSON.stringify(data);
  console.log(jsonData);

  const url = "http://localhost/focus8api/Masters/Core__Account";

  const options = {
    method: "POST",
    headers: {
      fSessionId: "08092022138356971081",
      "Content-Type": "application/json",
    },
    url: "http://localhost/focus8api/Masters/Core__Account",
  };

  const request = http.request(url, options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
    // fetch("http://localhost/focus8api/Masters/Core__Account", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     fSessionid: "080920221153367781081",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  });

  request.write(jsonData);
  request.end();
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
