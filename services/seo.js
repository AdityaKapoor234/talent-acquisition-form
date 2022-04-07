import axios from "axios";
import { SEO } from "../utils/constant";
import cookie from "js-cookie";


export class SeoApi {

    static AddSeo(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${SEO}`.replace('{{id}}', id),data, httpOptions)
    }

    static getSeo(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SEO}`.replace('{{id}}', id), httpOptions)
    }

}
export default SeoApi;