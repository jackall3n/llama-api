import * as e from "express"
import {Controller} from "../llama";
import {Get} from "../llama/get";
import RedditService from "../services/reddit.service";

@Controller({
    authorise: false
})
export class SubredditController {

    constructor(private _redditService: RedditService) {
    }

    @Get({path: "/"}) get(request: e.Request, response: e.Response): void {
        let subreddit_name = request.params.subreddit;
        let query = {t: "month", limit: 25, ...request.query};
        let time_period = query.t;
        let limit = query.limit;
        let access_token = request.get("access_token");

        this._redditService.getSubreddit(subreddit_name, access_token, time_period, limit).then(subredditResult => {
            response.send(subredditResult);
        }).catch((error) => {
            response.sendStatus(500);
        })
    }

    @Get({path: "/about"}) about(request: e.Request, response: e.Response): void {
        let subreddit_name = request.params.subreddit;

        this._redditService.getSubredditInformation(subreddit_name).then(subredditResult => {
            response.send(subredditResult);
        }).catch((error) => {
            response.sendStatus(500);
        })
    }
}