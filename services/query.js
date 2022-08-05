import axios from "axios";
import { QUERYLIST, GET_QUERY } from "../utils/constant";
import cookie from "js-cookie";

export class QueryApi {

    static QueryList(page, latest) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${QUERYLIST}`.replace('{{page}}', page).replace('{{latest}}', latest), httpOptions)
    }

    static getQueryDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_QUERY}`.replace('{{id}}', id),httpOptions)
    }


}
export default QueryApi;
