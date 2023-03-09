import axios from "axios";
import {BULK_EDIT_PRODUCT,UPDATE_PRICE } from "../utils/constant";
import cookie from "js-cookie";



export class BulkEditProductApi {

    static BulkEditProductList(page, search, filter) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${BULK_EDIT_PRODUCT}`.replace('{{page}}', page).replace('{{search}}', search).replace('{{filter}}', filter), httpOptions)
    }

    static updatePrice(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${UPDATE_PRICE}`.replace('{{id}}',id),data,httpOptions)
    }
}