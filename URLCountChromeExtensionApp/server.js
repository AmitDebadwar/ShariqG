
var express =require('express');
var app=express();


var mongojs = require('mongojs');
var expressSession = require('express-session');
var expressHbs = require('express3-handlebars');
var mongoUrl = 'mongodb://localhost:27017/urlDb';
var MongoStore = require('connect-mongo')(expressSession);
var mongo = require('mongodb');
var port = 80; // for heroku you would use process.env.PORT instead

var db = mongojs('urlDb', ['urlDb']);
var userDb = mongojs('userDb', ['userDb']);
var bodyParser = require('body-parser');
  

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "node_modules"));
app.use(express.static(__dirname));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.sendFile('index.html',{"root": __dirname});
});

// This creates a new user and calls the callback with
// two arguments: err, if there was an error, and the created user
// if a new user was created.
//
// Possible errors: the passwords are not the same, and a user
// with that username already exists.
function createUser(username, password, password_confirmation, callback) {
    var coll = mongo.collection('users');

    if (password !== password_confirmation) {
        var err = 'The passwords do not match';
        callback(err);
    } else {
        var query = {
            username: username
        };
        var userObject = {
            username: username,
            password: password
        };

        // make sure this username does not exist already
        coll.findOne(query, function(err, user) {
            if (user) {
                err = 'The username you entered already exists';
                callback(err);
            } else {
                // create the new user
                coll.insert(userObject, function(err, user) {
                    callback(err, user);
                });
            }
        });
    }
}

app.post('/signup', function(req, res) {
    // The 3 variables below all come from the form
    // in views/signup.hbs
    var username = req.body.username;
    var password = req.body.password;
    var password_confirmation = req.body.password_confirmation;

    createUser(username, password, password_confirmation, function(err, user) {
        if (err) {
            res.render('signup', {
                error: err
            });
        } else {

            // This way subsequent requests will know the user is logged in.
            req.session.username = user.username;

            res.redirect('/');
        }
    });
});

// This finds a user matching the username and password that
// were given.
function authenticateUser(username, password, callback) {
    var coll = mongo.collection('users');

    coll.findOne({
        username: username,
        password: password
    }, function(err, user) {
        callback(err, user);
    });
}

app.post('/login', function(req, res) {
    // These two variables come from the form on
    // the views/login.hbs page
    var username = req.body.username;
    var password = req.body.password;

    authenticateUser(username, password, function(err, user) {
        if (user) {
            // This way subsequent requests will know the user is logged in.
            req.session.username = user.username;

            res.redirect('/');
        } else {
            res.render('login', {
                badCredentials: true
            });
        }
    });
});

app.use('/public', express.static('public'));

mongo.connect(mongoUrl, function() {
    console.log('Connected to mongo at: ' + mongoUrl);
    app.listen(port, function() {
        console.log('Server is listening on port: ' + port);
    });
})


app.get('/urlHitCount', function(req, res) {
    res.json("conctList");
    var urlName = req.query.urlName;
    console.log("some one hiting server with ", req.url);
    db.urlDb.findOne({
        "url": urlName
    }, {}, function(err, docs) {

        if (docs == null) {
            console.log("No Records found in DB for this url");
            var urlDocument = {
                'url': urlName,
                'count': '1',
                'lastHitTime': new Date()
            }
            console.log("inserting new record with details " + urlDocument);
            db.urlDb.insert(urlDocument);
            console.log("successfully inserted in DB");
        }
        if (docs != null) {

            console.log("Alreday exsist in DB having count = " + docs.count);
            console.log(docs);
            var updatedCount = parseInt(docs.count) + 1;
            // db.urlDb.update(urlDocument);
            db.urlDb.update({
                'url': urlName
            }, {
                $set: {
                    'count': updatedCount,
                    'lastHitTime': new Date()
                }
            })
            console.log("successfully updated  in DB with " + "count =" + updatedCount);
        }

    });
});



app.listen(3000);
 console.log(__dirname);