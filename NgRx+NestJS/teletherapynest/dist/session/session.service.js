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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const roles_1 = require("../auth/roles");
const typeorm_2 = require("../typeorm");
const typeorm_3 = require("typeorm");
let SessionService = class SessionService {
    constructor(sesRepo, patientRepo, doctorRepo, userRepo) {
        this.sesRepo = sesRepo;
        this.patientRepo = patientRepo;
        this.doctorRepo = doctorRepo;
        this.userRepo = userRepo;
    }
    async createSession(sesDTO) {
        const doctor = await this.doctorRepo.findOne({ where: { id: sesDTO.doctorId } });
        if (!doctor)
            throw new Error('Doctor not found');
        const session = await this.sesRepo.save({
            doctor: doctor,
            name: sesDTO.name,
            description: sesDTO.description,
            appointment: sesDTO.appointment,
            participants: [],
            conversation: new typeorm_2.Conversation(),
        });
        return session;
    }
    async signUpForSession(sessionId, userId) {
        const session = await this.sesRepo.findOne({ where: { id: sessionId }, relations: { participants: true } });
        if (!session)
            throw new Error('Session not found');
        const patient = await this.patientRepo.findOne({ where: { id: userId } });
        if (!patient)
            throw new Error('User not found');
        if (patient.role === roles_1.Role.Patient) {
            session.participants.push(patient);
            await this.sesRepo.save(session);
            return session;
        }
        else
            throw new Error('Only patients can sign up for sessions');
    }
    async getSessionsForUser(userId, role) {
        let userSearch;
        if (role === roles_1.Role.Patient) {
            userSearch = await this.patientRepo.findOne({ where: { id: userId } });
        }
        else if (role === roles_1.Role.Doctor) {
            userSearch = await this.doctorRepo.findOne({ where: { id: userId } });
        }
        const user = userSearch;
        if (!user)
            throw new Error('User not found');
        if (user.role === roles_1.Role.Patient) {
            return await this.sesRepo.find({ relations: { doctor: true }, where: { participants: { id: user.id } } });
        }
        else if (user.role === roles_1.Role.Doctor) {
            return await this.sesRepo.find({ where: { doctor: user } });
        }
    }
};
SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Session)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.Patient)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.Doctor)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map