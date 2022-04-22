import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("annonce-user-token");


// enregistrement d'une note pour une annonce
export const saveOneNote = (datas) => {
    return axios.post(config.api_url + '/api/v1/note/add',datas )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}