import axios from "axios";
import { DIET_LIST, DIET_VIEW, DIET_EDIT, DIET_CREATE, DIET_DELETE  } from "../utils/constant";
import cookie from "js-cookie";

export class DietApi {

    static dietList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${DIET_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getDietViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${DIET_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static dietListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${DIET_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static dietCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${DIET_CREATE}`,data,httpOptions)
    }

    static dietDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${DIET_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default DietApi;
