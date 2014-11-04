//function test(req, res) {
//  console.log('test route');
//  res.send('test route');
//}
//
//module.exports = function (app) {
//
//  app.get('/events/:perpage/:page', function (req, res) {
//    try {
//      connectionpool.getConnection(function (err, connection) {
//        connection.query('SELECT e.*, p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id GROUP BY e.id LIMIT ' + req.params.perpage * req.params.page + ', ' + req.params.page, req.params.id, function (err, rows, fields) {
//          res.send({
//            result: 'success',
//            err: '',
//            //fields: fields,
//            json: rows
//            //length: rows.length
//          });
//          connection.release();
//        });
//      });
//    } catch (e) {
//      res.writeHead(err);
//    }
//  });
////events/:id
//  app.get('/event/:id', function (req, res) {
//    try {
//      connectionpool.getConnection(function (err, connection) {
//        connection.query('SELECT e. * , p.id AS user_id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM bx_events_main AS e LEFT JOIN Profiles AS p ON e.responsibleid = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id LEFT JOIN bx_events_images ON e.id = bx_events_images.entry_id LEFT JOIN bx_photos_main AS images ON bx_events_images.media_id WHERE e.id=' + req.params.id + ' GROUP BY e.id', req.params.id, function (err, rows, fields) {
//          res.send({
//            result: 'success',
//            err: '',
//            //fields: fields,
//            json: rows
//            //length: rows.length
//          });
//          connection.release();
//        });
//      });
//    } catch (e) {
//      res.writeHead(err);
//    }
//  });
////event's posts
//  app.get('/event/:id/posts/:perpage/:page', function (req, res) {
//    try {
//      connectionpool.getConnection(function (err, connection) {
//        connection.query('SELECT cmt.*, p.id, p.FirstName, p.LastName, p.NickName, avatar.hash, avatar.ext FROM `bx_events_cmts` as cmt LEFT JOIN Profiles as p ON cmt.cmt_author_id  = p.id LEFT JOIN bx_avatar_images ON bx_avatar_images.author_id = p.id LEFT JOIN bx_photos_main AS avatar ON bx_avatar_images.id = avatar.id  WHERE `cmt_object_id` = ' + req.params.id + ' LIMIT ' + req.params.perpage * req.params.page + ', ' + req.params.page, req.params.id, function (err, rows, fields) {
//          res.send({
//            result: 'success',
//            err: '',
//            //fields: fields,
//            json: rows
//            //length: rows.length
//          });
//          connection.release();
//        });
//      });
//    } catch (e) {
//      res.writeHead(err);
//    }
//  });
//  app.get('/categories', function () {
//    try {
//      connectionpool.getConnection(function (err, connection) {
//        connection.query('SELECT * FROM  sys_categories', null, function (err, rows, fields) {
//
//        });
//      });
//    } catch (e) {
//
//    }
//  });
//};
//
//// some routes
//
