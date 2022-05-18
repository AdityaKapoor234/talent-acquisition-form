import axios from "axios";
import {CUSTOMERLIST,CUSTOMER_TYPE_DROPDOWN,GET_CUSTOMER,GET_CUSTOMER_ORDER,GET_CUSTOMER_ADDRESSES,WISH_LIST,SHOPPING_CART_LIST, GET_CUSTOMER_SUPPORT_INFORMATION, GET_CUSTOMER_SUPPORT_INFORMATION_VIEW, CUSTOMER_ADD, CUSTOMER_TYPE_ADD, CUSTOMER_TYPE_LIST,CUSTOMER_TYPE_EDIT,ADD_CUSTOMER_TYPE,CUSTOMER_TYPE_VIEW,CUSTOMER_TYPE_DELETE, CUSTOMER_ADDRESS_EDIT, CUSTOMER_ADDRESS_ADD, STATE } from "../utils/constant";
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

    
    static getCustomerTypeDropdownDetails() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CUSTOMER_TYPE_DROPDOWN}`, httpOptions)
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

    static CustomerTypeAdd(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${CUSTOMER_TYPE_ADD}`,data,httpOptions)
    }

    static AddCustomerType(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${CUSTOMER_TYPE_ADD}`,data,httpOptions)
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

    static ShoppingCartList(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SHOPPING_CART_LIST}`.replace('{{id}}', id), httpOptions)
    }

    static CustomerTypeAdd(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${ADD_CUSTOMER_TYPE}`, data, httpOptions)
    }

    static CustomerType(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CUSTOMER_TYPE_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)


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
    static EditCustomerType(id,data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${CUSTOMER_TYPE_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static getCustomerType(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CUSTOMER_TYPE_VIEW}`.replace('{{id}}', id),httpOptions)
    }

    static CustomerTypeDelete(id,data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${CUSTOMER_TYPE_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }

    static AddressEdit(id,data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${CUSTOMER_ADDRESS_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static AddressAdd(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${CUSTOMER_ADDRESS_ADD}`.replace('{{id}}', id),data,httpOptions)
    }

    static getState() {
        const  token = cookie.get('access_token');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${STATE}`,httpOptions)
    }


}
export default CustomerApi;