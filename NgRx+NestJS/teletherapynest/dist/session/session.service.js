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
    constructor(sesRepo, userRepo) {
        this.sesRepo = sesRepo;
        this.userRepo = userRepo;
    }
    async createSession(sesDTO) {
        const doctor = await this.userRepo.findOne({ where: { id: sesDTO.doctorId } });
        if (doctor && doctor.role !== roles_1.Role.Doctor) {
            return new common_1.HttpException("No such doctor", 501);
        }
        if (!doctor) {
            throw new common_1.HttpException("No doctor found", 501);
        }
        console.log(doctor);
        console.log("pravim sesiju");
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
        const patient = await this.userRepo.findOne({ where: { id: userId } });
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
        if (role === roles_1.Role.Patient) {
            const user = await this.userRepo.findOne({ where: { id: userId }, relations: { participant: true } });
            if (!user)
                throw new Error('User not found');
            return user.participant;
        }
        else if (role === roles_1.Role.Doctor) {
            const sessions = await this.sesRepo.createQueryBuilder("session")
                .leftJoinAndSelect("session.doctor", "doctor")
                .leftJoinAndSelect("session.participants", "participants")
                .where("doctor.id = :id", { id: userId }).getMany();
            return sessions;
        }
    }
    async getSession(id) {
        console.log("In getSession");
        console.log(id);
        const session = await this.sesRepo.findOne({ where: { id: id }, relations: { doctor: true, participants: true, conversation: true } });
        if (session)
            return session;
        else
            return new common_1.HttpException(`No session found with id ${id}`, 501);
    }
    async cancelSession(sessionIds, userId) {
        console.log(sessionIds);
        const sessions = await this.sesRepo.find({ where: { id: (0, typeorm_3.In)(sessionIds) }, relations: { participants: true } });
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user)
            throw new Error('User not found');
        if (user.role === roles_1.Role.Patient) {
            for (let i = 0; i < sessions.length; i++) {
                const session = sessions[i];
                session.participants = session.participants.filter(p => p.id !== user.id);
                if (session.participants.length === 0) {
                    await this.sesRepo.remove(session);
                    return null;
                }
                await this.sesRepo.save(session);
            }
        }
        else {
            for (let i = 0; i < sessions.length; i++) {
                const session = sessions[i];
                await this.sesRepo.remove(session);
            }
        }
    }
    async endSession(id) {
        const session = await this.sesRepo.findOne({ where: { id: id } });
        session.sessionState = "ended";
        const updatedSession = await this.sesRepo.update({ id: id }, { sessionState: "ended" });
        console.log(updatedSession);
    }
};
SessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Session)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map