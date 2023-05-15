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
            filename: path.join(__dirname, "reviews.db"),
            autoload: true
        });
    }
    // Tal como o nodemail o NeDB nao providencia uma API com bases async/await, como tal teremos de o envolver numa promise
    getReviews(_movieId) {
        return new Promise((inResolve, inReject) => {
            this.db.find({ movieId: _movieId }, (inError, inDocs) => {
                if (inError) { // e tal como no nodemailer ou rejetamos a promise ou retornamos um array de documentos que contem os nossos objetos
                    inReject(inError);
                }
                else {
                    inResolve(inDocs);
                }
            });
        });
    }
    addReview(review) {
        return new Promise((inResolve, inReject) => {
            this.db.insert(review, (inError, inNewDoc) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve(inNewDoc);
                }
            });
        });
    }
    editReview(review) {
        return new Promise((inResolve, inReject) => {
            this.db.update({ userId: review.userId,
                movieId: review.movieId,
            }, review, {}, (inError, numReplaced) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    if (numReplaced >= 1)
                        inResolve();
                    else
                        inReject(inError);
                }
            });
        });
    }
    deleteReview(userId, movieId) {
        return new Promise((inResolve, inReject) => {
            this.db.remove({ userId: userId,
                movieId: movieId,
            }, {}, (inError, numReplaced) => {
                if (inError) {
                    inReject(inError);
                }
                else {
                    inResolve();
                }
            });
        });
    }
}
exports.Worker = Worker;
