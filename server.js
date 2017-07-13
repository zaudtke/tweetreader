

require('dotenv').config()


const path = require('path');
const express = require('express');
const Request = require ('request');

const app = express();

app.use(express.static('./www'));

app.get('/',function (req,res){
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/tweets', function(req, res){

    let tags = process.env.Tags;


    let qs = {
        q : tags.replace(' ', ' OR '),
        result_type: "recent",
        include_entities: 1,
        count: 100
    };

    let options = {
      url: 'https://api.twitter.com/1.1/search/tweets.json?',
      qs : qs,
      method: 'GET',
      headers: {
          Authorization: `Bearer ${token}`
      }
    };

    if(req.query.since_id !== undefined)
    {
        options.qs = req.query;
        options.qs.count = 100;
        options.url = 'https://api.twitter.com/1.1/search/tweets.json?';
    }

    Request(options,(err, response, payload)=> {
        
        var jPayload = JSON.parse(payload);
        
        var list = jPayload.statuses.map(mapToTweet);
        var refresh = jPayload.search_metadata.refresh_url;
        res.json({
            tweets : list,
            refreshUrl : refresh,
        });

    });


});

app.get('/api/tags', function(req,res){
    let tags = process.env.Tags.replace(' ', ', ');
    res.json(tags);
})

app.get('/api/authenticate', function(req,res){
   var body = "grant_type=client_credentials";

    let options = {
        url: "https://api.twitter.com/oauth2/token",
        method: "POST",
        body: body,
        headers:{
            "Content-Type" : "application/x-www-form-urlencoded;charset-UTF-8",
            Authorization: `Basic ${process.env.Authorization_Key}` 
        }
    };
    Request(options, (error, response, payload) => {
        token = JSON.parse(payload).access_token;
        res.sendStatus(200);
    });
});

var port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`Listening on port ${port}`);
});

let token = '';

function mapToTweet(status) {

    let imgUrl = '';

    if(status.entities.media != null && status.entities.media.length > 0)
    {
        imgUrl = status.entities.media[0].media_url_https;
    }

    return {
        createdAt : status.created_at,
        name : status.user.name,
        screenName : status.user.screen_name,
        text: status.text,
        profileImageUrl : status.user.profile_image_url,
        imageUrl : imgUrl
    };
};