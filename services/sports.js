import axios from "axios";
import { SPORTS_LIST, SPORTS_VIEW, SPORTS_EDIT, SPORTS_CREATE, SPORTS_DELETE  } from "../utils/constant";
import cookie from "js-cookie";

export class SportsApi {

    static sportsList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SPORTS_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getSportsViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SPORTS_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static sportsListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${SPORTS_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static sportsCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SPORTS_CREATE}`,data,httpOptions)
    }

    static sportsDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SPORTS_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default SportsApi;
