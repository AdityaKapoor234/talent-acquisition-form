import axios from "axios";
import { INGREDIENTLIST, GET_INGREDIENT_DETAILS, GET_INGREDIENT_CREATE, GET_INGREDIENT_EDIT, GET_INGREDIENT_DELETE } from "../utils/constant";
import cookie from "js-cookie";


export class IngredientApi {

    static IngredientList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${INGREDIENTLIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getIngredientDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_INGREDIENT_DETAILS}`.replace('{{id}}', id), httpOptions)
    }

    static IngredientEdit(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${GET_INGREDIENT_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static IngredientCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${GET_INGREDIENT_CREATE}`, data, httpOptions)
    }

    static IngredientDelete(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        return axios.post(`${GET_INGREDIENT_DELETE}`.replace('{{id}}', id), data, httpOptions)
    }



}
export default IngredientApi;