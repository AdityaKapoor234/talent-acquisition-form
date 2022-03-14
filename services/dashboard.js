import axios from "axios";
// import { GET_DASHBOARD_ORDER_STATS } from "../utils/constant";
import {GET_DASHBOARD_ORDER_STATS, FLAVORLIST, GET_FLAVOR_DETAILS, GET_FLAVOR_CREATE, GET_FLAVOR_EDIT, GET_FLAVOR_DELETE} from "../utils/constant";
import cookie from "js-cookie";


export class DashboardApi {

    static OrderStats() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        // return axios.get(`http://65.1.17.188:5002/manage/order/stats`, httpOptions)
        return axios.get(`${GET_DASHBOARD_ORDER_STATS}`, httpOptions)
        
        
    }
}

export default DashboardApi;