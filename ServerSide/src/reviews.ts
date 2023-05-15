import * as path from "path";
const Datastore = require("nedb");


export interface IReview {
    _id?: string, //automatically generated
    userId: string,
    movieId: string,
    description: string,
    rating: number, // 0 to 5
}

// Um objeto do tipo NeDB Datastore, que será criado, bem como o path para a contacts.db.
// A Nedb carrega o ficheiro aotumaticamente caso ainda não exista é criado.
export class Worker {
    private db: Nedb;
    constructor() { 
        this.db = new Datastore({
            filename: path.join(__dirname, "reviews.db"),
            autoload: true
        });
    }

    // Tal como o nodemail o NeDB nao providencia uma API com bases async/await, como tal teremos de o envolver numa promise
    public getReviews(_movieId :string): Promise<IReview[]> {
        return new Promise((inResolve, inReject) => {
            this.db.find(
                {movieId: _movieId},
                (inError: Error | null, inDocs: IReview[]) => { // visto que sabe,os que os objetos que serao retornados sao do tipo IContact podemos usar como argumento o inDcos
                    if (inError) { // e tal como no nodemailer ou rejetamos a promise ou retornamos um array de documentos que contem os nossos objetos
                   
                        inReject(inError);
                    } else {
                    
                        inResolve(inDocs);
                    }
                }
            );
        });

    }

    public addReview(review: IReview): Promise<IReview> { // inContact como primeiro argumento
        return new Promise((inResolve, inReject) => { // este método passa o objeto adicionaodo para a callback que irºa possuir um campo _id, sendo esse obejto rentornado caller e ao client, de maneira a aparecer no ecrã
            this.db.insert(review,
                (inError: Error | null, inNewDoc: IReview) => {
                    if (inError) {
                        
                        inReject(inError);
                    } else {
                        
                        inResolve(inNewDoc);
                    }
                }
            );
        });
    }

    public editReview(review: IReview): Promise<void> {
        return new Promise((inResolve, inReject) => { // este método passa o objeto adicionaodo para a callback que irºa possuir um campo _id, sendo esse obejto rentornado caller e ao client, de maneira a aparecer no ecrã
            this.db.update(
                {userId: review.userId,
                 movieId: review.movieId,
                },
                review,
                {},
                (inError: Error | null, numReplaced :number) => {
                    if (inError) {
                       
                        inReject(inError);
                    } else {
            
                        if (numReplaced >= 1)
                            inResolve();
                        else inReject(inError);
                    }
                }
            );
        });
    }

    public deleteReview(userId :string, movieId :string): Promise<void> {

  
        return new Promise((inResolve, inReject) => { // este método passa o objeto adicionaodo para a callback que irºa possuir um campo _id, sendo esse obejto rentornado caller e ao client, de maneira a aparecer no ecrã
            this.db.remove(
                {userId: userId,
                 movieId: movieId,
                },
                {},
                (inError: Error | null, numReplaced :number) => {
                    if (inError) {
                        inReject(inError);
                    } else {
                       
                        inResolve();
                    }
                }
            );
        });
    }
}