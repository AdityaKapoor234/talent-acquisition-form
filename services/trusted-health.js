import axios from "axios";
import { TRUSTED_HEALTH_BANNER_GET, TRUSTED_HEALTH_BANNER_EDIT } from "../utils/constant";
import cookie from "js-cookie";

export class TrustedHealthAPI {

    static trustedHealthViewDetails() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TRUSTED_HEALTH_BANNER_GET}`,httpOptions)
    }

    static trustedHealthEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${TRUSTED_HEALTH_BANNER_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

}
export default TrustedHealthAPI;
