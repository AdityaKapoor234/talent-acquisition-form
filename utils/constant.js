import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const {API_BASE_URL_SPACE_SERVICE, API_BASE_URL_USER_SERVICE,API_BASE_URL_PROPOSAL_SERVICE, API_BASE_URL_AUTH_SERVICE, WEBSITE_NAME, WEBSITE_TAGLINE, WEBSITE_IMAGE_URL,WEBSITE_URL} = publicRuntimeConfig

export const APP_NAME = WEBSITE_NAME
export const APP_TAGLINE = WEBSITE_TAGLINE
export const APP_IMAGE = WEBSITE_IMAGE_URL
export const APP_URL = WEBSITE_URL

// Password Regex
export const PASSWORD_REGEX = /^[a-zA-Z0-9.!#$%&'*+@/=?^_`():;,"<>{|}~-]{6,}$/

export const LOGIN = `http://65.1.17.188:5000/admin/auth/login`;
export const ADMIN_LOGIN = `http://65.1.17.188:5000/admin`;

//Customer
export const CUSTOMERLIST = `http://65.1.17.188:5000/customer?page={{page}}&q={{search}}`;
export const GET_CUSTOMER = `http://65.1.17.188:5000/customer/{{id}}`;


//INGREDIENTS
export const INGREDIENTSLIST = 'http://65.1.17.188:5001/manage/ingredient?page={{page}}&q={{search}}'
// export const GET_INGREDIENT = 'http://65.1.17.188:5001/manage/ingredient/{{id}}';

//Brands
export const BRANDSLIST = `http://65.1.17.188:5001/manage/brand?page={{page}}&q={{search}}`;
export const GET_BRANDS_DETAILS = `http://65.1.17.188:5001/manage/brand/{{id}}`;
export const GET_BRANDS_CREATE = `http://65.1.17.188:5001/manage/brand`;
export const GET_BRANDS_EDIT = `http://65.1.17.188:5001/manage/brand/{{id}}`;
export const GET_BRANDS_DELETE = `http://65.1.17.188:5001/manage/brand/{{id}}/delete`;

//Flavor
export const FLAVORLIST = `http://65.1.17.188:5001/manage/flavor?page={{page}}&q={{search}}`;
export const GET_FLAVOR_DETAILS = `http://65.1.17.188:5001/manage/flavor/{{id}}`;
export const GET_FLAVOR_CREATE = `http://65.1.17.188:5001/manage/flavor`;
export const GET_FLAVOR_EDIT = `http://65.1.17.188:5001/manage/flavor/{{id}}`;
export const GET_FLAVOR_DELETE = `http://65.1.17.188:5001/manage/flavor/{{id}}/delete`;