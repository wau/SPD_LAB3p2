// Library imports.
import axios, { AxiosResponse } from "axios";

// App imports.
import { config } from "./config";
/**
 * Interface do User
 */
export interface IUser {
    _id?: string, //automatically generated
    name: string,
    email: string,
    password: string,
}


// The worker that will perform user operations.
export class Worker {
    
    /**
     * Esta função serve para verificar se um user existe na base de dados(ou seja se já fez register)
     * 
     * @param email email a ser pesquisado na bd
     * @param password password a ser pesquisado na bd
     * @returns uma promise do tipo IUser 
     */
    public async tryLogin(email: string, password: string): Promise<IUser> {

        const request = {
            params: {
                email: email,
                password: password
            }
        }

        const response: AxiosResponse = await axios.get(`${config.serverAddress}/users/login`, request);

        return response.data;
    }

    /**
     * Cria um user na bd
     * 
     * @param user user a ser inserido na bd
     * @returns user criado
     */

    public async tryRegister(user: IUser): Promise<IUser> {

        const request = {
            
            name: user.name,
            email: user.email,
            password: user.password
        
        }

        const response: AxiosResponse = await axios.post(`${config.serverAddress}/users`, request)

        return response.data;
    }

    /**
     * Procurar um user
     * 
     * @param userId userId permitindo procurar o user na bd
     * @returns user do tipo IUser
     */
    public async getUser(userId :string): Promise<IUser> {

        const response: AxiosResponse = await axios.get(`${config.serverAddress}/users/${userId}`);
        return response.data;
    }
} /* End class. */