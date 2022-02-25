import axios from "axios";
import {INGREDIENTLIST,GET_INGREDIENT} from "../utils/constant";
import cookie from "js-cookie";


export class IngredientApi {

    static IngredientList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${INGREDIENTLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }


}
export default IngredientApi ;