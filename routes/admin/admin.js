var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var loginUtil = require('../util/login_util');

/* 대시보드 리스트 */
router.get('/adminList', function (req, res) {
  loginUtil.loginCheck(req, res);
  console.log('/admin/adminList'+process.env.API_SERVER_HOST);
  res.render('admin/adminList', {
      aid: req.session.key,
      apiHost: process.env.API_SERVER_HOST
  })
});

module.exports = router;