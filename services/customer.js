import axios from "axios";

import {CUSTOMERLIST,GET_CUSTOMER,GET_CUSTOMER_ORDER,GET_CUSTOMER_ADDRESSES,WISH_LIST, GET_CUSTOMER_SUPPORT_INFORMATION, GET_CUSTOMER_SUPPORT_INFORMATION_VIEW, CUSTOMER_ADD, CUSTOMER_TYPE_DROPDOWN, CUSTOMER_TYPE,CUSTOMER_TYPE_EDIT,ADD_CUSTOMER,GET_VIEW_CUSTOMER_TYPE,DELETE_CUSTOMER} from "../utils/constant";
import cookie from "js-cookie";


export class CustomerApi {

    static CustomerList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CUSTOMERLIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getCustomerDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_CUSTOMER}`.replace('{{id}}', id), httpOptions)
    }

    
    static CustomerAdd(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${CUSTOMER_ADD}`,data,httpOptions)
    }

    static getCustomerTypeDropdownDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${CUSTOMER_TYPE_DROPDOWN}`.replace('{{id}}', id),httpOptions)
    }

    static CustomerDetails(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${GET_CUSTOMER}`.replace('{{id}}', id), data, httpOptions)
    }

    static CustomerOrder(id, page) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_CUSTOMER_ORDER}`.replace('{{id}}', id).replace('{{page}}', page), httpOptions)
    }

    static CustomerAddresses(id, page) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_CUSTOMER_ADDRESSES}`.replace('{{id}}', id).replace('{{page}}', page), httpOptions)
    }

    static WishList(id, page) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${WISH_LIST}`.replace('{{id}}', id).replace('{{page}}', page), httpOptions)
    }

    static AddCustomer( data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${ADD_CUSTOMER}`, data, httpOptions)
    }

    static CustomerType(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CUSTOMER_TYPE}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)


    }

    static getCustomerSupportInformationDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };

        return axios.get(`${GET_CUSTOMER_SUPPORT_INFORMATION_VIEW}`.replace('{{id}}', id), httpOptions)
    }
    static CustomerSupportInformationList(page,search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };

        return axios.get(`${GET_CUSTOMER_SUPPORT_INFORMATION}`.replace('{{page}}', page).replace('{{search}}',search ), httpOptions)
    }
    static EditCustomerType(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${CUSTOMER_TYPE_EDIT}`.replace('{{id}}', id),httpOptions)
    }

    static getCustomerType(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_VIEW_CUSTOMER_TYPE}`.replace('{{id}}', id),httpOptions)
    }

    static CustomerDelete(id,data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${DELETE_CUSTOMER}`.replace('{{id}}', id),data,httpOptions)
    }

}
export default CustomerApi;