import axios from "axios";
import { DEALS_LIST, DEALS_VIEW, DEALS_EDIT, DEALS_CREATE, DEALS_DELETE  } from "../utils/constant";
import cookie from "js-cookie";

export class DealsApi {

    static dealsList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${DEALS_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static dealsViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${DEALS_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static dealsListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${DEALS_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static dealsCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${DEALS_CREATE}`,data,httpOptions)
    }

    static dealsDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${DEALS_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default DealsApi;
