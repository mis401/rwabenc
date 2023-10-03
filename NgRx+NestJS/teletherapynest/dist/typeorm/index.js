"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = exports.Conversation = exports.Session = exports.Message = exports.User = void 0;
const user_entity_1 = require("./user.entity");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_entity_1.User; } });
const message_entity_1 = require("./message.entity");
Object.defineProperty(exports, "Message", { enumerable: true, get: function () { return message_entity_1.Message; } });
const session_entity_1 = require("./session.entity");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_entity_1.Session; } });
const conversation_entity_1 = require("./conversation.entity");
Object.defineProperty(exports, "Conversation", { enumerable: true, get: function () { return conversation_entity_1.Conversation; } });
const review_entity_1 = require("./review.entity");
Object.defineProperty(exports, "Review", { enumerable: true, get: function () { return review_entity_1.Review; } });
const entities = [user_entity_1.User, message_entity_1.Message, session_entity_1.Session, conversation_entity_1.Conversation, review_entity_1.Review,];
exports.default = entities;
//# sourceMappingURL=index.js.map