import {Service} from "../llama";

let config: ApiConfiguration = require("../config.json");

export interface RedditConfiguration {
    client: {
        id: string;
        secret: string;
    };
    api: {
        [key: string]: string;
    }
}

export interface ApiConfiguration {
    reddit: RedditConfiguration;
}

@Service()
export default class ConfigService {
    constructor() {
        this.verifyConfig();
    }

    private verifyConfig() {
        if (!config.reddit) {
            throw new Error("The configuration file does not contain a valid 'reddit' section.")
        }
        if (!config.reddit.api) {
            throw new Error("The configuration file does not contain a valid 'reddit api' section.")
        }
        if (!config.reddit.client) {
            throw new Error("The configuration file does not contain a valid 'reddit client' section.")
        }
        if (!config.reddit.api.base_url) {
            throw new Error("The configuration file does not contain a valid 'reddit api base_url' property.")
        }
        if (!config.reddit.api.oauth_base_url) {
            throw new Error("The configuration file does not contain a valid 'reddit api oauth_base_url' property.")
        }
    }

    getReddit() {
        return config.reddit;
    }

    getRedditApi() {
        return this.getReddit().api;
    }

    getRedditApiUrl(name: string) {
        return this.getRedditApi()[name];
    }

    getRedditClient() {
        return this.getReddit().client;
    }
}