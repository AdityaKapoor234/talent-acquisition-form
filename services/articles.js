import axios from "axios";
import { TYPELIST,GET_TYPE_DETAILS,GET_TYPE_EDIT,GET_TYPE_CREATE,
    CATEGORY_LIST,GET_CATEGORY_DETAILS_ARTICLE,GET_CATEGORY_EDIT_ARTICLE,GET_CATEGORY_CREATE_ARTICLE,
    AUTHOR_LIST,GET_AUTHOR_DETAILS_ARTICLE,GET_AUTHOR_EDIT_ARTICLE,GET_AUTHOR_CREATE_ARTICLE,} from "../utils/constant";
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

    static CategoryList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${CATEGORY_LIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getCategoryDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_CATEGORY_DETAILS_ARTICLE}`.replace('{{id}}', id),httpOptions)
    }

    static CategoryEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_CATEGORY_EDIT_ARTICLE}`.replace('{{id}}', id),data,httpOptions)
    }

    static CategoryCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_CATEGORY_CREATE_ARTICLE}`,data,httpOptions)
    }

    static AuthorList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${AUTHOR_LIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getAuthorDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_AUTHOR_DETAILS_ARTICLE}`.replace('{{id}}', id),httpOptions)
    }

    static AuthorEdit(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_AUTHOR_EDIT_ARTICLE}`.replace('{{id}}', id),data,httpOptions)
    }

    static AuthorCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GET_AUTHOR_CREATE_ARTICLE}`,data,httpOptions)
    }

}
export default ArticlesApi;