import axios from "axios";
import { CUSTOMER_EXCEL_LIST, ORDER_EXCEL_LIST, PRODUCT_EXCEL_LIST,DOWNLOAD_MAX_MEMBERS } from "../utils/constant";
import cookie from "js-cookie";

export class ExcelApi {

    static CustomerExcelList() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${CUSTOMER_EXCEL_LIST}`, httpOptions)
    }

    static OrderExcelList() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${ORDER_EXCEL_LIST}`, httpOptions)
    }

    static ProductExcelList() {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${PRODUCT_EXCEL_LIST}`, httpOptions)
    }

    static downloadMaxMemberslist() {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${DOWNLOAD_MAX_MEMBERS}`,httpOptions)
    }

}
export default ExcelApi;
