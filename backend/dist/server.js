"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const employee_routes_1 = __importDefault(require("./routes/employee.routes"));
let cors = require("cors");
dotenv_1.default.config();
// Creating Server
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use(cors());
// Routes
app.use('/', employee_routes_1.default);
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
