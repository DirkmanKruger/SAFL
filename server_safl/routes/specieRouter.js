var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify = require('./verify');
var Species = require('../models/species');

var speciesRouter = express.Router();
speciesRouter.use(bodyParser.json());

speciesRouter.route('/')
        .all(Verify.verifyOrdinaryUser)
        .get(function (req, res, next) {
            //var userId = req.decoded._doc._id;
            Species.find({})
                    .exec(function (err, species) {
                        if (err) next(err);
                        //console.log("All available species : ", species);
                        res.json(species);
                    });
        })

        .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Species.create(req.body, function (err, species) {
                if (err) throw err;
                console.log('Specie created!');
                var id = species._id;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                //res.json(species);
                res.end('Added the species with id: ' + id);
            });
        })

        .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Species.remove({}, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });

speciesRouter.route('/:specieId')
        .get(Verify.verifyOrdinaryUser, function (req, res, next) {
            Species.findById(req.params.specieId)
                    .exec(function (err, specie) {
                        if (err) throw err;
                        res.json(specie);
                    });
        })

        .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Species.findByIdAndUpdate(req.params.specieId, {
                $set: req.body
            }, {
                new: true
            }, function (err, specie) {
                if (err) throw err;
                res.json(specie);
            });
        })

        .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
            Species.findByIdAndRemove(req.params.specieId, function (err, resp) {
                if (err) throw err;
                res.json(resp);
            });
        });

module.exports = speciesRouter;


