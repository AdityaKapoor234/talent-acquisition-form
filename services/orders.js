import axios from "axios";
import { ORDERSLIST, GET_ORDER_DETAILS, ADD_ORDER_STATUS, CANCEL, GET_ORDER_INVOICE, GET_ORDER_INVOICE_PRIME, GET_ORDER_GIFT_DETAILS } from "../utils/constant";
import cookie from "js-cookie";

export class OrderApi {

    static OrderList(page, search, latest) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${ORDERSLIST}`.replace('{{page}}', page).replace('{{search}}', search).replace('{{latest}}', latest), httpOptions)
    }

    static getOrderDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ORDER_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static AddOrder(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${ADD_ORDER_STATUS}`.replace('{{id}}', id),data, httpOptions)
    }

    static CancelList(page, search ) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CANCEL}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getOrderInvoice(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ORDER_INVOICE}`.replace('{{id}}', id),httpOptions)
    }

    static getOrderInvoicePrime(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ORDER_INVOICE_PRIME}`.replace('{{id}}', id),httpOptions)
    }

    static getOrderGiftDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ORDER_GIFT_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

}
export default OrderApi;
