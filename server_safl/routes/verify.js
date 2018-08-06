var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, {
        expiresIn: 3600
    });
};

exports.verifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("verifyOrdinaryUser function");

    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error('You are not authenticated!');
                err.status = 401;
                return next(err);
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
        console.log("verifyOrdinaryUser : token provided");
    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};


exports.verifyAdmin = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("verifyAdmin function");

    // decode token
    if (token) {
        // verifies secret and checks exp
        // secret already verified - no need to verify again, just check admin privileges
        console.log( "verifyAdmin Decoded : ", req.decoded._doc.admin);

        // decode token
        if (req.decoded._doc.admin) {
            //User is a verified Admin user - continue
            console.log( "Verified Admin User");
            next();
        } else {
            //User is NOT an Admin user - Action not allowed
            console.log( "Non Admin User");
            var err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        }


    } else {
        // if there is no token
        // return an error
        var err = new Error('No token provided!');
        err.status = 403;
        return next(err);
    }
};
