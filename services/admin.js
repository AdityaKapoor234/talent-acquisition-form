import axios from "axios";
import { ADMINLIST, GET_ADMIN_DETAILS, ADD_ADMIN, ADMIN_LIST_EDIT } from "../utils/constant";
import cookie from "js-cookie";

export class AdminApi {

    static AdminList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${ADMINLIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getAdminDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ADMIN_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static AdminDetails(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${ADMIN_LIST_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static AdminCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${ADD_ADMIN}`, data, httpOptions)
    }


}
export default AdminApi;
