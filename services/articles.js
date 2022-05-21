import axios from "axios";
import { TYPELIST,GET_TYPE_DETAILS,GET_TYPE_EDIT,GET_TYPE_CREATE} from "../utils/constant";
import cookie from "js-cookie";

export class ArticlesApi {

    static typeList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${TYPELIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getTypeDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_TYPE_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static TypeEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_TYPE_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }

    static TypeCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_TYPE_CREATE}`,data,httpOptions)
    }

}
export default ArticlesApi;