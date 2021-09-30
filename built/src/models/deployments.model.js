"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var deploymentSchema = new Schema({
    name: { required: true, type: String },
    deployedAt: String,
    url: String,
    versions: { required: true, type: Array, uniqueItems: true, },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('deployments', deploymentSchema);
