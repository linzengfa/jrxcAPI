/**
 * Created by MoXiao on 2017/2/6.
 */
const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const config = require('../config');
const dbConsts = require('../consts/DbConsts');

/* GET dlt page. */
module.exports = (req, res) => {
    mongoClient.connect(config.mongodb.url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
        var collection = db.collection(dbConsts.MONGODB_COLLECTION_KJGG);
        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found the following records");
            console.log(docs);
            res.send(docs);
        });
    });

};