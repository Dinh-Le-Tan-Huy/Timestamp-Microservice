// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/:date?", (req, res) => {
  let input = req.params.date;

  // Case 1: Empty input → return current time
  if (input === undefined || input === null || input === "") {
    const now = new Date();
    return res.json({ unix: now.valueOf(), utc: now.toUTCString() });
  }

  // Case 2: Pure numeric string → treat as Unix timestamp (milliseconds)
  if (/^-?[0-9]+$/.test(input)) {
    const date = new Date(parseInt(input));
    return res.json({ unix: date.valueOf(), utc: date.toUTCString() });
  }

  // Case 3: Date string → try to parse with new Date()
  const date = new Date(input);
  if (isNaN(date.getTime())) {
    // Case 4: Invalid date
    return res.json({ error: "Invalid Date" });
  }

  return res.json({ unix: date.valueOf(), utc: date.toUTCString() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});