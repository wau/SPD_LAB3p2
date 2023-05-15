//Importação de módulos
import path from "path";
import express,{Express, NextFunction, Request, Response } from "express";

//Importação de módulos de aplicação

import * as Users from "./users";
import {IUser} from "./users";

import * as Movies from "./movies";
import {IMovie} from "./movies";

import * as Reviews from "./reviews";
import {IReview} from "./reviews";


//Criação de uma express APP, assim como, de uma middleware que a torne útil

//app.use() function is used to mount the specified middleware function(s) at the path which is being specified
//adiciona middleware/funcionalidades, neste caso adiciona a funcao json() ao express
const app : Express = express() ;
app.use(express.json());

//CORS é um mecanismo de segurança presente nos browsers que garante que apenas certos dominios possam ser chamandos nos servissos REST.


//endpoint "/"
//express.static() - serve para fornecer os recursos estaticos (html, images, CSS files, and JavaScript files, etc.)
//path.join() - junta os dois argumentos e poe normal o resultado do caminho para irmos buscar um ficheiro estatico a nossa maquina
//__dirname - e o caminho da pasta atual
app.use("/", express.static(path.join (__dirname, "../../ClientSide/dist")));

//esta funcao adiciona os headers necessarios a resposta
//inNext() - passa a proxima funcao que esta em stack do middleware
app.use(function(inRequest: Request, inResponse: Response, inNext : NextFunction ) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    inNext();
});


app.post("/users", async ( inRequest : Request , inResponse : Response ) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker() ;
        const userAdded :IUser =  await usersWorker.addUser(inRequest.body);
        inResponse.json(userAdded); 
    } catch (inError) {
        inResponse.send("error") ;
    }
});



app.get("/users/login", async (inRequest: Request ,inResponse: Response ) => {
    try {
        const usersWorker: Users.Worker = new Users.Worker();
    
        const email :string = inRequest.query.email as string;
        const password :string = inRequest.query.password as string;

        const login :Users.IUser = await usersWorker.tryLogin(email, password);

        inResponse.send(login);

    } catch (inError) {
        inResponse.send("error");
    }
});

//correct
app.post("/movies", async ( inRequest : Request , inResponse : Response ) => {
    try {
        const mvoiesWorker: Movies.Worker = new Movies.Worker() ;
        const movieAdded :IMovie =  await mvoiesWorker.addMovie(inRequest.body);
        inResponse.json(movieAdded); 
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.get("/movies", async ( inRequest : Request , inResponse : Response ) => {
    try {
        const mvoiesWorker: Movies.Worker = new Movies.Worker() ;
        const movies :IMovie[] =  await mvoiesWorker.getMovies();
        inResponse.json(movies); 
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.get("/users/:userId", async (inRequest: Request,inResponse:Response) => {
    try{
        const usersWorker: Users.Worker = new Users.Worker();

        const userId :string = inRequest.params.userId;
       
        const user :IUser =await usersWorker.getUser(userId);

        inResponse.json(user);
    }
    catch(inError){
        inResponse.send("error");
    }
});

app.get("/reviews/:movieId", async ( inRequest : Request , inResponse : Response ) => {
    try {
        const rWorker: Reviews.Worker = new Reviews.Worker();

        const movieId :string = inRequest.params.movieId;
        
        const reviews :IReview[] = await rWorker.getReviews(movieId);


        inResponse.json(reviews);
        
    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.post("/reviews/:movieId", async ( inRequest : Request , inResponse : Response ) => {
    try {
        const rWorker: Reviews.Worker = new Reviews.Worker();
        const reviewToSend :IReview = inRequest.body;
        reviewToSend.userId = inRequest.query.userId as string;

        reviewToSend.movieId = inRequest.params.movieId;
        const reviewAdded :IReview = await rWorker.addReview(reviewToSend);

        inResponse.json(reviewAdded);
        
    } catch (inError) {
        inResponse.send("error") ;
    }
});


//not finished
app.put("/reviews/:movieId", async ( inRequest : Request , inResponse : Response ) => {
    try {
        const rWorker: Reviews.Worker = new Reviews.Worker();
        const reviewToSend :IReview = inRequest.body;
        reviewToSend.userId = inRequest.query.userId as string;

        reviewToSend.userId.replace(/(\r\n|\n|\r)/gm, ""); //remove \n of the string

        reviewToSend.movieId = inRequest.params.movieId;
        await rWorker.editReview(reviewToSend);
        inResponse.json(reviewToSend); 

    } catch (inError) {
        inResponse.send("error") ;
    }
});

app.delete("/reviews/:movieId", async ( inRequest : Request , inResponse : Response ) => {
    try {
        const rWorker: Reviews.Worker = new Reviews.Worker();
        let userId :string = inRequest.query.userId as string;

        const movieId :string = inRequest.params.movieId;

        userId = userId.replace(/(\r\n|\n|\r)/gm, "");

        await rWorker.deleteReview(userId, movieId); 
        inResponse.send("ok");
    } catch (inError) {
        inResponse.send("error") ;
    }
});


var server = app.listen(8080, () => console.log("server running"));

//server.close();
