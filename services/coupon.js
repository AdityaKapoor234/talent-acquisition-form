import axios from "axios";
import { COUPON_LIST, COUPON_VIEW, COUPON_EDIT, COUPON_CREATE,COUPON_LOG } from "../utils/constant";
import cookie from "js-cookie";

export class CouponApi {

    static couponList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${COUPON_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static couponViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${COUPON_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static couponListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${COUPON_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static couponCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${COUPON_CREATE}`,data,httpOptions)
    }

    static couponLog(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${COUPON_LOG}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

}
export default CouponApi;
