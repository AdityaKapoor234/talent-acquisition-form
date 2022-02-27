import axios from "axios";
import {BRANDSLIST, GET_BRANDS_DETAILS, GET_BRANDS_CREATE, GET_BRANDS_EDIT, GET_BRANDS_DELETE} from "../utils/constant";
import cookie from "js-cookie";


export class BrandsApi {

    static BrandsList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${BRANDSLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getBrandsDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_BRANDS_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static BrandsEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_BRANDS_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static BrandsCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_BRANDS_CREATE}`,data,httpOptions)
    }

    static BrandsDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_BRANDS_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }

}
export default BrandsApi ;