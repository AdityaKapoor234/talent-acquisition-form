import axios from "axios";
import { SELLER_LIST, SELLER_VIEW, SELLER_EDIT, SELLER_CREATE, SELLER_DELETE, SELLER_DROPDOWN_ALL, SELLER_ADDRESS_EDIT, SELLER_ADDRESS_CREATE, SELLER_ADDRESS_DELETE } from "../utils/constant";
import cookie from "js-cookie";

export class SellerApi {

    static sellerList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SELLER_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getSellerViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SELLER_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static sellerListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${SELLER_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static sellerCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SELLER_CREATE}`,data,httpOptions)
    }

    static sellerDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SELLER_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }

    static sellerDropdownAllList() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SELLER_DROPDOWN_ALL}`, httpOptions)
    }


    static sellerAddressListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${SELLER_ADDRESS_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static sellerAddressCreate(id, data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SELLER_ADDRESS_CREATE}`.replace('{{id}}', id), data, httpOptions)
    }

    static sellerAddressDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${SELLER_ADDRESS_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default SellerApi;
