import axios from "axios";
import { ORDERSLIST, GET_ORDER_DETAILS } from "../utils/constant";
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


}
export default OrderApi;
