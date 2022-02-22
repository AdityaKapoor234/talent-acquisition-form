import axios from "axios";
import {LOGIN,ADMIN_LOGIN} from "../utils/constant";
import cookie from "js-cookie";


export class loginAPI {

    static login(data) {
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',           
            }
        };
        return axios.post(`${LOGIN}`,data,httpOptions)
    }

    static adminLogin() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${ADMIN_LOGIN}`,httpOptions)
    }


}
export default loginAPI ;