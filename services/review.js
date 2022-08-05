import axios from "axios";
import { REVIEW_LIST, REVIEW_VIEW, REVIEW_EDIT, REVIEW_CREATE, } from "../utils/constant";
import cookie from "js-cookie";

export class ReviewApi {

    static reviewList(id, page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${REVIEW_LIST}`.replace('{{id}}', id).replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static reviewViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${REVIEW_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static reviewListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${REVIEW_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static reviewCreate(id, data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${REVIEW_CREATE}`.replace('{{id}}', id),data,httpOptions)
    }

}
export default ReviewApi;

