'use strict';

const LoginService = require('qcloud-weapp-server-sdk').LoginService;
const mongoClient = require('mongodb').MongoClient;
const dbConsts = require('../consts/DbConsts');

module.exports = (req, res) => {
    const loginService = LoginService.create(req, res);

    loginService.check()
        .then(data => {
            //存储用户信息
            let userInfo = data.userInfo;
            mongoClient.connect(config.mongodb.url, function(err, db) {
                assert.equal(null, err);
                console.log("Connected correctly to server");
                var collection = db.collection(dbConsts.MONGODB_COLLECTION_USERINFO);
                collection.count({'openId':userInfo.openId},function(err, count) {
                    if(count ==0){//没有数据，直接插入
                        console.log("没有数据，直接插入");
                        collection.insertOne(userInfo, function(err, result) {
                            assert.equal(err, null);
                            console.log("Inserted "+result.result.n+" documents into the document collection");
                            db.close();
                        });
                    }else{
                        console.log("有数据，进行更新");
                        collection.updateOne({'openId':userInfo.openId},userInfo, function(err, result) {
                            assert.equal(err, null);
                            assert.equal(1, result.result.n);
                            console.log("Updated the document with the field a equal to 2");
                            db.close();
                        });
                    }
                });
            });
            res.json({
                'code': 0,
                'message': 'ok',
                'data': {
                    'userInfo': data.userInfo,
                },
            });
        });
};