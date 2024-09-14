"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const router = express_1.default.Router();
router.post("/", messageController_1.createMessage);
router.get("/", messageController_1.getMessages);
router.get("/:id", messageController_1.getMessageById);
router.patch("/:id", messageController_1.updateMessage);
router.delete("/:id", messageController_1.deleteMessage);
router.get("/categories/:categoryId/messages", messageController_1.getMessagesByCategory);
exports.default = router;
