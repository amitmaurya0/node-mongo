"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-unresolved
const express_1 = require("express");
const deployments_1 = __importDefault(require("./deployments"));
exports.default = (0, express_1.Router)({ mergeParams: true })
    .use('/deployments', deployments_1.default);
