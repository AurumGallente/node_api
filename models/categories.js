var connectionPool;
var mysql = require('mysql');
var crypto = require('crypto');
var functions = require('../functions');
var async = require('async');


function category(cb) {
  try {
    connectionPool.getConnection(function(err, connection){
      connection.query('SELECT * FROM  `sys_categories`', function (err, rows, fields){
                process.nextTick(function () {
                    cb(null, rows);
                });
        connection.release();
      });
    });
  }
  catch (e) {
    cb(null, e);
  }
}

function categoryByModule(type, cb){
  try{
  connectionPool.getConnection(function(err, connection){
    connection.query('SELECT * FROM `sys_categories` WHERE `Type` = ' + mysql.escape(type), function(err, rows, fields){
      process.nextTick(function(){
        cb(null, rows);
      });
      connection.release();
    });
  });
  } catch(e) {
      cb(null, e);
  }
}

module.exports = function (_connectionPool) {
    connectionPool = _connectionPool;
    return {
        category: category,
        catByModule: categoryByModule
    };
};
