import axios from "axios";
import { GET_CATEGORY_INFO,GET_BRAND_INFO,GET_FLAVOR_INFO,GET_CERTIFICATION,GET_INFO } from "../utils/constant";
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

}
export default productInfoApi;