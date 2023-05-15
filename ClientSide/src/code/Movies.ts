import axios, { AxiosResponse } from "axios";
import { config } from "./config";

//interface dos movies
export interface IMovie {
    _id?: string, //automatically generated
    name: string,
    description:string,
    imageUrl: string,
}

export class Worker {
    /**
     * Retira da bd todos os filmes
     * @returns array da inferce dos filmes
     */
    public async getMovies(): Promise<IMovie[]>{

        const response:AxiosResponse = await axios.get(`${config.serverAddress}/movies`);

        return response.data;
    }
}