import axios from "axios";
import {FLAVORLIST, GET_FLAVOR_DETAILS, GET_FLAVOR_CREATE, GET_FLAVOR_EDIT, GET_FLAVOR_DELETE} from "../utils/constant";
import cookie from "js-cookie";


export class FlavorApi {

    static FlavorList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${FLAVORLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getFlavorDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_FLAVOR_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static FlavorEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_FLAVOR_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static FlavorCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_FLAVOR_CREATE}`,data,httpOptions)
    }

    static FlavorDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_FLAVOR_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
    

}
export default FlavorApi ;