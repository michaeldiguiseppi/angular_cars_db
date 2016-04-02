var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var request = require('request');

router.get('/years', function(req, res) {
  var options = { method: 'GET',
    url: 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/year'};

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    var yearArray = [];
    var xml = body;
    parseString(xml, function (err, result) {
      result.menuItems.menuItem.forEach(function(year) {
        yearArray.push(year.text[0]);
      });
      return yearArray;
    });
    res.json({ years: yearArray });
  });
});

router.get('/years/:year', function(req, res) {
  var year = req.params.year;
  console.log(year);
  var options = { method: 'GET',
    url: 'http://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year='+year};

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    var makeArray = [];
    var xml = body;
    parseString(xml, function (err, result) {
      console.log(result);
      result.menuItems.menuItem.forEach(function(make) {
        makeArray.push(make.text[0]);
      });
      return makeArray;
    });
    res.json({ makes: makeArray });
  });
});

module.exports = router;
