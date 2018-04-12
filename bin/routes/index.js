"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const subreddit_controller_1 = require("./subreddit.controller");
const auth_controller_1 = require("./auth.controller");
let routes = [{
        path: "/r/:subreddit",
        controller: subreddit_controller_1.SubredditController
    }, {
        path: "/access_token",
        controller: auth_controller_1.AuthorisationController
    }];
exports.default = routes;
//# sourceMappingURL=index.js.map