exports.loginCheck = function (req,res) {
    if (!req.session.key) {
        res.redirect('/login');
    }
    return;
 }