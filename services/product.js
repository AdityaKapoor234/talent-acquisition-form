import axios from "axios";
import { PRODUCTLIST, CREATE_PRODUCT, GET_PHOTO, CONTENTLIST, CONTENT_LIST_EDIT,GET_PRICE,ADD_CLASSIFICTION,GET_CLASSIFICTION,GET_CERTIFICATE,ADD_CERTIFICATE } from "../utils/constant";
import cookie from "js-cookie";


export class ProductApi {

    static ProductList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${PRODUCTLIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static createProduct(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${CREATE_PRODUCT}`, data, httpOptions)
    }

    static getPhoto(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_PHOTO}`.replace('{{id}}', id), httpOptions)
    }

    static updatePhoto(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${GET_PHOTO}`.replace('{{id}}', id), data, httpOptions)
    }

    static ContentList(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CONTENTLIST}`.replace('{{id}}', id), httpOptions)
    }

    static ContentListEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${CONTENT_LIST_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static getPrice(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.get(`${GET_PRICE}`.replace('{{id}}', id),httpOptions)
    }

    static updatePrice(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_PRICE}`.replace('{{id}}',id),data,httpOptions)
    }

    static getCertificate(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.get(`${GET_CERTIFICATE}`.replace('{{id}}',id),httpOptions)
    }

    static addCertificate(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${ADD_CERTIFICATE}`.replace('{{id}}',id),data,httpOptions)
    }

    static addClassifiction(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${ADD_CLASSIFICTION}`.replace('{{id}}',id),data,httpOptions)
    }

    static classifictionList() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.get(`${GET_CLASSIFICTION}`,httpOptions)
    }

    static getClassifiction(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.get(`${ADD_CLASSIFICTION}`.replace('{{id}}',id),httpOptions)
    }


}
export default ProductApi;