"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(" ")[0];
        this.url = url;
        this.from = `MessageHub <${process.env.EMAIL_FROM}>`;
    }
    newTransport() {
        if (process.env.NODE_ENV === "production") {
            return nodemailer_1.default.createTransport({
                service: "SendGrid",
                auth: {
                    user: process.env.SENDGRID_USERNAME,
                    pass: process.env.SENDGRID_PASSWORD,
                },
            });
        }
        return nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    send(subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: this.from,
                to: this.to,
                subject,
                text: message,
                html: `<p>${message.replace(/\n/g, "<br>")}</p>`,
            };
            yield this.newTransport().sendMail(mailOptions);
        });
    }
    sendWelcome() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = `Hi ${this.firstName},\nWelcome to MessageHub! Click the following link to get started: ${this.url}`;
            yield this.send("Welcome to MessageHub", message);
        });
    }
    sendPasswordReset() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${this.url}.\nIf you did not forget your password, please ignore this email.`;
            yield this.send("Your password reset token (valid for only 10 minutes)", message);
        });
    }
}
exports.default = Email;
