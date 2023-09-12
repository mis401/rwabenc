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
    constructor(patientRepo, docRepo) {
        this.patientRepo = patientRepo;
        this.docRepo = docRepo;
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
                reviews: [],
            };
            console.log(user);
            await this.patientRepo.save(user);
            delete user.passwordHash;
            return user;
        }
        catch (err) {
            console.log(err);
            throw new typeorm_2.TypeORMError(err);
        }
    }
    async findUserById(id) {
        return await this.patientRepo.findOneBy({ id: id });
    }
    async findUserByUsername(username) {
        return await this.patientRepo.findOneBy({ username: username });
    }
    getUsers() {
        return this.patientRepo.find();
    }
    async findDoctorByLicence(licenceId) {
        console.log(licenceId);
        const doc = await this.docRepo.findOneBy({ licenceId });
        console.log(doc);
        return doc;
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_3.InjectRepository)(typeorm_1.Patient)),
    __param(1, (0, typeorm_3.InjectRepository)(typeorm_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map