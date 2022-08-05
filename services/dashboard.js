import axios from "axios";
import {GET_DASHBOARD_ORDER_STATS, GET_DASHBOARD_ORDER_PAYMENT_STATS, GET_DASHBOARD_TOP_SEARCH_TERMS, GET_DASHBOARD_SALES_TREND, GET_DASHBOARD_TOP_SOLD,} from "../utils/constant";
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
        return axios.get(`${GET_DASHBOARD_ORDER_STATS}`, httpOptions)
    }
    static OrderPaymentStats() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_DASHBOARD_ORDER_PAYMENT_STATS}`, httpOptions)
    }
    static TopSearchTerms() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_DASHBOARD_TOP_SEARCH_TERMS}`, httpOptions)
    }
    static SalesTrendGraph() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_DASHBOARD_SALES_TREND}`, httpOptions)
    }
    static TopSoldProductGraph() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_DASHBOARD_TOP_SOLD}`, httpOptions)
    }

    
}

export default DashboardApi;