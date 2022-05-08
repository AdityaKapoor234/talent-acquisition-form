import axios from "axios";
import { GOALS_LIST, GOALS_VIEW, GOALS_EDIT, GOALS_CREATE, GOALS_DELETE  } from "../utils/constant";
import cookie from "js-cookie";

export class GoalsApi {

    static goalsList(page, search) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GOALS_LIST}`.replace('{{page}}', page).replace('{{search}}', search), httpOptions)
    }

    static getGoalsViewDetails(id) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.get(`${GOALS_VIEW}`.replace('{{id}}', id), httpOptions)
    }

    static goalsListEDIT(id, data) {
        const token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };
        return axios.post(`${GOALS_EDIT}`.replace('{{id}}', id), data, httpOptions)
    }

    static goalsCreate(data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GOALS_CREATE}`,data,httpOptions)
    }

    static goalsDelete(id,data) {
        const  token = cookie.get('access_token_admin');
        const httpOptions = {
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token} `          
            }
        };
        return axios.post(`${GOALS_DELETE}`.replace('{{id}}', id),data,httpOptions)
    }
}
export default GoalsApi;
