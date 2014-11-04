var mysql = require('mysql');
var crypto = require('crypto');
var model;
var functions = require('../functions');
var randomString = functions.randomString;


function getSysOptions(req, res){
  model.getSysOptions(req.params.cat, function(err, data){
    if(err){
      res.writeHead(500);
      res.end(err);
    } else {
      res.send(data);
    }
  });
}


module.exports = function (app) {
  model = require('../models/options')(app.connectionPool);
  return {
    get: {
      getSysOptions: getSysOptions

    },
    post: {

    }
  };
};