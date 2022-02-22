import axios from "axios";
import {CUSTOMERLIST,GET_CUSTOMER} from "../utils/constant";
import cookie from "js-cookie";


export class CustomerApi {

    static CustomerList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${CUSTOMERLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getCustomerDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_CUSTOMER}`.replace('{{id}}', id),httpOptions)
    }

    static CustomerDetails(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_CUSTOMER}`.replace('{{id}}', id),data,httpOptions)
    }

}
export default CustomerApi ;