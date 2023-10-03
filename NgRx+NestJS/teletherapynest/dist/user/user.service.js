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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("../typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("@nestjs/typeorm");
const argon = require("argon2");
const roles_1 = require("../auth/roles");
let UserService = class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createUser(userToBeCreated) {
        try {
            const hash = await argon.hash(userToBeCreated.password);
            const user = {
                id: 0,
                username: userToBeCreated.username,
                passwordHash: hash,
                email: userToBeCreated.email,
                firstName: userToBeCreated.firstName,
                lastName: userToBeCreated.lastName,
                phoneNumber: userToBeCreated.phoneNumber,
                zdravstvenaKnjizica: userToBeCreated.zk,
                lbo: userToBeCreated.lbo,
                role: roles_1.Role.Patient,
                participant: [],
                messages: [],
                reviewsLeft: [],
                reviewed: null,
                licenceId: null,
                sessionsLed: null
            };
            console.log(user);
            await this.userRepo.save(user);
            delete user.passwordHash;
            return user;
        }
        catch (err) {
            console.log(err);
            throw new typeorm_2.TypeORMError(err);
        }
    }
    async createDoctor(newDoctor) {
        try {
            const hash = await argon.hash(newDoctor.password);
            const createdDoc = await this.userRepo.save({
                id: 0,
                username: newDoctor.username,
                passwordHash: hash,
                email: newDoctor.email,
                firstName: newDoctor.firstName,
                lastName: newDoctor.lastName,
                phoneNumber: newDoctor.phoneNumber,
                zdravstvenaKnjizica: null,
                lbo: null,
                role: roles_1.Role.Doctor,
                participant: [],
                messages: [],
                reviewsLeft: null,
                reviewed: [],
                licenceId: newDoctor.licenceId,
                sessionsLed: []
            });
            console.log(createdDoc);
            delete createdDoc.passwordHash;
            return createdDoc;
        }
        catch (e) {
            console.log(e);
            throw new typeorm_2.TypeORMError(e);
        }
    }
    async findUserById(id) {
        return await this.userRepo.findOneBy({ id: id });
    }
    async findUserByUsername(username) {
        return await this.userRepo.findOneBy({ username: username });
    }
    getUsers() {
        return this.userRepo.find();
    }
    async findDoctorByLicence(licenceId) {
        console.log(licenceId);
        const doc = await this.userRepo.findOneBy({ licenceId });
        console.log(doc);
        return doc;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_3.InjectRepository)(typeorm_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map