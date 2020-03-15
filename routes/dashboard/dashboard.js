var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var loginUtil = require('../util/login_util');

/* 대시보드 리스트 */
router.get('/dashboard', function (req, res) {
  loginUtil.loginCheck(req,res);

console.log("다시 대쉬보드다 ");
  request.get(encodeURI(process.env.API_SERVER_HOST + '/cms/api/dashboard'), function (error, response, body) {
    let data='';
    try{
      data = JSON.parse(body);
    }catch(err){
      res.render('error', {apiHost: process.env.API_SERVER_HOST})
    }finally{
      // console.log(data)
      res.render('dashboard', {
        data: data,
        apiHost: process.env.API_SERVER_HOST
      })
    }
  })
});

router.get('/home/dashboard', function (req, res) {
  console.log("대쉬보드 라우터");
  loginUtil.loginCheck(req, res);
  res.render('home/dashboard', {
      // aid: req.session.key,
      // apiHost: process.env.API_SERVER_HOST
  })
});

module.exports = router;