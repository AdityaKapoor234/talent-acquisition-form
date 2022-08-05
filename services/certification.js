import axios from "axios";
import { CERTIFICATION_LIST, CERTIFICATION_VIEW, CERTIFICATION_EDIT, CERTIFICATION_CREATE  } from "../utils/constant";
import cookie from "js-cookie";

export class CertificationApi {

    static certificationList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CERTIFICATION_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static certificationViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CERTIFICATION_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static certificationListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${CERTIFICATION_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static certificationCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${CERTIFICATION_CREATE}`,data,httpOptions)
    }

}
export default CertificationApi;
