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
//Importação de módulos
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
//Importação de módulos de aplicação
const Users = __importStar(require("./users"));
const Movies = __importStar(require("./movies"));
const Reviews = __importStar(require("./reviews"));
//Criação de uma express APP, assim como, de uma middleware que a torne útil
//app.use() function is used to mount the specified middleware function(s) at the path which is being specified
//adiciona middleware/funcionalidades, neste caso adiciona a funcao json() ao express
const app = (0, express_1.default)();
app.use(express_1.default.json());
//CORS é um mecanismo de segurança presente nos browsers que garante que apenas certos dominios possam ser chamandos nos servissos REST.
//endpoint "/"
//express.static() - serve para fornecer os recursos estaticos (html, images, CSS files, and JavaScript files, etc.)
//path.join() - junta os dois argumentos e poe normal o resultado do caminho para irmos buscar um ficheiro estatico a nossa maquina
//__dirname - e o caminho da pasta atual
app.use("/", express_1.default.static(path_1.default.join(__dirname, "../../ClientSide/dist")));
//esta funcao adiciona os headers necessarios a resposta
//inNext() - passa a proxima funcao que esta em stack do middleware
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});
app.post("/users", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        const userAdded = yield usersWorker.addUser(inRequest.body);
        inResponse.json(userAdded);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.get("/users/login", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        const email = inRequest.query.email;
        const password = inRequest.query.password;
        const login = yield usersWorker.tryLogin(email, password);
        inResponse.send(login);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//correct
app.post("/movies", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mvoiesWorker = new Movies.Worker();
        const movieAdded = yield mvoiesWorker.addMovie(inRequest.body);
        inResponse.json(movieAdded);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.get("/movies", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mvoiesWorker = new Movies.Worker();
        const movies = yield mvoiesWorker.getMovies();
        inResponse.json(movies);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
<<<<<<< HEAD:DAW/LABFINAL/server/build/main.js
app.get("/reviews/:movieId", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rWorker = new Reviews.Worker();
        const reviewToSend = inRequest.body;
        //        reviewToSend.userId = inRequest.query.userId as string;
        const movieId = inRequest.params.movieId;
        reviewToSend.movieId = inRequest.params.movieId;
=======
app.get("/users/:userId", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersWorker = new Users.Worker();
        const userId = inRequest.params.userId;
        const user = yield usersWorker.getUser(userId);
        inResponse.json(user);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.get("/reviews/:movieId", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rWorker = new Reviews.Worker();
        const movieId = inRequest.params.movieId;
>>>>>>> 4e1dc40ef5de1761da5ca3b04a47a8716e9cd817:DAW/DAW/LABFINALDAW/ServerSide/build/main.js
        const reviews = yield rWorker.getReviews(movieId);
        inResponse.json(reviews);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.post("/reviews/:movieId", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rWorker = new Reviews.Worker();
        const reviewToSend = inRequest.body;
        reviewToSend.userId = inRequest.query.userId;
        reviewToSend.movieId = inRequest.params.movieId;
        const reviewAdded = yield rWorker.addReview(reviewToSend);
        inResponse.json(reviewAdded);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
//not finished
app.put("/reviews/:movieId", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rWorker = new Reviews.Worker();
        const reviewToSend = inRequest.body;
        reviewToSend.userId = inRequest.query.userId;
<<<<<<< HEAD:DAW/LABFINAL/server/build/main.js
        reviewToSend.userId.replace(/[\r\n]/gm, ''); //remove \n of the string
        reviewToSend.movieId = inRequest.params.movieId;
        //console.log(reviewToSend.userId);
        console.log(reviewToSend);
        yield rWorker.editReview(reviewToSend);
        inResponse.json(reviewToSend);
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.delete("/reviews/:movieId", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rWorker = new Reviews.Worker();
        let userId = inRequest.query.userId;
        const movieId = inRequest.params.movieId;
        userId = userId.replace(/(\r\n|\n|\r)/gm, "");
        //console.log(userId, movieId);
        yield rWorker.deleteReview(userId, movieId);
        inResponse.send("ok");
=======
        reviewToSend.userId.replace(/(\r\n|\n|\r)/gm, ""); //remove \n of the string
        reviewToSend.movieId = inRequest.params.movieId;
        yield rWorker.editReview(reviewToSend);
        inResponse.json(reviewToSend);
>>>>>>> 4e1dc40ef5de1761da5ca3b04a47a8716e9cd817:DAW/DAW/LABFINALDAW/ServerSide/build/main.js
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
app.delete("/reviews/:movieId", (inRequest, inResponse) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rWorker = new Reviews.Worker();
        let userId = inRequest.query.userId;
        const movieId = inRequest.params.movieId;
        userId = userId.replace(/(\r\n|\n|\r)/gm, "");
        yield rWorker.deleteReview(userId, movieId);
        inResponse.send("ok");
    }
    catch (inError) {
        inResponse.send("error");
    }
}));
var server = app.listen(8080, () => console.log("server running"));
//server.close();
