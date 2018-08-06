var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Catches = require('../models/catches');

var catchRouter = express.Router();
catchRouter.use(bodyParser.json());

catchRouter.route('/')
        .get(Verify.verifyOrdinaryUser, function (req, res, next) {
            Catches.find({})
                    .exec(function (err, catches) {
                        if (err) throw err;
                        //console.log("All available catches : ", catches);
                        res.json(catches);
                    });
        })
        .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Catches.remove({}, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });

catchRouter.post('/', function(req, res) {
    console.log('catchRouter POST');
    Catches.create(req.body, function (err, myCatch) {
        if (err) throw err;
        console.log('Catch created!');
        var id = myCatch._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        //res.json(myCatch);
        res.end('Added the catch with id: ' + id);
    });
});

catchRouter.post('/file', function(req, res) {
    console.log('catchRouter FILE POST');
    console.log('catchRouter FILE POST res : ', res);
});

catchRouter.route('/:catchId')
        .get(Verify.verifyOrdinaryUser, function (req, res, next) {
            Catches.findById(req.params.catchId)
            //.populate('comments.postedBy')
                    .exec(function (err, myCatch) {
                        if (err) throw err;
                        res.json(myCatch);
                    });
        })

        .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Catches.findByIdAndUpdate(req.params.catchId, {
                $set: req.body
            }, {
                new: true
            }, function (err, myCatch) {
                if (err) throw err;
                res.json(myCatch);
            });
        })

        .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Catches.findByIdAndRemove(req.params.catchId, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });

//catchRouter.route('/:catchId/comments')
//        .all(Verify.verifyOrdinaryUser)
//
//        .get(function (req, res, next) {
//            Catches.findById(req.params.catchId)
//                    //.populate('comments.postedBy')
//                    .exec(function (err, myCatch) {
//                        if (err) throw err;
//                        res.json(myCatch.comments);
//                    });
//        })
//
//        .post(function (req, res, next) {
//            Catches.findById(req.params.catchId, function (err, myCatch) {
//                if (err) throw err;
//                req.body.postedBy = req.decoded._doc._id;
//                myCatch.comments.push(req.body);
//                myCatch.save(function (err, myCatch) {
//                    if (err) throw err;
//                    console.log('Updated Comments!');
//                    res.json(myCatch);
//                });
//            });
//        })
//
//        .delete(Verify.verifyAdmin, function (req, res, next) {
//            Catches.findById(req.params.catchId, function (err, myCatch) {
//                if (err) throw err;
//                for (var i = (myCatch.comments.length - 1); i >= 0; i--) {
//                    myCatch.comments.id(myCatch.comments[i]._id).remove();
//                }
//                myCatch.save(function (err, result) {
//                    if (err) throw err;
//                    res.writeHead(200, {
//                        'Content-Type': 'text/plain'
//                    });
//                    res.end('Deleted all comments!');
//                });
//            });
//        });

module.exports = catchRouter;