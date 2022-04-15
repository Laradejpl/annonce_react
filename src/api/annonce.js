import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("annonce-user-token");



// enregistrement d'une annonce
export const saveOneAds = (datas) => {
    return axios.post(config.api_url + "/api/v1/ads/add", datas, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
          
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}


// avoir les annonces par user
export const getAllAdsByUser = (user_id) => {
    return axios.get(config.api_url + "/api/v1/allads/" + user_id, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
          
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}
// avoir la derniere annonce par user
export const getLastAdsByUser = (user_id) => {
    return axios.get(config.api_url + "/api/v1/lastads/" + user_id, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

//update des images
export const updateImages = (datas) => {
    return axios.put(config.api_url + "/api/v1/ads/update/images" + datas, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }


//avoir une annonce par id
export const getOneAnnonce = (id) => {
    return axios.get(config.api_url + "/api/v1/ads/one/" + id, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
          
        }
        )
        .catch(error => {
            return error;
        }
        );
    
}

//update de l'annonce
export const updateAnnonce = (datas, id) => {
    return axios.post(config.api_url + '/api/v1/ads/update/'+id, datas, {headers: {"x-access-token": token}} )
        .then(response => {
            return response.data;
        }
        )
        .catch(error => {
            return error;
        }
        );
    }

    // nombre danonce total 
    export const getNbAds = () => {
        return axios.get(config.api_url + "/api/v1/totalads")
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    //nombre d'annonce par categorie
    export const getNbAdsByCat = (category) => {
        return axios.get(config.api_url + "/api/v1/nbrads/category/" + category)
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }

    //avoir toute les annonces par category
    export const getAllAdsByCat = (category) => {
        return axios.get(config.api_url + "/api/v1/allads/category" + category )
            .then(response => {
                return response.data;
              
            }
            )
            .catch(error => {
                return error;
            }
            );
        
    }




