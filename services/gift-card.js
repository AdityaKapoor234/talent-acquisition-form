import axios from "axios";
import { GET_CUSTOMER_GIFT_CARD_REDEEM, GET_CUSTOMER_GIFT_CARD_SEND } from "../utils/constant";
import cookie from "js-cookie";


export class GiftCardApi {

    static giftCardRedeem(id, page) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_CUSTOMER_GIFT_CARD_REDEEM}`.replace('{{id}}', id).replace('{{page}}', page), httpOptions)
    }

    static giftCardSend(id, page) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_CUSTOMER_GIFT_CARD_SEND}`.replace('{{id}}', id).replace('{{page}}', page), httpOptions)
    }

}
export default GiftCardApi;