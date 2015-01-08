var express = require('express');
var FB = require('fb');
var router = express.Router();

//tokens to be exchanged
var userAccessCode;
var userAccessToken;
var userAccessTokenExpires;

//information about user
var userID;
var username;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Social Analytics' });
});

router.get('/active', function(req, res) {
    userAccessCode = req.param("code");  //this is the user's access code, used to get token
    console.log('\n');

    var pageRes = res;

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

        userAccessToken = res.access_token;
        userAccessTokenExpires = res.expires ? res.expires : 0;

        // console.log('\n');
        // console.log('\n');
        // console.log(userAccessToken);
        // console.log(userAccessTokenExpires);
        // console.log('\n');
        // console.log('\n');
        FB.setAccessToken(userAccessToken);

        FB.api('me', function (res) {
          if(!res || res.error) {
           console.log(!res ? 'error occurred' : res.error);
           return;
          }
          userID = res.id;
          username = res.name;
          console.log(res);
          console.log(userID);
          console.log(username);

          FB.api(userID+'/friends',function(res){
            if(!res || res.error){
                console.log('ERROR!\n');
            }
            console.log(res);
          });


          //Grabbing the user's feed
          FB.api(userID+'/feed',function(res){
            if(!res || res.error){
                console.log('ERROR!\n');
            }
            console.log(res);
          });
          
          pageRes.render('active', { currentuser : username });

        });
    });

  
});


module.exports = router;
