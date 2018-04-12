"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const llama_1 = require("../llama");
const e = require("express");
const reflection_1 = require("../llama/reflection");
const injector_service_1 = require("./injector.service");
let RouteService = class RouteService {
    static init(appModule) {
        let module = reflection_1.reflector.annotations(appModule);
        let router = e.Router();
        for (let route of module[0].routes) {
            let methods = reflection_1.reflector.propMetadata(route.controller);
            let controller = injector_service_1.Injector.resolve(route.controller);
            let method_router = e.Router({ mergeParams: true });
            for (let method_name in methods) {
                let method_config = methods[method_name][0];
                let method_type = method_config.method.toLowerCase();
                let method_body = controller[method_name];
                method_router[method_type](method_config.path, (...args) => method_body.apply(controller, args));
            }
            router.use(route.path, method_router);
        }
        return router;
    }
};
RouteService = __decorate([
    llama_1.Service()
], RouteService);
exports.default = RouteService;
//# sourceMappingURL=route.service.js.map