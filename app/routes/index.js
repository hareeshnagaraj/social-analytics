var express = require('express');
var FB = require('fb');
var router = express.Router();
var userAccessCode;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Social Analytics' });
});

router.get('/active', function(req, res) {
    userAccessCode = req.param("code");  //this is the user's access code, used to get token
    console.log('\n');

    FB.api('oauth/access_token', {
        client_id: '-',
        client_secret: '-',
        redirect_uri: 'http://localhost:3000/active/',
        code: userAccessCode
    }, function (res) {
        if(!res || res.error) {
            console.log(!res ? 'error occurred' : res.error);
            return;
        }

        var accessToken = res.access_token;

        var expires = res.expires ? res.expires : 0;
        console.log('\n');
        console.log('\n');
        console.log(accessToken)
        console.log(expires)
    });

  res.render('active', { response : res });
});


// FB.api('me', { access_token : userAccessToken } ,function (res) {
//     if(!res || res.error) {
//      console.log(!res ? 'error occurred' : res.error);
//      return;
//     }
//     console.log(res.id);
//     console.log(res.name);
// });




module.exports = router;
