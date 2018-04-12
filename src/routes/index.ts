import {SubredditController} from "./subreddit.controller";
import {AuthorisationController} from "./auth.controller";

let routes: any[] = [{
    path: "/r/:subreddit",
    controller: SubredditController
}, {
    path: "/access_token",
    controller: AuthorisationController
}];

export default routes;