import ApiService, {RequestOptions} from "./api.service";
import {AxiosPromise} from "axios";
import {SubredditInformationMapper, SubredditMapper} from "../mappers/subreddit.mapper";
import {Subreddit} from "../models/subreddit";
import {SubredditInformation} from "../models/subreddit-information";
import {Service} from "../llama";
import ConfigService, {RedditEndpoints} from "./config.service";

@Service()
export default class RedditService {
    reddit_endpoints : RedditEndpoints = new RedditEndpoints();
    reddit_client: { id: string; secret: string; };

    constructor(private _api: ApiService, private _configService: ConfigService) {
        this.reddit_client = this._configService.getRedditClient()
    }

    getSubreddit(subreddit_name: string, access_token: string, time_period: string = "month", limit: number = 25): AxiosPromise {

        let options: RequestOptions<Array<Subreddit>> = {
            mapper: SubredditMapper,
            dataPath: 'data.children',
            configuration: {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                },
                baseURL: this.reddit_endpoints.oauth_base_url,
                url: `r/${subreddit_name}/top/.json`,
                params: {
                    "limit": limit,
                    "t": time_period,
                    "sort": "top"
                }
            }
        };

        return this._api.get(options)
    }

    getSubredditInformation(subreddit_name: string): AxiosPromise {
        let options: RequestOptions<SubredditInformation> = {
            mapper: SubredditInformationMapper,
            dataPath: 'data',
            configuration: {
                baseURL: this.reddit_endpoints.base_url,
                url: `r/${subreddit_name}/about/.json`
            }
        };

        return this._api.get(options)
    }

    getAccessToken(username: string, password: string): AxiosPromise {
        let base_64_token = Buffer.from(`${this.reddit_client.id}:${this.reddit_client.secret}`, 'ascii').toString("base64");

        let options: RequestOptions<string> = {

            configuration: {
                baseURL: this.reddit_endpoints.base_url,
                url: this.reddit_endpoints.access_token,
                headers: {
                    "Authorization": `Basic ${base_64_token}`
                },
                params: {
                    grant_type: "password",
                    username: username,
                    password: password
                }
            }
        };

        return this._api.post(options);
    }
}