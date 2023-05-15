import * as path from "path";
const Datastore = require("nedb");

//IUser é uma interface que descreve um contacto e que é necessária para adicionar, listar e eleiminar operações de contactos.
//Quando se adiciona um contacto, caso não seja identificado um id, o NeDB irá associar um id automaticamente.
export interface IUser {
    _id?: string, //automatically generated
    name: string,
    email: string,
    password: string,
}


// Um objeto do tipo NeDB Datastore, que será criado, bem como o path para a contacts.db.
// A Nedb carrega o ficheiro aotumaticamente caso ainda não exista é criado.
export class Worker {
    private db: Nedb;
    constructor() { 
        this.db = new Datastore({
            filename: path.join(__dirname, "users.db"),
            autoload: true
        });
    }
   

    public addUser(user: IUser): Promise<IUser> { 
        return new Promise((inResolve, inReject) => { 
            this.db.insert(user,
                (inError: Error | null, inNewDoc: IUser) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public getUser(userId :string): Promise<IUser> { 
        return new Promise((inResolve, inReject) => { 
            this.db.find(
                {
                    _id: userId,
                },
                (inError: Error | null, inNewDoc: IUser[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {-
                        inResolve(inNewDoc[0]);
                    }
                }
            );
        });
    }


    public tryLogin(email :string, password :string): Promise<IUser> { 
        return new Promise((inResolve, inReject) => { 
            this.db.find(
                { email: email, 
                  password: password},
                (inError: Error | null, inNewDoc: IUser[]) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                        if (inNewDoc[0] != undefined) {
                    
                            inResolve(inNewDoc[0]);
                        }
                        inReject(inError);
                    }
                }
            );
        });
    }

    
}