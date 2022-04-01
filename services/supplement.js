import axios from "axios";
import { GET_INGREDIENT, ADD_SUPPLEMENT } from "../utils/constant";
import cookie from "js-cookie";


export class SupplementApi {

    static IngredientList() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_INGREDIENT}`, httpOptions)
    }

    static AddSupplement(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${ADD_SUPPLEMENT}`.replace('{{id}}', id),data, httpOptions)
    }

    static getSupplement(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${ADD_SUPPLEMENT}`.replace('{{id}}', id), httpOptions)
    }

}
export default SupplementApi;