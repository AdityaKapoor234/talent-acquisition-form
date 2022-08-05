import axios from "axios";
import {CATEGORYLIST, GET_CATEGORY_DETAILS, GET_CATEGORY_CREATE, GET_CATEGORY_EDIT, GET_CATEGORY_DELETE,GET_BANNER_URL,GET_PARENT_CATEGORY} from "../utils/constant";
import cookie from "js-cookie";


export class CategoryApi {

    static CategoryList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${CATEGORYLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getCategoryDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_CATEGORY_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static CategoryEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_CATEGORY_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static CategoryCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_CATEGORY_CREATE}`,data,httpOptions)
    }

    static CategoryDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}`          
            }
        };
        return axios.post(`${GET_CATEGORY_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }

    static getParentCategory() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',     
                'Authorization': `Bearer ${token}`      
            }
        };
        return axios.get(`${GET_PARENT_CATEGORY}`,httpOptions)
    }

}
export default CategoryApi ;