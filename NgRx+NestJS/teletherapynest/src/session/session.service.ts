import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/roles';
import { Conversation, Doctor, Patient, Session, User } from 'src/typeorm';
import { ArrayContains, In, Repository } from 'typeorm';
import { SessionDTO } from './session.dto';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session) private sesRepo: Repository<Session>,
        @InjectRepository(Patient) private patientRepo: Repository<Patient>,
        @InjectRepository(Doctor) private doctorRepo: Repository<Doctor>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}


    async createSession(sesDTO: SessionDTO){
        const doctor = await this.doctorRepo.findOne({where: {id: sesDTO.doctorId}});
        if(!doctor) throw new Error('Doctor not found');

        const session = await this.sesRepo.save({
            doctor: doctor,
            name: sesDTO.name,
            description: sesDTO.description,
            appointment: sesDTO.appointment,
            participants: [],
            conversation: new Conversation(),
        });
        return session;
    }

    async signUpForSession(sessionId: number, userId: number){
        const session = await this.sesRepo.findOne({where: {id: sessionId}, relations: {participants: true}});
        if(!session) throw new Error('Session not found');

        const patient = await this.patientRepo.findOne({where: {id: userId}});
        if(!patient) throw new Error('User not found');

        if(patient.role === Role.Patient){
            session.participants.push(patient);
            await this.sesRepo.save(session);
            return session;
        }
        else throw new Error('Only patients can sign up for sessions');
    }

    async getSessionsForUser(userId: number, role: Role) {
        let userSearch;
        if(role === Role.Patient){
            userSearch = await this.patientRepo.findOne({where: {id: userId}});
        }
        else if(role === Role.Doctor){
            userSearch = await this.doctorRepo.findOne({where: {id: userId}});
        }
        const user = userSearch;
        if(!user) throw new Error('User not found');

        if(user.role === Role.Patient){
            return await this.sesRepo.find({relations: {doctor: true}, where: {participants: { id: user.id}}});
        }
        else if(user.role === Role.Doctor){
            return await this.sesRepo.find({where: {doctor: user}});
        }
    }

}
