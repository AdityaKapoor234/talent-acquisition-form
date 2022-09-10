import axios from "axios";
import { SHIPPING_CHARGES_GET, SHIPPING_CHARGES_EDIT } from "../utils/constant";
import cookie from "js-cookie";

export class ShippingChargesAPI {

    static shippingChargesViewDetails() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SHIPPING_CHARGES_GET}`,httpOptions)
    }

    static shippingChargesEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${SHIPPING_CHARGES_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

}
export default ShippingChargesAPI;
