var express = require('express');
var router = express.Router();
var async = require('async');
var request = require('request');
var unirest = require('unirest');
var axios = require('axios');


/* 로그인 페이지 이동 */
router.get('/', function (req, res) {

    console.log("로그인페이지로이동");
    req.session.destroy();
    res.render('login', {
        apiHost: process.env.API_SERVER_HOST
      })
});

/* 로그인 처리 */
router.post('/', function (req, res) {
    var {
        id,
        password
    } = req.body;

        console.log(`[login] - 로그인 Param ::: Login ID:${id}, PW:${password}`);
        axios.post(process.env.API_SERVER_HOST + '/auth/login', {
            "id": id,
            "password": password
        })
        .then(function (response) {
            // console.log(response);
            if (response.data.code == 200) {
                req.session.key = id;
                // req.session.membername F= response.body.id;
                req.session.adminid = response.data.id;
                console.log("@@@ ok");
                res.redirect('/home/dashboard')
            } else {
                console.log("@@@ fail");
                res.redirect('/login')
            }
        })
        .catch(function(err){
            console.log('catch err');
            console.log(err);
        });
});

/* 로그아웃 처리 */
router.get('/logout', function (req, res) {
    req.session.destroy();
    res.clearCookie('key');
    res.redirect("/login");
});

module.exports = router;
