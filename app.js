var express = require('express')
        , mysql = require('mysql')
        , mongoose = require('mongoose')
        , cookieParser = parseCookie = require('cookie-parser')
        , bodyParser = require('body-parser')
        , swagger = require('swagger-express')
        , path = require('path')
        , expressSession = require('express-session')
        , mongo = require('mongoose')
        , config = require('./config');
var connect = require('connect');
var uuid = require('node-uuid');
var app = express();
var server = require('http').createServer(app),
        boonex_modules = [];

exports.app = app;
exports.boonex_modules = boonex_modules;

app.use(cookieParser(config.session.secret));
var MongoStore = require('connect-mongo')(expressSession);
var store = new MongoStore(config.mongo.development);
app.use(cookieParser());
app.use(expressSession({
    secret: config.session.secret,
    maxAge: config.session.maxAge,
    store: store,
    cookie: {httpOnly: false}
}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
    res.header("Access-Control-Max-Age", "1000");
    res.header("Access-Control-Allow-Headers", "x-requested-with, Content-Type, origin, authorization, accept, client-security-token");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies
app.use(swagger.init(app, config.swagger));


app.use(express.static(path.join(__dirname, 'public')));
connectionpool = mysql.createPool(config.mysql.development);
connectionpool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM `sys_modules`", null, function (err, rows) {
        for (i = 0; i < rows.length; ++i) {
            boonex_modules[rows[i].title] = rows[i].title;
        }
        // now it's ready to create routes
        //DEBUG[[---------------------------------------------------
        console.log('boonex modules:', boonex_modules)
        process.boonex_modules = boonex_modules;
        app.connectionPool = connectionpool;

        //DEBUG]]---------------------------------------------------

        //require('./routes/test')(app);
        var menuRoutes = require('./routes/menus')(app);
        var profilesRoutes = require('./routes/profiles')(app);
        var predefinedRoutes = require('./routes/predefined')(app);
        var categoryRoutes = require('./routes/categories')(app);
        var optionsRoutes = require('./routes/options')(app);
        app.get('/', function (req, res) {
            res.send(200, req.session);
            req.session.save();
            //console.log(req.session);
        });
        app.get('/', function (req, res) {
            req.session.mytest = true;
            req.session.save();
            res.send(200, 1);
        });
        app.get('/profile/:id', profilesRoutes.get.profileById);
        app.get('/profile/:id/friends', profilesRoutes.get.profileFriends);
        app.get('/profiles/:page/:perpage', profilesRoutes.get.profilesPerPage);
        app.get('/profileJoinBlock', profilesRoutes.get.profileJoinBlock);
        app.get('/profileEditOwnBlock', profilesRoutes.get.profileEditOwnBlock);
        app.get('/topmenu', menuRoutes.get.getTopMenu);
        app.get('/servicemenu', menuRoutes.get.getServiceMenu);
        app.get('/bottommenu', menuRoutes.get.getBottomMenu);
        app.get('/menumember', menuRoutes.get.getMenuMember);
        app.get('/predefined', predefinedRoutes.get.getPredefined);
        app.get('/profilefields', profilesRoutes.get.profileFields);
        app.get('/syscategories', categoryRoutes.get.categories);
        app.get('/categoryByModule/:type', categoryRoutes.get.categoryByModule);
        app.get('/sysoptions/:cat', optionsRoutes.get.getSysOptions);
        app.post('/register', profilesRoutes.post.profileRegister);
        app.post('/auth', profilesRoutes.post.profileAuth);
    });
});

// TODO: write and use function config.mongoURI
var dbUrl = 'mongodb://';
//dbUrl += conf.db.username + ':' + conf.db.password + '@';
dbUrl += config.mongo.development.host + ':' + config.mongo.development.port;
dbUrl += '/' + config.mongo.development.db;
console.log(dbUrl);
mongo.connect(dbUrl);
mongo.connection.on('open', function () {
    console.log('connected to mongo');
    server.listen(3000);
});
function getCookie(arr, name) {
  var value = "; " + arr;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}
var io = require('socket.io').listen(server);

    io.set('authorization', function (handshake, callback) {
        console.log(handshake.headers.cookie);
        if (handshake.headers.cookie) {            
            // pass a req, res, and next as if it were middleware
            cookieParser(handshake, null, function (err) {
                consoloe.log(handshake.cookies['connect.sid']);
                handshake.sessionID = handshake.signedCookies['connect.sid'];
                //console.log(handshake.sessionID);
                // or if you don't have signed cookies
                handshake.sessionID = handshake.cookies['connect.sid'];
                //console.log(handshake.sessionID);
                store.get(handshake.sessionID, function (err, session) {
                    if (err || !session) {
                        // if we cannot grab a session, turn down the connection
                        callback('Session not found.', false);
                    } else {
                        // save the session data and accept the connection
                        handshake.session = session;
                        callback(null, true);
                    }
                });
            });
        } else {            
            return callback('No session.', false);
        }
        callback(null, true);
    });


io.sockets.on('connection', function (socket) {
    var cookie_string = socket.request.headers.cookie;
    //console.log(cookie_string);
    socket.on('message', function (text) {
        io.emit('message', text);
        var session = socket.handshake;
        //console.log(session);
    });
    socket.on('was connected', function (text) {
        //console.log(socket.id);
    });
});
io.sockets.on('connection', function (socket) {

    // a value
});

//app.listen(3000);