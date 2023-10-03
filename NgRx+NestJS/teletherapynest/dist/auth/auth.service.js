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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const argon = require("argon2");
const jwt_1 = require("@nestjs/jwt");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AuthService = class AuthService {
    constructor(userService, jwtService, httpService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async register(newUser) {
        try {
            const rfzo = await this.httpService
                .post("https://www.rfzo.rs/proveraUplateDoprinosa2.php", { zk: +newUser.zk, lbo: +newUser.lbo }, { headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
                responseType: "text" })
                .pipe((0, rxjs_1.catchError)(err => {
                console.log(err);
                throw new Error("RFZO server error");
            }));
            const resp = await (0, rxjs_1.lastValueFrom)(rfzo);
            console.log(resp.data);
            if (resp.data.trim()[0] !== "В")
                throw new Error("RFZO ne odobrava");
            const createdUser = await this.userService.createUser(newUser);
            if (createdUser == null || createdUser == undefined) {
                throw new Error("User could not be created");
            }
            return await this.login(createdUser);
        }
        catch (err) {
            console.log(err);
            return new common_1.HttpException(err, 500);
        }
    }
    async validateUser(username, password) {
        console.log("Auth service validating");
        const user = await this.userService.findUserByUsername(username);
        console.log("User found");
        console.log(user + " " + password);
        if (user && await argon.verify(user.passwordHash, password)) {
            const { passwordHash } = user, result = __rest(user, ["passwordHash"]);
            return result;
        }
        console.log("validation failed");
        return null;
    }
    async login(user) {
        const payload = { user: user, sub: user.id, role: user.role, };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async loginDoc(licenceId) {
        const doc = (await this.userService.findDoctorByLicence(licenceId));
        console.log(doc);
        if (doc == null || doc == undefined) {
            return new common_1.HttpException("Unauthorized", 401);
        }
        delete doc.passwordHash;
        const payload = { user: doc, sub: doc.id, role: doc.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async registerDoc(newDoctor) {
        try {
            const doc = await this.userService.createDoctor(newDoctor);
            return await this.login(doc);
        }
        catch (e) {
            return new common_1.HttpException("Error creating doctor", 501);
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map