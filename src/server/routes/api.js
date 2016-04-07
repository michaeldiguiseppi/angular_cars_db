var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;
var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');


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
    url: 'http://www.edmunds.com/'+make+'/'+model+'/'+year+'/coupe/pictures'
  };
  console.log(options.url);
  // https://media.ed.edmunds-media.com photo prefix
  request(options, function(error, response, html) {
    if (!error) {
      var imgArray = [];
      var $ = cheerio.load(html);
      $('img').each(function() {
        var data = $(this);
        imgArray.push(data['0'].attribs.src);
        return imgArray;
      });

      var image;

      if (imgArray.length > 2 && imgArray[1] !== undefined) {
          image = imgArray[1].replace('150.jpg', '500.jpg');
      }
      res.send(image || '');
    }
  });
});

router.get('/scrape', function(req, res) {
  url = 'http://www.moutons.org/sccasolo/Lists/2011/stockm.html';
  request(url, function(error, response, html) {
    if (!error) {
      var $ = cheerio.load(html);
      var makeArray = [];
      $('th a').each(function() {
        var data = $(this);
        makeArray.push(data['0'].attribs.name);

      });
      var classArray = [];
      $('td').each(function() {
        var data = $(this);
        if (data['0'].attribs.bgcolor) {
          var className = data['0'].children[0].data;
          if (classArray.indexOf(className) === -1 && className !== undefined) {
            classArray.push(className);
          }
          return classArray;
        }
      });
      res.send(classArray);
    }
  });
});



module.exports = router;
