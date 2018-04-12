import {Mapper} from "../llama/mapper";
import {Subreddit} from "../models/subreddit";
import {SubredditInformation} from "../models/subreddit-information";

@Mapper()
export class SubredditMapper implements Mapper<Array<Subreddit>> {

    private _getPostType(kind: string) {
        switch (kind) {
            case "t1" :
                return "comment";
            case "t2" :
                return "account";
            case "t3" :
                return "link";
            case "t4" :
                return "message";
            case "t5" :
                return "subreddit";
            case "t6" :
                return "award";
        }
    }

    map(posts: [{ [key: string]: any }]): Array<Subreddit> {

        return posts.filter(post => this._getPostType(post.kind) === "link").map(post => {
            let subreddit_data = post.data;

            return {
                id: subreddit_data.id,
                permalink: subreddit_data.permalink,
                url: subreddit_data.url,
                subreddit: subreddit_data.subreddit,
                title: subreddit_data.title,
                image_url: subreddit_data.preview.images[0].source.url,
                image_id: subreddit_data.preview.images[0].id,
                created: subreddit_data.created,
                author: subreddit_data.author,
                score: subreddit_data.score,
                comments: subreddit_data.num_comments,
                domain: subreddit_data.domain,
                thumbnail_url: subreddit_data.thumbnail,
                type: subreddit_data.post_hint === "image" ? "image" : this._getPostType(post.kind)
            }
        })
    }
}

@Mapper()
export class SubredditInformationMapper implements Mapper<SubredditInformation> {
    map(data: { [key: string]: any }): SubredditInformation {

        return {
            id: data.id,
            icon_image_url: data.icon_img,
            description: data.public_description,
            display_name: data.display_name,
            display_name_prefixed: data.display_name_prefixed
        }
    }
}