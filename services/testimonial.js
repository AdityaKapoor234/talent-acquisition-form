import axios from "axios";
import { TESTIMONIAL_LIST, TESTIMONIAL_VIEW, TESTIMONIAL_EDIT, TESTIMONIAL_CREATE, TESTIMONIAL_DELETE, TESTIMONIAL_DROPDOWN_CATEGORY } from "../utils/constant";
import cookie from "js-cookie";

export class TestimonialAPI {

    static testimonialList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TESTIMONIAL_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static testimonialViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TESTIMONIAL_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static testimonialListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${TESTIMONIAL_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static testimonialCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${TESTIMONIAL_CREATE}`,data,httpOptions)
    }

    static testimonialDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${TESTIMONIAL_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }

    static testimonialDropdownCategory() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TESTIMONIAL_DROPDOWN_CATEGORY}`, httpOptions)
    }
}
export default TestimonialAPI;
