import axios from "axios";
import { GST_LIST, GST_VIEW, GST_EDIT, GST_CREATE, GST_DROPDOWN, } from "../utils/constant";
import cookie from "js-cookie";

export class GstApi {

    static gstList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GST_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static gstViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GST_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static gstHsnCodeDropdownDetails() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GST_DROPDOWN}`, httpOptions)
    }

    static gstListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${GST_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static gstCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GST_CREATE}`,data,httpOptions)
    }

}
export default GstApi;
