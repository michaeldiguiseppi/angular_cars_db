var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var request = require('request');
var cheerio = require('cheerio');


router.get('/', function(req, res, next) {
  res.render('index.html');
});

router.get('/makes', function(req, res, next) {
  var options = { method: 'GET',
    url: 'https://api.edmunds.com/api/vehicle/v2/makes',
    qs: { state: 'used', view: 'full', fmt: 'json', api_key: process.env.API_KEY },
  };


  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

router.get('/models/:make', function(req, res, next) {
  var make = req.params.make;
  var options = { method: 'GET',
    url: 'https://api.edmunds.com/api/vehicle/v2/'+make+'/models',
    qs: { state: 'used', view: 'full', fmt: 'json', api_key: process.env.API_KEY },
    };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

router.get('/years/:make/:model', function(req, res, next) {
  var make = req.params.make;
  var model = req.params.model;
  var options = { method: 'GET',
    url: 'https://api.edmunds.com/api/vehicle/v2/'+make+'/'+model+'/years',
    qs: { state: 'used', view: 'full', fmt: 'json', api_key: process.env.API_KEY },
    };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

router.get('/options/:make/:model/:year', function(req, res, next) {
  var make = req.params.make;
  var model = req.params.model;
  var year = req.params.year;
  var options = { method: 'GET',
    url: 'https://api.edmunds.com/api/vehicle/v2/'+make+'/'+model+'/'+year+'/styles',
    qs: { state: 'used', view: 'full', fmt: 'json', api_key: process.env.API_KEY },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);

    res.send(body);
  });
});

router.get('/photos/:make/:model/:year', function(req, res, next) {
  var make = req.params.make;
  var model = req.params.model;
  var year = req.params.year;
  console.log('Make: ', make, 'Model: ', model, 'Year: ', year);
  var options = { method: 'GET',
    url: 'http://www.edmunds.com/bmw/2-series/2016/?sub=m235i&src=1459718761499'
  };
  console.log(options.url);
  request(options, function(error, response, html) {
    var $ = cheerio.load(html);
    var a;
    $('li.current').each(function(i, element){
      a = $(this).child();
      console.log(a);
      return a;
    });
    res.send(a);
  });
});





module.exports = router;
