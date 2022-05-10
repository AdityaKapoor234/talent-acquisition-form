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
export const GET_CUSTOMER_ORDER = `http://65.1.17.188:5002/manage/order/customer/{{id}}?page={{page}}`;
export const GET_CUSTOMER_ADDRESSES = `http://65.1.17.188:5000/customer/{{id}}/addresses?page={{page}}`;
//Category
export const CATEGORYLIST = `http://65.1.17.188:5001/manage/category?page={{page}}&q={{search}}`;
export const GET_CATEGORY_DETAILS = `http://65.1.17.188:5001/manage/category/{{id}}`;
export const GET_CATEGORY_CREATE = `http://65.1.17.188:5001/manage/category`;
export const GET_CATEGORY_EDIT = `http://65.1.17.188:5001/manage/category/{{id}}`;
export const GET_CATEGORY_DELETE = `http://65.1.17.188:5001/manage/category/{{id}}/delete`;
export const GET_BANNER_URL =`http://65.1.17.188:5001/manage/category/photo/banner`;
export const GET_PARENT_CATEGORY =`http://65.1.17.188:5001/manage/category/parent-category`;

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
export const PRODUCTLIST = `http://65.1.17.188:5001/manage/product?page={{page}}&q={{search}}`;

//Flavor
export const FLAVORLIST = `http://65.1.17.188:5001/manage/flavor?page={{page}}&q={{search}}`;
export const GET_FLAVOR_DETAILS = `http://65.1.17.188:5001/manage/flavor/{{id}}`;
export const GET_FLAVOR_CREATE = `http://65.1.17.188:5001/manage/flavor`;
export const GET_FLAVOR_EDIT = `http://65.1.17.188:5001/manage/flavor/{{id}}`;
export const GET_FLAVOR_DELETE = `http://65.1.17.188:5001/manage/flavor/{{id}}/delete`;

//ASK THE PROS
export const ASKTHEPROSLIST = `http://65.1.17.188:5000/manage/expert?page={{page}}&q={{search}}`;
export const GET_ASKTHEPROS_DETAILS = `http://65.1.17.188:5000/manage/expert/{{id}}`;
export const GET_ASKTHEPROS_CREATE = `http://65.1.17.188:5000/manage/expert`;
export const GET_ASKTHEPROS_EDIT = `http://65.1.17.188:5000/manage/expert/{{id}}`;
export const GET_ASKTHEPROS_DELETE = `http://65.1.17.188:5000/manage/expert/{{id}}/delete`;
export const GET_EXPERTISE =`http://65.1.17.188:5000/expertise`;

//DASHBOARD
export const GET_DASHBOARD_ORDER_STATS = `http://65.1.17.188:5002/manage/order/stats`;

//ORDERS
export const ORDERSLIST = `http://65.1.17.188:5002/manage/order/?page={{page}}&q={{search}}&sort={{latest}}`;
export const GET_ORDER_DETAILS = `http://65.1.17.188:5002/manage/order/{{id}}`;
export const ADD_ORDER_STATUS = `http://65.1.17.188:5002/manage/order/{{id}}/status`;

//PRODUCT
export const GET_INGREDIENT = `http://65.1.17.188:5001/manage/ingredient/all`;
export const ADD_SUPPLEMENT = `http://65.1.17.188:5001/manage/product/{{id}}/supplement-facts`;
export const CONTENTLIST = `http://65.1.17.188:5001/manage/product/{{id}}/content`; 
export const CONTENT_LIST_EDIT = `http://65.1.17.188:5001/manage/product/{{id}}/content`;
export const ADD_CERTIFICATE = `http://65.1.17.188:5001/manage/product/{{id}}/certificate`;
export const GET_CERTIFICATE=`http://65.1.17.188:5001/manage/product/{{id}}/certificate/view`;
export const ADD_CLASSIFICTION= `http://65.1.17.188:5001/manage/classification/{{id}}`;
export const GET_CLASSIFICTION = `http://65.1.17.188:5001/manage/classification/all`;

//QUERY
export const QUERYLIST = `http://65.1.17.188:5000/manage/queries?page={{page}}&sort_by={{latest}}`;
export const GET_QUERY = `http://65.1.17.188:5000/manage/queries/{{id}}`;

//SEO
export const SEO = `http://65.1.17.188:5001/manage/product/{{id}}/seo`;

//PRODUCT-INFO
export const GET_CATEGORY_INFO = `http://65.1.17.188:5001/manage/category/all`;
export const GET_BRAND_INFO = `http://65.1.17.188:5001/manage/brand/all`;
export const GET_FLAVOR_INFO = `http://65.1.17.188:5001/manage/flavor/all`;
export const GET_CERTIFICATION =`http://65.1.17.188:5001/certification/`;
export const GET_INFO =`http://65.1.17.188:5001/manage/product/{{id}}/detail`;
export const CREATE_PRODUCT = `http://65.1.17.188:5001/manage/product`;
export const GET_PHOTO =`http://65.1.17.188:5001/manage/product/{{id}}/images`;
export const GET_COUNTRY =`http://65.1.17.188:5001/manage/country`;
export const GET_PRICE =`http://65.1.17.188:5001/manage/product/{{id}}/price`;


//USERS
export const ADMINLIST = `http://65.1.17.188:5000/admin/all?page={{page}}&q={{search}}`;
export const GET_ADMIN_DETAILS = `http://65.1.17.188:5000/admin/{{id}}/view`;
export const ADD_ADMIN = `http://65.1.17.188:5000/admin/create`;
export const ADMIN_LIST_EDIT = `http://65.1.17.188:5000/admin/{{id}}/edit`;


//EXCEL EXPORT
export const CUSTOMER_EXCEL_LIST = `http://65.1.17.188:5000/customer/all`;
export const ORDER_EXCEL_LIST = `http://65.1.17.188:5002/manage/order/all`;
export const PRODUCT_EXCEL_LIST = `http://65.1.17.188:5001/manage/product/all`;

//WISHLIST
export const WISH_LIST = `http://65.1.17.188:5001/manage/wishlist/{{id}}?page={{page}}`;

//INQUIRY
export const ADVERTISE_WITH_US_LIST = `http://65.1.17.188:5000/manage/advertise?page={{page}}&q={{search}}`;
export const GET_ADVERTISE_WITH_US_DETAILS = `http://65.1.17.188:5000/manage/advertise/{{id}}/view`;
export const SELL_ON_FITCART_LIST = `http://65.1.17.188:5000/manage/sell?page={{page}}&q={{search}}`;
export const GET_SELL_ON_FITCART_DETAILS = `http://65.1.17.188:5000/manage/sell/{{id}}/view`;
export const MARKETING_AND_SPONSORSHIP_LIST = `http://65.1.17.188:5000/manage/sponsorship?page={{page}}&q={{search}}`;
export const GET_MARKETING_AND_SPONSORSHIP_DETAILS = `http://65.1.17.188:5000/manage/sponsorship/{{id}}/view`;
export const GET_BULK_BUY_LIST = `http://65.1.17.188:5000/manage/bulkbuy?page={{page}}&q={{search}}`;
export const GET_Bulk_BUY_VIEW_DETAILS = `http://65.1.17.188:5000/manage/bulkbuy/{{id}}/view`;
export const FEEDBACK_LIST = `http://65.1.17.188:5000/manage/feedback?page={{page}}&q={{search}}`;
export const GET_FEEDBACK_DETAILS = `http://65.1.17.188:5000/manage/feedback/{{id}}/view`;
export const GET_AFFILIATE_MARKETING_LIST = `http://65.1.17.188:5000/manage/affiliate?page={{page}}&q={{search}}`;
export const GET_AFFILIATE_MARKETING_VIEW_DETAILS = `http://65.1.17.188:5000/manage/affiliate/{{id}}/view`;
export const SUBSCRIPTION_LIST = `http://65.1.17.188:5000/manage/subscribe?page={{page}}&q={{search}}`;
export const SUBSCRIPTION_LIST_EDIT = `http://65.1.17.188:5000/manage/subscribe/{{id}}/edit`;
export const TRUSTED_HEALTH_LIST = `http://65.1.17.188:5001/manage/trusthealth?page={{page}}`;
export const TRUSTED_HEALTH_DETAILS = `http://65.1.17.188:5001/manage/trusthealth/{{id}}/view`;
export const TRUSTED_HEALTH_EDIT = `http://65.1.17.188:5001/manage/trusthealth/{{id}}/edit`;
export const TRUSTED_HEALTH_CREATE = `http://65.1.17.188:5001/manage/trusthealth/add`;
export const TRUSTED_HEALTH_DELETE = `http://65.1.17.188:5001/manage/trusthealth/{{id}}/delete`;

//SPORTS
export const SPORTS_LIST = `http://65.1.17.188:5001/manage/sports?page={{page}}&q={{search}}`;
export const SPORTS_VIEW = `http://65.1.17.188:5001/manage/sports/{{id}}`;
export const SPORTS_EDIT = `http://65.1.17.188:5001/manage/sports/{{id}}`;
export const SPORTS_CREATE = `http://65.1.17.188:5001/manage/sports`;
export const SPORTS_DELETE = `http://65.1.17.188:5001/manage/sports/{{id}}/delete`;

//GOALS
export const GOALS_LIST = `http://65.1.17.188:5001/manage/goals?page={{page}}&q={{search}}`;
export const GOALS_VIEW = `http://65.1.17.188:5001/manage/goals/{{id}}`;
export const GOALS_EDIT = `http://65.1.17.188:5001/manage/goals/{{id}}`;
export const GOALS_CREATE = `http://65.1.17.188:5001/manage/goals`;
export const GOALS_DELETE = `http://65.1.17.188:5001/manage/goals/{{id}}/delete`;

//DIET
export const DIET_LIST = `http://65.1.17.188:5001/manage/diets?page={{page}}&q={{search}}`;
export const DIET_VIEW = `http://65.1.17.188:5001/manage/diets/{{id}}`;
export const DIET_EDIT = `http://65.1.17.188:5001/manage/diets/{{id}}`;
export const DIET_CREATE = `http://65.1.17.188:5001/manage/diets`;
export const DIET_DELETE = `http://65.1.17.188:5001/manage/diets/{{id}}/delete`;

