require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , cors = require('cors')
    , bodyParser = require('body-parser')

//  CONTROLLERS
const usersCtrl = require('./controllers/user_controller')
    , frndCtrl = require('./controllers/friend_controller')
    , recCtlr = require('./controllers/recommend_controller')

//  INFO NEEDED
const {
    SERVER_PORT,
    SESSION_SECRET,
    CONNECTION_STRING,
    AUTH_DOMAIN,
    AUTH_CLIENT_ID,
    AUTH_CLIENT_SECRET,
    AUTH_CALLBACK,
    AUTH_SUCCESS_REDIRECT,
    AUTH_LOGOUT_REDIRECT,
    PICTURE
} = process.env;

//  SERVER SETUP
const app = express();
app.use(bodyParser.json());

//SESSION CONFIG
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

//  PASSPORT / PASSPORT USING SESSION
app.use(passport.initialize());
app.use(passport.session());

//  MASSIVE
massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log(`Matches downloading from database.`);
});

//  Auth0Strategy
passport.use(new Auth0Strategy({
    domain: AUTH_DOMAIN,
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    callbackURL: AUTH_CALLBACK,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db');

    const { user_id, name } = profile._json;
    db.find_user([user_id]).then(resp => {
        if (resp[0]) {
            done(null, resp[0].id);
        } else {
            db.create_user([name, PICTURE, user_id]).then(resp => {
                done(null, resp[0].id);
            }).catch(err => console.log(err));
        }
    }).catch(err => console.log(err));
}));

//  SERIALIZE-USER
passport.serializeUser((id, done) => {
    done(null, id);
});

//  DE-SERIALIZE-USER
passport.deserializeUser((id, done) => {
    const db = app.get('db');
    db.find_logged_in_user([id]).then(resp => {
        done(null, resp[0]);
    }).catch(err => console.log(err));
});

//  AUTH ENDPOINTS
app.get(`/auth`, passport.authenticate('auth0'));
app.get(`/auth/callback`, passport.authenticate('auth0', {
    successRedirect: AUTH_SUCCESS_REDIRECT,
    failureRedirect: AUTH_LOGOUT_REDIRECT
}));
app.get(`/auth/authenticated`, (req, res) => {
    if (!req.user) {
        res.status(403).send('Not logged in.');
    }
    else {
        res.status(200).send(req.user);
    }
});
app.get(`/logout`, (req, res) => {
    req.logOut();
    res.status(200).redirect(AUTH_LOGOUT_REDIRECT);
});

//  FRIEND ENDPOINTS
app.get(`/api/friend/list`, frndCtrl.getFriends);
app.post(`/api/friend/add`, frndCtrl.addFriend);
app.post(`/api/friend/remove`, frndCtrl.removeFriend);

//  USER ENDPOINTS
app.patch(`/api/user/patch/:id`, usersCtrl.updateUser)
app.get(`/api/user/list`, usersCtrl.getUsers)
app.get(`/api/user/search`, usersCtrl.searchUsers)

//  RECOMMEND ENDPOINTS
app.post(`/api/recommended`, recCtlr.filterByCategory)
app.post(`/api/recommended/add`, recCtlr.addRecommend)

app.listen(SERVER_PORT, () => console.log(`${new Date()} Finding ${SERVER_PORT} matches across our server.`));
