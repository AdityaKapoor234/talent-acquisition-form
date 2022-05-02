import axios from "axios";
import { ADVERTISE_WITH_US_LIST, GET_ADVERTISE_WITH_US_DETAILS, SELL_ON_FITCART_LIST, GET_SELL_ON_FITCART_DETAILS, MARKETING_AND_SPONSORSHIP_LIST, GET_MARKETING_AND_SPONSORSHIP_DETAILS,GET_BULK_BUY_LIST,GET_Bulk_BUY_VIEW_DETAILS, FEEDBACK_LIST,SUBSCRIPTION_LIST, SUBSCRIPTION_LIST_EDIT   } from "../utils/constant";

import cookie from "js-cookie";

export class InquiryApi {

    static advertiseWithUsList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${ADVERTISE_WITH_US_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getAdvertiseWithUsDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_ADVERTISE_WITH_US_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static sellOnFitcartList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SELL_ON_FITCART_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getSellOnFitcartDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_SELL_ON_FITCART_DETAILS}`.replace('{{id}}', id),httpOptions)
    }

    static marketingAndSponsorspihList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${MARKETING_AND_SPONSORSHIP_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getMarketingAndSponsorspihDetails(id) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_MARKETING_AND_SPONSORSHIP_DETAILS}`.replace('{{id}}', id),httpOptions)
    }
    
   
    static feedbackList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${FEEDBACK_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

  
        static getBulkBuyList(page,search) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.get(`${GET_BULK_BUY_LIST}`.replace('{{page}}', page).replace('{{search}}', search),httpOptions)
    }

    static getBulkBuysViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GET_Bulk_BUY_VIEW_DETAILS}`.replace('{{id}}', id),httpOptions)
    }
    static subscriptionList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${SUBSCRIPTION_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static subscriptionListEDIT(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
       
      
        return axios.post(`${SUBSCRIPTION_LIST_EDIT}`.replace('{{id}}', id),data,httpOptions)
    }




}
export default InquiryApi;
