"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const e = require("express");
const llama_1 = require("../llama");
const get_1 = require("../llama/get");
const reddit_service_1 = require("../services/reddit.service");
let SubredditController = class SubredditController {
    constructor(_redditService) {
        this._redditService = _redditService;
    }
    get(request, response) {
        let subreddit_name = request.params.subreddit;
        let query = Object.assign({ t: "month", limit: 25 }, request.query);
        let time_period = query.t;
        let limit = query.limit;
        let access_token = request.get("access_token");
        this._redditService.getSubreddit(subreddit_name, access_token, time_period, limit).then(subredditResult => {
            response.send(subredditResult);
        }).catch((error) => {
            response.sendStatus(500);
        });
    }
    about(request, response) {
        let subreddit_name = request.params.subreddit;
        this._redditService.getSubredditInformation(subreddit_name).then(subredditResult => {
            response.send(subredditResult);
        }).catch((error) => {
            response.sendStatus(500);
        });
    }
};
__decorate([
    get_1.Get({ path: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SubredditController.prototype, "get", null);
__decorate([
    get_1.Get({ path: "/about" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SubredditController.prototype, "about", null);
SubredditController = __decorate([
    llama_1.Controller({
        authorise: false
    }),
    __metadata("design:paramtypes", [reddit_service_1.default])
], SubredditController);
exports.SubredditController = SubredditController;
//# sourceMappingURL=subreddit.controller.js.map