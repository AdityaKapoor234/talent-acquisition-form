import axios from "axios";
import {CUSTOMER_ADDRESS_EDIT, CUSTOMER_ADDRESS_ADD} from "../utils/constant";
import cookie from "js-cookie";


export class AddressApi {

    static CustomerAddressEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${CUSTOMER_ADDRESS_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static CustomerAddressCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${CUSTOMER_ADDRESS_ADD}`,data,httpOptions)
    }

}
export default AddressApi ;