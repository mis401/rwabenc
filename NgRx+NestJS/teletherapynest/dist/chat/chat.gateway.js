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
const chat_service_1 = require("./chat.service");
let ChatGateway = class ChatGateway {
    constructor(sessRepo, userRepo, convoRepo, msgRepo, chatService) {
        this.sessRepo = sessRepo;
        this.userRepo = userRepo;
        this.convoRepo = convoRepo;
        this.msgRepo = msgRepo;
        this.chatService = chatService;
        this.ConversationUser = new Map();
    }
    afterInit(server) {
        this.server.on('connection', (socket) => {
            socket.on('connectUser', async (data) => {
                socket.join(`${data.conversation}`);
                console.log("Prijavio se korisnik" + data.user);
                console.log(socket.rooms);
            });
        });
    }
    async handleConnect(data) {
        console.log("Prijavio se korisnik " + data.user);
        let usersInRoom = this.ConversationUser.get(data.conversation);
        console.log(usersInRoom);
        if (!usersInRoom) {
            usersInRoom = [];
        }
        if (!usersInRoom.includes(data.user))
            usersInRoom.push(data.user);
        console.log(usersInRoom);
        this.ConversationUser.set(data.conversation, usersInRoom);
        let users = await this.userRepo.find({ where: { id: (0, typeorm_3.In)(usersInRoom) } });
        users = users.map(user => { delete user.passwordHash; return user; });
        this.server.to(`${data.conversation}`).emit('konektovan', users);
    }
    async handleDisconnect(data) {
        console.log("Odjavio se korisnik " + data.user);
        let usersInRoom = this.ConversationUser.get(data.conversation);
        console.log(usersInRoom);
        if (!usersInRoom) {
            usersInRoom = [];
        }
        const index = usersInRoom.indexOf(data.user);
        console.log(index);
        if (index !== -1) {
            usersInRoom.splice(index, 1);
        }
        console.log(usersInRoom);
        this.ConversationUser.set(data.conversation, usersInRoom);
        let users = await this.userRepo.find({ where: { id: (0, typeorm_3.In)(usersInRoom) } });
        users = users.map(user => { delete user.passwordHash; return user; });
        this.server.to(`${data.conversation}`).emit('diskonektovan', users);
    }
    async handleMessage(msg) {
        console.log("sub");
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
    async handleCommand(msg) {
        console.log(msg);
        this.chatService.endSession(msg.session);
        if (msg.command === "stop session") {
            this.server.to(`${msg.conversation}`).emit(`command`, { command: "stop session" });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('connectUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleConnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('disconnectUser'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleDisconnect", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(`messageFromUser`),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)(`command`),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleCommand", null);
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
        typeorm_3.Repository,
        chat_service_1.ChatService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map