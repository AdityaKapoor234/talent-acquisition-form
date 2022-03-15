import axios from "axios";
import { ORDERSLIST } from "../utils/constant";
import cookie from "js-cookie";

export class OrderApi {

    static OrderList(page, latest) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${ORDERSLIST}`.replace('{{page}}', page).replace('{{latest}}', latest), httpOptions)
    }

}
export default OrderApi;
