// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (req, res) {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  })
})

// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  var timestamp = Date.parse(req.params.date);
  
  if (isNaN(timestamp) == false) {
    var d = new Date(timestamp).getTime();
    var d2 = new  Date(timestamp).toUTCString()

    console.log(typeof d)
    console.log(typeof d2)

    res.json({
      "unix": d,
      "utc": d2
    })
  } else if (/^\d+$/.test(req.params.date)) {
    let d2 = new Date(parseInt(req.params.date)).toUTCString()
    
    res.json({
      unix: parseInt(req.params.date),
      utc: d2
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
