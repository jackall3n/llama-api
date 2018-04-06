var express = require('express');
var router = express.Router();
var axios = require('axios');
var global = require("../global");
var _ = require("lodash");

router.get('/:subreddit', function (req, res, next) {

    var subreddit = req.params.subreddit;
    var token = req.get("access_token");

    console.log("access_token", token);

    /*res.send({
        subreddit: subreddit,
        token: token
    });*/

    axios.request({
        method: "GET",
        baseURL: global.api.reddit.oauth_base_url,
        url: "r/" + subreddit + "/.json?sort=top&t=month",

        headers: {
            "User-Agent": "LlamaApp/0.1 by JackkAllenn",
            "Authorization" : "Bearer " + token
        }
    }).then(function (response) {

        var posts = response.data.data.children;
        res.send(mapPosts(posts));

    }).catch(function (error) {
        console.log(error, (error.response || {data:"no response"}).data);
        res.send({ error: "Unable to get subreddit posts", subreddit: subreddit, status: error.statusCode});
    })
});

function getPostType(kind){
    switch (kind) {
        case "t1" : return "comment";
        case "t2" : return "account";
        case "t3" : return "link";
        case "t4" : return "message";
        case "t5" : return "subreddit";
        case "t6" : return "award";
    }
}


function mapPosts(posts){
    var filtered = _(posts).filter(function(post) {
        return getPostType(post.kind) === "link"
    }).value();

    console.log(filtered);

    //return filtered;

    return filtered.map(function(post){
        var data = post.data;

        return {
            id: data.id,
            title: data.title,
            image_url: data.preview.images[0].source.url,
            image_id: data.preview.images[0].id,
            created: data.created,
            score: data.score,
            thumbnail: data.thumbnail
        };
    });
}

module.exports = router;
