import axios from "axios";
import { GET_CATEGORY_INFO,GET_BRAND_INFO,GET_FLAVOR_INFO,GET_CERTIFICATION,GET_INFO,GET_COUNTRY, SOFT_DELETE_PRODUCT} from "../utils/constant";
import cookie from "js-cookie";


export class productInfoApi {

    static getCategory() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_CATEGORY_INFO}`, httpOptions)
    }

    static getBrand() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_BRAND_INFO}`, httpOptions)
    }

    static getFlavor() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_FLAVOR_INFO}`, httpOptions)
    }

    static getCertification() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_CERTIFICATION}`, httpOptions)
    }

    static getInfo(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_INFO}`.replace('{{id}}', id), httpOptions)
    }

    static UpdateInfo(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${GET_INFO}`.replace('{{id}}', id),data,httpOptions)
    }

    static country(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_COUNTRY}`,httpOptions)
    }

    static updateVariant(id,type,product_id, value) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${GET_INFO}`.replace('{{id}}', id).replace('{{type}}', type),{
            'product_id': product_id,
            'value': value
        },httpOptions)
    }

    static productSoftDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
                // 'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTQ2ODA2NzcsImlhdCI6MTY2MzE0NDY3NywidXNlcl9pZCI6NX0.gRmgDpk1HguMv6QxAWk3CT3fe0Xf8nqFLQwpUNQjcFM`
            }
        };
        return axios.post(`${SOFT_DELETE_PRODUCT}`.replace('{{id}}', id),data,httpOptions)
    }
    
}
export default productInfoApi;