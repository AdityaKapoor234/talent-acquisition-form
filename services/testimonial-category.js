import axios from "axios";
import { TESTIMONIAL_CATEGORY_LIST, TESTIMONIAL_CATEGORY_VIEW, TESTIMONIAL_CATEGORY_EDIT, TESTIMONIAL_CATEGORY_CREATE, TESTIMONIAL_CATEGORY_DELETE } from "../utils/constant";
import cookie from "js-cookie";

export class TestimonialCategoryAPI {

    static testimonialCategoryList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TESTIMONIAL_CATEGORY_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static testimonialCategoryViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TESTIMONIAL_CATEGORY_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static testimonialCategoryListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${TESTIMONIAL_CATEGORY_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static testimonialCategoryCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${TESTIMONIAL_CATEGORY_CREATE}`,data,httpOptions)
    }

    static testimonialCategoryDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${TESTIMONIAL_CATEGORY_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default TestimonialCategoryAPI;
