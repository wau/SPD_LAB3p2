import axios, { AxiosResponse } from "axios";
import { config } from "./config";

//Interface das reviews
export interface IReview {
    _id?: string, //automatically generated
    userId: string,
    movieId: string,
    description: string,
    rating: number, // 0 to 5
}

export class Worker {
    /**
     * Procurar reviews na base de dados
     * 
     * @param movieId permitir procurar as reviews de um filme especifico
     * @returns uma lista de reviews do tipo IReviews
     */
    public async getReviews(movieId :string): Promise<IReview[]>{
        const response:AxiosResponse = await axios.get(`${config.serverAddress}/reviews/${movieId}`);
        
        return response.data;
    }

    /**
     * Faz uma media de todos os ratings das reviews de um determinado filme
     * @param movieId permitir procurar as reviews de um filme especifico
     * @returns average dos ratings das reviews
     */
    public async averageReviews(movieId :string): Promise<number>{
        const response:AxiosResponse = await axios.get(`${config.serverAddress}/reviews/${movieId}`);
        var average:number=0;
        for (let index = 0; index < response.data.length; index++) {
            average+=response.data[index].rating;
        }
        return average/response.data.length
    }


    /**
     * Adiciona uma review à base de dados
     * @param review review para fazer o post
     * @returns interface da review
     */
    public async postReview(review :IReview): Promise<IReview>{

        const body = {
            description:  review.description,
            rating: review.rating    
        };

        const params_ = {
            params: {
                userId: review.userId
            }
        }

        const response:AxiosResponse = await axios.post(`${config.serverAddress}/reviews/${review.movieId}`, body, params_);
        return response.data;
    }

    /**
     * Edita uma review
     * @param editedReview interface da review já editada
     * @returns interface da review
     */
    public async editReview(editedReview :IReview): Promise<IReview>{

        const body = {
            description:  editedReview.description,
            rating: editedReview.rating    
        };

        const params_ = {
            params: {
                userId: editedReview.userId
            }
        }

        const response:AxiosResponse = await axios.put(`${config.serverAddress}/reviews/${editedReview.movieId}`, body, params_);
        
        return response.data;
    }

    /**
     * Remove uma review 
     * @param movieId para saber qual o filme que queremos eliminar uma review
     * @param userId para saber as reviews do utilizador no filme
     * @returns mensagem para saber se ocorreu o delete
     */
    public async deleteReview(movieId :string, userId :string): Promise<string>{
        const params_ = {
            params: {
                userId: userId
            }
        }

        const response:AxiosResponse = await axios.delete(`${config.serverAddress}/reviews/${movieId}`, params_);
        
        return response.data;
    }
}