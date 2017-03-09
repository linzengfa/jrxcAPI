'use strict';

const express = require('express');
const router = express.Router();

router.get('/', require('./welcome'));
router.get('/login', require('./login'));
router.get('/user', require('./user'));
router.get('/kjgg', require('./kjgg'));//开奖公告
router.get('/xytj', require('./xytj'));//幸运推荐

module.exports = router;