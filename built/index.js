"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const src_1 = __importDefault(require("./src"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const PORT = 8000;
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)({ credentials: true, origin: true }));
(0, src_1.default)(app);
mongoose_1.default.connect(database_1.default.mongoUrl, function (err) {
    if (err) {
        console.log('Unable to connect the database.');
    }
    else {
        console.log('DB connected succesfully.');
        app.listen(PORT, () => {
            console.log(`Server Running here 👉 https://localhost:${PORT}`);
        });
    }
});
