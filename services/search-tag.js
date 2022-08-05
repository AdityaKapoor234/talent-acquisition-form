import axios from "axios";
import { SEARCH_TAG_LIST, SEARCH_TAG_EDIT, SEARCH_TAG_CREATE, SEARCH_TAG_DELETE } from "../utils/constant";
import cookie from "js-cookie";

export class SearchTagAPI {

    static searchTagViewList(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SEARCH_TAG_LIST}`.replace('{{id}}', id), httpOptions)
    }

    static searchTagEdit(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${SEARCH_TAG_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static searchTagCreate(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SEARCH_TAG_CREATE}`.replace('{{id}}', id),data,httpOptions)
    }

    static searchTagDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SEARCH_TAG_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default SearchTagAPI;
