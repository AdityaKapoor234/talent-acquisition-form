import axios from "axios";
import {PRODUCTLIST, GET_PRODUCT_DETAILS, GET_PRODUCT_CREATE, GET_PRODUCT_EDIT, GET_PRODUCT_DELETE} from "../utils/constant";
import cookie from "js-cookie";


export class ProductApi {

    static ProductList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${PRODUCTLIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

}
export default ProductApi ;