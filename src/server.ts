import * as express from "express"
import * as logger from "morgan"
import * as bodyParser from "body-parser";
import routes from './routes/index'
import AppModule from "./app.module";
import {Server} from "./llama/server";
import {ANNOTATIONS} from "./llama";
import {reflector} from "./llama/reflection";
import {SubredditController} from "./routes/subreddit.controller";
import {Injector} from "./services/injector.service";
import RouteService from "./services/route.service";

export default class ApiServer {
    public app: express.Application;
    public mainModule: AppModule = new AppModule();

    public static bootstrap(): ApiServer {
        return new ApiServer();
    }

    constructor() {
        this.app = express();

        this.config();
        this.initialize();
    }

    config() {
        this.app.use(logger('dev'));

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.app.use((error: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
            error.status = 404;
            next(error)
        });
    }

    initialize() {
        let baseRouter = RouteService.init(AppModule);

        this.app.use("/", baseRouter)
    }
}