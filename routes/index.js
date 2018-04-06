var express = require('express');
var router = express.Router();
var axios = require('axios');
var global = require("../global");

// curl -X POST -d 'grant_type=password&username=jackkallenn&password=nmnmnmnm1' -A "LlamaApp/0.1 by JackkAllenn" --user 'O_EChGpxqjLChQ:H9CWvH1MyixCwpUZeg4VC2OcKCk' https://www.reddit.com/api/v1/access_token

/* GET home page. */
router.post('/access_token', function (req, res, next) {

    axios.request({
        method: "POST",
        baseURL: global.api.reddit.base_url,
        url: global.api.reddit.access_token,

        headers: {
            "User-Agent": "LlamaApp/0.1 by JackkAllenn",
            "Authorization" : "Basic " + Buffer.from(global.settings.client_id + ":" + global.settings.client_secret, 'ascii').toString("base64")
        },

        params: {
            grant_type: "password",
            username: req.body.username,
            password: req.body.password
        }
    }).then(function (response) {
        res.send({
            access_token : response.data.access_token
        });
    }).catch(function (error) {
        console.log(error);
        res.send({ error: "Unable to verify details"});
    })
});

module.exports = router;
