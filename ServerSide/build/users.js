"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const path = __importStar(require("path"));
const Datastore = require("nedb");
// Um objeto do tipo NeDB Datastore, que será criado, bem como o path para a contacts.db.
// A Nedb carrega o ficheiro aotumaticamente caso ainda não exista é criado.
class Worker {
    constructor() {
        this.db = new Datastore({
            filename: path.join(__dirname, "users.db"),
            autoload: true
        });
    }
    addUser(user) {
        return new Promise((inResolve, inReject) => {
            this.db.insert(user, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    }
    getUser(userId) {
        return new Promise((inResolve, inReject) => {
            this.db.find({
                _id: userId,
            }, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    -inResolve(inNewDoc[0]);
                }
            });
        });
    }
    tryLogin(email, password) {
        return new Promise((inResolve, inReject) => {
            this.db.find({ email: email,
                password: password }, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    if (inNewDoc[0] != undefined) {
                        inResolve(inNewDoc[0]);
                    }
                    inReject(inError);
                }
            });
        });
    }
}
exports.Worker = Worker;
