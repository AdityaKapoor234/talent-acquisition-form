import axios from "axios";
import {PRODUCTLIST, CREATE_PRODUCT} from "../utils/constant";
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

    static createProduct(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${CREATE_PRODUCT}`,data,httpOptions)
    }

}
export default ProductApi ;