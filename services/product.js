import axios from "axios";
import {PRODUCTLIST, GET_PRODUCT_DETAILS, GET_PRODUCT_CREATE, GET_PRODUCT_EDIT, GET_PRODUCT_DELETE} from "../utils/constant";
import cookie from "js-cookie";


export class ProductApi {

    static ProductList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${PRODUCTLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getProductDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_PRODUCT_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static ProductEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_PRODUCT_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static ProductCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_PRODUCT_CREATE}`,data,httpOptions)
    }

    static ProductDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_PRODUCT_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }

}
export default ProductApi ;