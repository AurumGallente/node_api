var connect_params = require('./connect');
var express = require('express'),
        app = express(),
        mysql = require('mysql'),
        connectionpool = mysql.createPool(connect_params.connection);
//---------------------------------------------------------------------
//Friends
//var handleRequest = function(req, res) {
//    try {
//      res.writeHead(200);
//
//    } catch(e) {
//      res.writeHead(200);
//      res.end('Boo');
//    }
//};
app.get('/profiles/:id/friends', function(req, res) {
    try {
    connectionpool.getConnection(function(err, connection) { 
        connection.query('SELECT friends.* FROM Profiles as friends INNER JOIN sys_friend_list as sys ON sys.Profile = friends.id INNER JOIN Profiles as p ON sys.id = p.id WHERE p.id = '+req.params.id, req.params.id, function(err, rows, fields) {
            res.send({
                result: 'success',
                err: '',
                //fields: fields,
                json: rows
                //length: rows.length
            });
            connection.release();
        });
    });
    } catch(e) {
        res.writeHead(err);
    }    
});
//CONCAT('SELECT ', (SELECT REPLACE(GROUP_CONCAT(COLUMN_NAME), 'id,', '') FROM  INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'products' AND TABLE_SCHEMA = 'doplacu'), ' FROM     products');
//
//
//
//
//
//
//SELECT * FROM Profiles as friends LEFT JOIN sys_friend_list as sys ON sys.Profile = friends.ID LEFT JOIN Profiles as p ON sys.id = p.id WHERE p.id = 1 AND sys.check = 1
        
//app.get('/:table', function(req, res) {
//    connectionpool.getConnection(function(err, connection) {
//        if (err) {
//            console.error('CONNECTION error: ', err);
//            res.statusCode = 503;
//            res.send({
//                result: 'error',
//                err: err.code
//            });
//        } else {
//            connection.query('SELECT * FROM ' + req.params.table + ' ', req.params.id, function(err, rows, fields) {
//                if (err) {
//                    console.error(err);
//                    res.statusCode = 500;
//                    res.send({
//                        result: 'error',
//                        err: err.code
//                    });
//                }
//                res.send({
//                    result: 'success',
//                    err: '',
//                    //fields: fields,
//                    json: rows,
//                    length: rows.length
//                });
//                connection.release();
//            });
//        }
//    });
//});
//app.get('/:table/:id', function(req, res) {
//    connectionpool.getConnection(function(err, connection) {
//        if (err) {
//            console.error('CONNECTION error: ', err);
//            res.statusCode = 503;
//            res.send({
//                result: 'error',
//                err: err.code
//            });
//        } else {
//            connection.query('SELECT * FROM ' + req.params.table + ' WHERE id ='+req.params.id, req.params.id, function(err, rows, fields) {
//                if (err) {
//                    console.error(err);
//                    res.statusCode = 500;
//                    res.send({
//                        result: 'error',
//                        err: err.code
//                    });
//                }
//                res.send({
//                    result: 'success',
//                    err: '',
//                    //fields: fields,
//                    json: rows,
//                    //length: rows.length
//                });
//                connection.release();
//            });
//        }
//    });
//});
app.post('/:table', function(req, res) {
    
});
app.put('/:table/:id', function(req, res) {
});
app.delete('/:table/:id', function(req, res) {
});

//------------------------------------------------------------------------------
// Profiles
app.get('/:profiles', function(req, res) {
    connectionpool.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ', err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err: err.code
            });
        } else {
            connection.query('SELECT * FROM Profiles', req.params.id, function(err, rows, fields) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err: err.code
                    });
                }
                res.send({
                    result: 'success',
                    err: '',
                    //fields: fields,
                    json: rows,
                    //length: rows.length
                });
                connection.release();
            });
        }
    });
});


app.listen(3001);
console.log('Rest Demo Listening on port 3001');