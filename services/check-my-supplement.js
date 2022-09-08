import axios from "axios";
import { CHECK_MY_SUPPLEMENT_GET, CHECK_MY_SUPPLEMENT_EDIT } from "../utils/constant";
import cookie from "js-cookie";

export class CheckMySupplementAPI {

    static checkMySupplementViewDetails() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CHECK_MY_SUPPLEMENT_GET}`,httpOptions)
    }

    static checkMySupplementEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${CHECK_MY_SUPPLEMENT_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

}
export default CheckMySupplementAPI;
