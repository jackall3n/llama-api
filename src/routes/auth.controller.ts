import * as e from "express"
import {Controller} from "../llama/index";
import RedditService from "../services/reddit.service";
import {Post} from "../llama/post";

@Controller()
export class AuthorisationController {

    constructor(private _redditService: RedditService) {
    }

    @Post({path: "/"})
    accessToken(request: e.Request, response: e.Response): void {
        let username = request.body.username;
        let password = request.body.password;

        this._redditService.getAccessToken(username, password).then(access_token => {
            response.send({access_token})
        }).catch(()  => {
            response.send({error: "Unable to verify details"});
        })
    }
}