import axios from "axios";
import { TESTIMONIAL_GALLERY_LIST, TESTIMONIAL_GALLERY_VIEW, TESTIMONIAL_GALLERY_EDIT, TESTIMONIAL_GALLERY_CREATE, TESTIMONIAL_GALLERY_DELETE } from "../utils/constant";
import cookie from "js-cookie";

export class TestimonialGalleryAPI {

    static testimonialGalleryList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TESTIMONIAL_GALLERY_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static testimonialGalleryViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${TESTIMONIAL_GALLERY_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static testimonialGalleryListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${TESTIMONIAL_GALLERY_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static testimonialGalleryCreate(data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${TESTIMONIAL_GALLERY_CREATE}`,data,httpOptions)
    }

    static testimonialGalleryDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${TESTIMONIAL_GALLERY_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default TestimonialGalleryAPI;
