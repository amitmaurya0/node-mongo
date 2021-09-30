"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const deployments_model_1 = __importDefault(require("../../models/deployments.model"));
const routes = (0, express_1.Router)({ mergeParams: true })
    .get('/', getDeployments)
    .post('/', createDeployments)
    .delete('/:id', deleteDeployments);
function validateUrl(value) {
    return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value);
}
function todaysDate() {
    const dateObj = new Date();
    const month = dateObj.getMonth() + 1;
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = `${day}-${month}-${year}`;
    return output;
}
async function getDeployments(req, res) {
    try {
        deployments_model_1.default.find({}, function (err, data) {
            if (data) {
                res.json({ status: true, data: data });
            }
            else {
                res.json({ status: false, msg: 'Unable to fetch the deplyments.' });
            }
        }).select({ _id: 1, name: 1, url: 1, deployedAt: 1, versions: 1 }).sort({ createdAt: -1 });
    }
    catch (error) {
        res.json({ status: false, msg: "Something went wrong. Please try after sometime." });
    }
}
async function createDeployments(req, res) {
    try {
        let input = req.body;
        if (input.name == '') {
            res.json({ status: false, msg: "Please provide a deployment name." });
            return;
        }
        const regex = `^([1-9]\d*|0)(\.(([1-9]\d*)|0)){2}$`;
        const found = input.version.match(regex);
        if (input.version == '' || found == null) {
            res.json({ status: false, msg: "Please enter a deployment version" });
            return;
        }
        if (input.url != '') {
            const isValidUrl = validateUrl(input.url);
            if (!isValidUrl) {
                res.json({ status: false, msg: "Please enter a valid url." });
                return;
            }
        }
        let newDeployments = new deployments_model_1.default({
            name: input.name,
            url: input.url,
            deployedAt: todaysDate(),
            versions: [input.version],
        });
        newDeployments.save(function (err) {
            if (err) {
                res.json({ status: false, msg: "Unable to create new deployment. Please try after sometime." });
            }
            else {
                res.json({ status: true, msg: "New deployment created successfully." });
            }
        });
    }
    catch (error) {
        res.json({ status: false, msg: "Something went wrong. Please try after sometime." });
    }
}
async function deleteDeployments(req, res) {
    try {
        const id = req.params.id;
        deployments_model_1.default.deleteOne({ id: Object(id) }, function (err) {
            if (err) {
                res.json({ status: false, msg: "Unable to delete deplyment." });
            }
            else {
                res.json({ status: true, msg: "Deplyment deleted successfully." });
            }
        });
    }
    catch (error) {
        res.json({ status: false, msg: "Something went wrong. Please try after sometime." });
    }
}
exports.default = routes;
