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
const llama_1 = require("../llama");
let config = require("../config.json");
let ConfigService = class ConfigService {
    constructor() {
        this.verifyConfig();
    }
    verifyConfig() {
        if (!config.reddit) {
            throw new Error("The configuration file does not contain a valid 'reddit' section.");
        }
        if (!config.reddit.api) {
            throw new Error("The configuration file does not contain a valid 'reddit api' section.");
        }
        if (!config.reddit.client) {
            throw new Error("The configuration file does not contain a valid 'reddit client' section.");
        }
        if (!config.reddit.api.base_url) {
            throw new Error("The configuration file does not contain a valid 'reddit api base_url' property.");
        }
        if (!config.reddit.api.oauth_base_url) {
            throw new Error("The configuration file does not contain a valid 'reddit api oauth_base_url' property.");
        }
    }
    getReddit() {
        return config.reddit;
    }
    getRedditApi() {
        return this.getReddit().api;
    }
    getRedditApiUrl(name) {
        return this.getRedditApi()[name];
    }
    getRedditClient() {
        return this.getReddit().client;
    }
};
ConfigService = __decorate([
    llama_1.Service(),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.default = ConfigService;
//# sourceMappingURL=config.service.js.map