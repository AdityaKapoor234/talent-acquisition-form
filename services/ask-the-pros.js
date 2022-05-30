import axios from "axios";
import {ASKTHEPROSLIST, GET_ASKTHEPROS_DETAILS, GET_ASKTHEPROS_CREATE, GET_ASKTHEPROS_EDIT, GET_ASKTHEPROS_DELETE,GET_EXPERTISE, ASK_THE_PROS_REFFRAL_CODE_LIST, ASK_THE_PROS_CODE_DROPDOWN_LIST, ASK_THE_PROS_REFFRAL_CODE_EDIT, ASK_THE_PROS_REFFRAL_CODE_TOTAL_POINTS} from "../utils/constant";
import cookie from "js-cookie";


export class AskTheProsApi {

    static AskTheProsList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${ASKTHEPROSLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getAskTheProsDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ASKTHEPROS_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static AskTheProsEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_ASKTHEPROS_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static AskTheProsCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_ASKTHEPROS_CREATE}`,data,httpOptions)
    }

    static AskTheProsDelete(id,data) {
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


    static AskTheProsRefferalCodeList(id,page) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${ASK_THE_PROS_REFFRAL_CODE_LIST}`.replace('{{id}}', id).replace('{{page}}', page),httpOptions)
    }

    static AskTheProsRefferalCodeDropdownList() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${ASK_THE_PROS_CODE_DROPDOWN_LIST}`,httpOptions)
    }

    static AskTheProsRefferalCodeEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${ASK_THE_PROS_REFFRAL_CODE_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static AskTheProsRefferalCodeTotalPoints(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${ASK_THE_PROS_REFFRAL_CODE_TOTAL_POINTS}`.replace('{{id}}', id),httpOptions)
    }

}
export default AskTheProsApi ;