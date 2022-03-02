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

//Category
export const CATEGORYLIST = `http://65.1.17.188:5001/manage/category?page={{page}}&q={{search}}`;
// export const GET_CATEGORY_DETAILS = ``;
// export const GET_CATEGORY_CREATE = ``;
// export const GET_CATEGORY_EDIT = ``;
// export const GET_CATEGORY_DELETE = ``;

//INGREDIENTS
export const INGREDIENTLIST = `http://65.1.17.188:5001/manage/ingredient?page={{page}}&q={{search}}`;
export const GET_INGREDIENT_DETAILS = `http://65.1.17.188:5001/manage/ingredient/{{id}}`;
export const GET_INGREDIENT_CREATE = `http://65.1.17.188:5001/manage/ingredient`;
export const GET_INGREDIENT_EDIT = `http://65.1.17.188:5001/manage/ingredient/{{id}}`;
export const GET_INGREDIENT_DELETE = `http://65.1.17.188:5001/manage/ingredient/{{id}}/delete`;

//Brands
export const BRANDSLIST = `http://65.1.17.188:5001/manage/brand?page={{page}}&q={{search}}`;
export const GET_BRANDS_DETAILS = `http://65.1.17.188:5001/manage/brand/{{id}}`;
export const GET_BRANDS_CREATE = `http://65.1.17.188:5001/manage/brand`;
export const GET_BRANDS_EDIT = `http://65.1.17.188:5001/manage/brand/{{id}}`;
export const GET_BRANDS_DELETE = `http://65.1.17.188:5001/manage/brand/{{id}}/delete`;

//Product
export const PRODUCTLIST = `http://127.0.0.1:5000/manage/product?page={{page}}&q={{search}}`;
// export const GET_PRODUCT_DETAILS = ``;
// export const GET_PRODUCT_CREATE = ``;
// export const GET_PRODUCT_EDIT = ``;
// export const GET_PRODUCT_DELETE = ``;

//Flavor
export const FLAVORLIST = `http://65.1.17.188:5001/manage/flavor?page={{page}}&q={{search}}`;
export const GET_FLAVOR_DETAILS = `http://65.1.17.188:5001/manage/flavor/{{id}}`;
export const GET_FLAVOR_CREATE = `http://65.1.17.188:5001/manage/flavor`;
export const GET_FLAVOR_EDIT = `http://65.1.17.188:5001/manage/flavor/{{id}}`;
export const GET_FLAVOR_DELETE = `http://65.1.17.188:5001/manage/flavor/{{id}}/delete`;