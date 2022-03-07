import axios from "axios";
import {ASKTHEPROSLIST, GET_ASKTHEPROS_DETAILS, GET_ASKTHEPROS_CREATE, GET_ASKTHEPROS_EDIT, GET_ASKTHEPROS_DELETE,GET_EXPERTISE} from "../utils/constant";
import cookie from "js-cookie";


export class AskTheProsApi {

    static AskThePropsList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${ASKTHEPROSLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getAskThePropsDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ASKTHEPROS_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static AskThePropsEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_ASKTHEPROS_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static AskThePropsCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_ASKTHEPROS_CREATE}`,data,httpOptions)
    }

    static AskThePropsDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_ASKTHEPROS_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }

    static getExpertise() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.get(`${GET_EXPERTISE}`,httpOptions)
    }


}
export default AskTheProsApi ;