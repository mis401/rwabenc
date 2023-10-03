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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const conversation_entity_1 = require("./conversation.entity");
let Session = class Session {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({
        type: 'bigint'
    }),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Session.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Session.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'timestamp' }),
    __metadata("design:type", Date)
], Session.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, doctor => doctor.sessionsLed),
    __metadata("design:type", user_entity_1.User)
], Session.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => user_entity_1.User, patient => patient.participant),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], Session.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => conversation_entity_1.Conversation, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", conversation_entity_1.Conversation)
], Session.prototype, "conversation", void 0);
Session = __decorate([
    (0, typeorm_1.Entity)()
], Session);
exports.Session = Session;
//# sourceMappingURL=session.entity.js.map