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
exports.Patient = void 0;
const typeorm_1 = require("typeorm");
const session_entity_1 = require("./session.entity");
const roles_1 = require("../auth/roles");
const review_entity_1 = require("./review.entity");
const user_entity_1 = require("./user.entity");
let Patient = class Patient extends user_entity_1.User {
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Patient.prototype, "zdravstvenaKnjizica", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Patient.prototype, "lbo", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => session_entity_1.Session, session => session.participants),
    __metadata("design:type", Array)
], Patient.prototype, "participant", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Patient.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, review => review.patient),
    __metadata("design:type", Array)
], Patient.prototype, "reviews", void 0);
Patient = __decorate([
    (0, typeorm_1.Entity)()
], Patient);
exports.Patient = Patient;
//# sourceMappingURL=patient.entity.js.map