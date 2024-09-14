"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
process.on("uncaughtException", (err) => {
    console.log("Uncaught exception --> Shutting down");
    console.log(err.name, err.message);
    process.exit(1);
});
dotenv_1.default.config({ path: "./config.env" });
const app_1 = __importDefault(require("./app"));
mongoose_1.default
    .connect(process.env.DATABASE_ATLAS)
    .then(() => console.log("DB connection successful!"));
const port = Number(process.env.PORT) || 3000;
const server = app_1.default.listen(port, () => {
    console.log(`App running on port ${port} -> ${process.env.NODE_ENV}`);
});
process.on("unhandledRejection", (err) => {
    console.log("Unhandled rejection --> Shutting down");
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
