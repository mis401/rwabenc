import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/roles';
import { Conversation, Session, User } from 'src/typeorm';
import { ArrayContains, In, Repository } from 'typeorm';
import { SessionDTO } from './session.dto';

@Injectable()
export class SessionService {
    constructor(
        @InjectRepository(Session) private sesRepo: Repository<Session>,
        @InjectRepository(User) private userRepo: Repository<User>,
    ) {}


    async createSession(sesDTO: SessionDTO){
        const doctor = await this.userRepo.findOne({where: {id: sesDTO.doctorId}});
        if (doctor && doctor.role !== Role.Doctor){
            return new HttpException("No such doctor", 501);
        }
        if (!doctor) {
            throw new HttpException("No doctor found", 501);
        }
        console.log(doctor);

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

        const patient = await this.userRepo.findOne({where: {id: userId}});
        if(!patient) throw new Error('User not found');

        if(patient.role === Role.Patient){
            session.participants.push(patient);
            await this.sesRepo.save(session);
            return session;
        }
        else throw new Error('Only patients can sign up for sessions');
    }

    async getSessionsForUser(userId: number, role: Role) {
   
        const user = await this.userRepo.findOne({where: {id: userId}, relations: {participant: true}});
        if(!user) throw new Error('User not found');
        return user.participant;
    }

    async getSession(id: number){
        console.log("In getSession");
        console.log(id);
        const session = await this.sesRepo.findOne({where: {id: id}, relations: {doctor: true, participants: true, conversation: true}})
        if (session)
            return session;
        else
            return new HttpException(`No session found with id ${id}`, 501);
    }
}
