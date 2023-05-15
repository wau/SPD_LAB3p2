import * as path from "path";
const Datastore = require("nedb");


export interface IMovie {
    _id?: string, //automatically generated
    name: string,
<<<<<<< HEAD:DAW/LABFINAL/server/src/movies.ts
    description :string,
=======
    description:string,
>>>>>>> 4e1dc40ef5de1761da5ca3b04a47a8716e9cd817:DAW/DAW/LABFINALDAW/ServerSide/src/movies.ts
    imageUrl: string,
}


// Um objeto do tipo NeDB Datastore, que será criado, bem como o path para a contacts.db.
// A Nedb carrega o ficheiro aotumaticamente caso ainda não exista é criado.
export class Worker {
    private db: Nedb;
    constructor() { 
        this.db = new Datastore({
            filename: path.join(__dirname, "movies.db"),
            autoload: true
        });
    }

    // Tal como o nodemail o NeDB nao providencia uma API com bases async/await, como tal teremos de o envolver numa promise
    public getMovies(): Promise<IMovie[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find({}, // é chamado dentro da promise o método find() na DataStore no qual o resultado que será retornado
                             // é o de todos e os dados em cantacts.db (que reresenta todos os contactos)
                (inError: Error | null, inDocs: IMovie[]) => { // visto que sabe,os que os objetos que serao retornados sao do tipo IContact podemos usar como argumento o inDcos
                    if (inError) { // e tal como no nodemailer ou rejetamos a promise ou retornamos um array de documentos que contem os nossos objetos
                       
                        inReject(inError);
                    } else {
                        
                        inResolve(inDocs);
                    }
                }
            );
        });

    }

    public addMovie(movie: IMovie): Promise<IMovie> { // inContact como primeiro argumento
        return new Promise((inResolve, inReject) => { // este método passa o objeto adicionaodo para a callback que irºa possuir um campo _id, sendo esse obejto rentornado caller e ao client, de maneira a aparecer no ecrã
            this.db.insert(movie,
                (inError: Error | null, inNewDoc: IMovie) => {
                    if (inError) {
                        
                        inReject(inError);
                    } else {
                        
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }
}