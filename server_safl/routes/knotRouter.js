var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Knots = require('../models/knots');

var knotsRouter = express.Router();
knotsRouter.use(bodyParser.json());

knotsRouter.route('/')
        .all(Verify.verifyOrdinaryUser)
        .get(function (req, res, next) {
            //var userId = req.decoded._doc._id;
            Knots.find({})
                    //.populate('knots')
                    .exec(function (err, knots) {
                        if (err) next(err);
                        //console.log("All available knots : ", knots);
                        res.json(knots);
                    });
        })

        .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Knots.create(req.body, function (err, knot) {
                if (err) throw err;
                console.log('Knot created!');
                var id = knot._id;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                //res.json(knot);
                res.end('Added the knot with id: ' + id);
            });
        })

        .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Knots.remove({}, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });

knotsRouter.route('/:knotId')
        .get(Verify.verifyOrdinaryUser, function (req, res, next) {
            Knots.findById(req.params.knotId)
            //.populate('comments.postedBy')
                    .exec(function (err, knot) {
                        if (err) throw err;
                        res.json(knot);
                    });
        })

        .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Knots.findByIdAndUpdate(req.params.knotId, {
                $set: req.body
            }, {
                new: true
            }, function (err, knot) {
                if (err) throw err;
                res.json(knot);
            });
        })

        .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Knots.findByIdAndRemove(req.params.knotId, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });

module.exports = knotsRouter;


