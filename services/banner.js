import axios from "axios";
import { BANNER_LIST, BANNER_VIEW, BANNER_EDIT, BANNER_CREATE, BANNER_DELETE  } from "../utils/constant";
import cookie from "js-cookie";

export class BannerApi {

    static bannerList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${BANNER_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static bannerViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${BANNER_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static bannerListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${BANNER_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static bannerCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${BANNER_CREATE}`,data,httpOptions)
    }

    static bannerDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${BANNER_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default BannerApi;
