var settings = {
    "client_id": "O_EChGpxqjLChQ",
    "client_secret": "H9CWvH1MyixCwpUZeg4VC2OcKCk"
};

var api = {
    reddit: {
        "base_url": "https://www.reddit.com",
        "access_token": "/api/v1/access_token",

        "oauth_base_url": "https://oauth.reddit.com",
        "me" : "/api/v1/me"
    }
};

module.exports = {
    settings: settings,
    api: api
};