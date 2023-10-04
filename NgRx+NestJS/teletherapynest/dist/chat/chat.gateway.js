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
exports.ChatGateway = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const websockets_1 = require("@nestjs/websockets");
const typeorm_2 = require("../typeorm");
const typeorm_3 = require("typeorm");
const socket_io_1 = require("socket.io");
let ChatGateway = class ChatGateway {
    constructor(sessRepo, userRepo, convoRepo, msgRepo) {
        this.sessRepo = sessRepo;
        this.userRepo = userRepo;
        this.convoRepo = convoRepo;
        this.msgRepo = msgRepo;
        this.users = [];
    }
    afterInit(server) {
        this.server.on('connection', (socket) => {
            console.log('\n\n\n');
            socket.on('connectUser', (data) => {
                socket.join(`${data.conversation}`);
                console.log("Prijavio se korisnik" + data.user);
                console.log(socket.rooms);
            });
        });
        this.server.on('messageFromUser', async (msg) => {
            const conversation = await this.convoRepo.findOne({ where: { id: msg.conversation } });
            const user = await this.userRepo.findOne({ where: { id: msg.userSender } });
            const date = new Date();
            const newMsg = {
                id: 0,
                text: msg.text,
                userSender: user,
                date,
                conversation
            };
            const savedMsg = await this.msgRepo.save(newMsg);
            this.server.emit(`messageFromServer`, savedMsg);
            console.log(savedMsg);
        });
    }
    async handleMessage(msg) {
        const conversation = await this.convoRepo.findOne({ where: { id: msg.conversation } });
        const user = await this.userRepo.findOne({ where: { id: msg.userSender } });
        const date = new Date();
        const newMsg = {
            id: 0,
            text: msg.text,
            userSender: user,
            date,
            conversation
        };
        const savedMsg = await this.msgRepo.save(newMsg);
        this.server.to(`${msg.conversation}`).emit(`messageFromServer`, savedMsg);
        console.log(savedMsg);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(`messageFromUser`),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        }
    }),
    __param(0, (0, typeorm_1.InjectRepository)(typeorm_2.Session)),
    __param(1, (0, typeorm_1.InjectRepository)(typeorm_2.User)),
    __param(2, (0, typeorm_1.InjectRepository)(typeorm_2.Conversation)),
    __param(3, (0, typeorm_1.InjectRepository)(typeorm_2.Message)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository,
        typeorm_3.Repository])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map