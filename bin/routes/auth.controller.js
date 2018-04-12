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
const index_1 = require("../llama/index");
const reddit_service_1 = require("../services/reddit.service");
const post_1 = require("../llama/post");
let AuthorisationController = class AuthorisationController {
    constructor(_redditService) {
        this._redditService = _redditService;
    }
    accessToken(request, response) {
        let username = request.body.username;
        let password = request.body.password;
        this._redditService.getAccessToken(username, password).then(access_token => {
            response.send({ access_token });
        }).catch(() => {
            response.send({ error: "Unable to verify details" });
        });
    }
};
__decorate([
    post_1.Post({ path: "/" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthorisationController.prototype, "accessToken", null);
AuthorisationController = __decorate([
    index_1.Controller(),
    __metadata("design:paramtypes", [reddit_service_1.default])
], AuthorisationController);
exports.AuthorisationController = AuthorisationController;
//# sourceMappingURL=auth.controller.js.map