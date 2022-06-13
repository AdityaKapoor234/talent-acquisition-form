import getConfig from 'next/config'
const {publicRuntimeConfig} = getConfig()
const {API_BASE_URL_PRODUCT_SERVICE, API_BASE_URL_USER_SERVICE,MAIN_WEBSITE_URL,API_BASE_URL_ORDER_SERVICE, WEBSITE_NAME, WEBSITE_TAGLINE, WEBSITE_IMAGE_URL,WEBSITE_URL} = publicRuntimeConfig

export const APP_NAME = WEBSITE_NAME;
export const APP_TAGLINE = WEBSITE_TAGLINE;
export const APP_IMAGE = WEBSITE_IMAGE_URL;
export const ADMIN_APP_URL = WEBSITE_URL;
export const USER_SERVICE = API_BASE_URL_USER_SERVICE;
export const PRODUCT_SERVICE = API_BASE_URL_PRODUCT_SERVICE;
export const ORDER_SERVICE = API_BASE_URL_ORDER_SERVICE;
export const APP_URL = MAIN_WEBSITE_URL;

// Password Regex
export const PASSWORD_REGEX = /^[a-zA-Z0-9.!#$%&'*+@/=?^_`():;,"<>{|}~-]{6,}$/

export const LOGIN = `${USER_SERVICE}/admin/auth/login`;
export const ADMIN_LOGIN = `${USER_SERVICE}/admin`;

//Customer
export const CUSTOMERLIST = `${USER_SERVICE}/customer?page={{page}}&q={{search}}`;
export const GET_CUSTOMER = `${USER_SERVICE}/customer/{{id}}`;
export const CUSTOMER_ADD = `${USER_SERVICE}/customer/add`;
export const GET_CUSTOMER_ORDER = `${ORDER_SERVICE}/manage/order/customer/{{id}}?page={{page}}`;
export const GET_CUSTOMER_ADDRESSES = `${USER_SERVICE}/customer/{{id}}/addresses?page={{page}}`;
export const GET_CUSTOMER_SUPPORT_INFORMATION = `${USER_SERVICE}/manage/enquiry?page={{page}}&q={{search}}`;
export const GET_CUSTOMER_SUPPORT_INFORMATION_VIEW = `${USER_SERVICE}/manage/enquiry/{{id}}/view`;
export const CUSTOMER_TYPE_DROPDOWN = `${USER_SERVICE}/customer/type/dropdown`;

export const CUSTOMER_TYPE_LIST = `${USER_SERVICE}/customer/type/dropdown/paginate?page={{page}}&q={{search}}`;
export const CUSTOMER_TYPE_VIEW=`${USER_SERVICE}/customer/type/dropdown/view/{{id}}`
export const CUSTOMER_TYPE_EDIT=`${USER_SERVICE}/customer/type/dropdown/edit/{{id}}`
export const CUSTOMER_TYPE_ADD = `${USER_SERVICE}/customer/type/dropdown/add`;
export const CUSTOMER_TYPE_DELETE=`${USER_SERVICE}/customer/type/dropdown/delete/{{id}}`



//Category
export const CATEGORYLIST = `${PRODUCT_SERVICE}/manage/category?page={{page}}&q={{search}}`;
export const GET_CATEGORY_DETAILS = `${PRODUCT_SERVICE}/manage/category/{{id}}`;
export const GET_CATEGORY_CREATE = `${PRODUCT_SERVICE}/manage/category`;
export const GET_CATEGORY_EDIT = `${PRODUCT_SERVICE}/manage/category/{{id}}`;
export const GET_CATEGORY_DELETE = `${PRODUCT_SERVICE}/manage/category/{{id}}/delete`;
export const GET_BANNER_URL =`${PRODUCT_SERVICE}/manage/category/photo/banner`;
export const GET_PARENT_CATEGORY =`${PRODUCT_SERVICE}/manage/category/parent-category`;

//INGREDIENTS
export const INGREDIENTLIST = `${PRODUCT_SERVICE}/manage/ingredient?page={{page}}&q={{search}}`;
export const GET_INGREDIENT_DETAILS = `${PRODUCT_SERVICE}/manage/ingredient/{{id}}`;
export const GET_INGREDIENT_CREATE = `${PRODUCT_SERVICE}/manage/ingredient`;
export const GET_INGREDIENT_EDIT = `${PRODUCT_SERVICE}/manage/ingredient/{{id}}`;
export const GET_INGREDIENT_DELETE = `${PRODUCT_SERVICE}/manage/ingredient/{{id}}/delete`;

//Brands
export const BRANDSLIST = `${PRODUCT_SERVICE}/manage/brand?page={{page}}&q={{search}}`;
export const GET_BRANDS_DETAILS = `${PRODUCT_SERVICE}/manage/brand/{{id}}`;
export const GET_BRANDS_CREATE = `${PRODUCT_SERVICE}/manage/brand`;
export const GET_BRANDS_EDIT = `${PRODUCT_SERVICE}/manage/brand/{{id}}`;
export const GET_BRANDS_DELETE = `${PRODUCT_SERVICE}/manage/brand/{{id}}/delete`;

//Product
export const PRODUCTLIST = `${PRODUCT_SERVICE}/manage/product?page={{page}}&q={{search}}`;

//Flavor
export const FLAVORLIST = `${PRODUCT_SERVICE}/manage/flavor?page={{page}}&q={{search}}`;
export const GET_FLAVOR_DETAILS = `${PRODUCT_SERVICE}/manage/flavor/{{id}}`;
export const GET_FLAVOR_CREATE = `${PRODUCT_SERVICE}/manage/flavor`;
export const GET_FLAVOR_EDIT = `${PRODUCT_SERVICE}/manage/flavor/{{id}}`;
export const GET_FLAVOR_DELETE = `${PRODUCT_SERVICE}/manage/flavor/{{id}}/delete`;

//ASK THE PROS
export const ASKTHEPROSLIST = `${USER_SERVICE}/manage/expert?page={{page}}&q={{search}}`;
export const GET_ASKTHEPROS_DETAILS = `${USER_SERVICE}/manage/expert/{{id}}`;
export const GET_ASKTHEPROS_CREATE = `${USER_SERVICE}/manage/expert`;
export const GET_ASKTHEPROS_EDIT = `${USER_SERVICE}/manage/expert/{{id}}`;
export const GET_ASKTHEPROS_DELETE = `${USER_SERVICE}/manage/expert/{{id}}/delete`;
export const GET_EXPERTISE =`${USER_SERVICE}/expertise`;
export const ASK_THE_PROS_REFFRAL_CODE_LIST = `${ORDER_SERVICE}/manage/expert/reward/{{id}}?page={{page}}`;
export const ASK_THE_PROS_CODE_DROPDOWN_LIST = `${ORDER_SERVICE}/manage/coupon/all`;
export const ASK_THE_PROS_REFFRAL_CODE_EDIT = `${USER_SERVICE}/manage/expert/{{id}}/set_coupon`;
export const ASK_THE_PROS_REFFRAL_CODE_TOTAL_POINTS = `${ORDER_SERVICE}/manage/expert/reward/{{id}}/total_point`;

//DASHBOARD
export const GET_DASHBOARD_ORDER_STATS = `${ORDER_SERVICE}/manage/order/stats`;
export const GET_DASHBOARD_ORDER_PAYMENT_STATS = `${ORDER_SERVICE}/manage/order/payment/stats`;
export const GET_DASHBOARD_TOP_SEARCH_TERMS = `${PRODUCT_SERVICE}/manage/top-search`;
export const GET_DASHBOARD_SALES_TREND = `${ORDER_SERVICE}/manage/order/sales-trend/product`;
export const GET_DASHBOARD_TOP_SOLD = `${ORDER_SERVICE}/manage/order/top-sold/product`;

//ORDERS
export const ORDERSLIST = `${ORDER_SERVICE}/manage/order/?page={{page}}&q={{search}}&sort={{latest}}`;
export const GET_ORDER_DETAILS = `${ORDER_SERVICE}/manage/order/{{id}}`;
export const ADD_ORDER_STATUS = `${ORDER_SERVICE}/manage/order/{{id}}/status`;

//PRODUCT
export const GET_INGREDIENT = `${PRODUCT_SERVICE}/manage/ingredient/all`;
export const ADD_SUPPLEMENT = `${PRODUCT_SERVICE}/manage/product/{{id}}/supplement-facts`;
export const CONTENTLIST = `${PRODUCT_SERVICE}/manage/product/{{id}}/content`; 
export const CONTENT_LIST_EDIT = `${PRODUCT_SERVICE}/manage/product/{{id}}/content`;
export const ADD_CERTIFICATE = `${PRODUCT_SERVICE}/manage/product/{{id}}/certificate`;
export const GET_CERTIFICATE=`${PRODUCT_SERVICE}/manage/product/{{id}}/certificate/view`;
export const ADD_CLASSIFICTION= `${PRODUCT_SERVICE}/manage/classification/{{id}}`;
export const GET_CLASSIFICTION = `${PRODUCT_SERVICE}/manage/classification/all`;
export const GET_INVENTORY_LIST =`${PRODUCT_SERVICE}/manage/inventory/{{id}}?page={{page}}`;
export const CREATE_INVENTORY=`${PRODUCT_SERVICE}/manage/inventory/{{id}}`;
export const GET_INVENTORY_DELETE=`${PRODUCT_SERVICE}/manage/inventory/{{id}}/delete`;
export const GET_INVENTORY_UPADTE=`${PRODUCT_SERVICE}/manage/inventory/{{id}}/update`;
//VARIENT
export const GET_VARIANTS =`${PRODUCT_SERVICE}/manage/product/{{id}}/variants`;
export const UPDATE_VARIANTS =`${PRODUCT_SERVICE}/manage/product/{{id}}/variants`;
export const UPDATE_PRODUCT_VARIANT =`${PRODUCT_SERVICE}/manage/product/{{id}}/variant`;
export const GET_PRODUCT_LIST = `${PRODUCT_SERVICE}/manage/product/search`;

//QUERY
export const QUERYLIST = `${USER_SERVICE}/manage/queries?page={{page}}&sort_by={{latest}}`;
export const GET_QUERY = `${USER_SERVICE}/manage/queries/{{id}}`;

//SEO
export const SEO = `${PRODUCT_SERVICE}/manage/product/{{id}}/seo`;

//PRODUCT-INFO
export const GET_CATEGORY_INFO = `${PRODUCT_SERVICE}/manage/category/all`;
export const GET_BRAND_INFO = `${PRODUCT_SERVICE}/manage/brand/all`;
export const GET_FLAVOR_INFO = `${PRODUCT_SERVICE}/manage/flavor/all`;
export const GET_CERTIFICATION =`${PRODUCT_SERVICE}/certification/`;
export const GET_INFO =`${PRODUCT_SERVICE}/manage/product/{{id}}/detail`;
export const CREATE_PRODUCT = `${PRODUCT_SERVICE}/manage/product`;
export const GET_PHOTO =`${PRODUCT_SERVICE}/manage/product/{{id}}/images`;
export const GET_COUNTRY =`${PRODUCT_SERVICE}/manage/country`;
export const GET_PRICE =`${PRODUCT_SERVICE}/manage/product/{{id}}/price`;


//USERS
export const ADMINLIST = `${USER_SERVICE}/admin/all?page={{page}}&q={{search}}`;
export const GET_ADMIN_DETAILS = `${USER_SERVICE}/admin/{{id}}/view`;
export const ADD_ADMIN = `${USER_SERVICE}/admin/create`;
export const ADMIN_LIST_EDIT = `${USER_SERVICE}/admin/{{id}}/edit`;


//EXCEL EXPORT
export const CUSTOMER_EXCEL_LIST = `${USER_SERVICE}/customer/all`;
export const ORDER_EXCEL_LIST = `${ORDER_SERVICE}/manage/order/all`;
export const PRODUCT_EXCEL_LIST = `${PRODUCT_SERVICE}/manage/product/all`;

//WISHLIST
export const WISH_LIST = `${PRODUCT_SERVICE}/manage/wishlist/{{id}}?page={{page}}`;

//SHOPPING CART
export const SHOPPING_CART_LIST = `${ORDER_SERVICE}/manage/cart/{{id}}/order`;

//INQUIRY
export const ADVERTISE_WITH_US_LIST = `${USER_SERVICE}/manage/advertise?page={{page}}&q={{search}}`;
export const GET_ADVERTISE_WITH_US_DETAILS = `${USER_SERVICE}/manage/advertise/{{id}}/view`;
export const SELL_ON_FITCART_LIST = `${USER_SERVICE}/manage/sell?page={{page}}&q={{search}}`;
export const GET_SELL_ON_FITCART_DETAILS = `${USER_SERVICE}/manage/sell/{{id}}/view`;
export const MARKETING_AND_SPONSORSHIP_LIST = `${USER_SERVICE}/manage/sponsorship?page={{page}}&q={{search}}`;
export const GET_MARKETING_AND_SPONSORSHIP_DETAILS = `${USER_SERVICE}/manage/sponsorship/{{id}}/view`;
export const GET_BULK_BUY_LIST = `${USER_SERVICE}/manage/bulkbuy?page={{page}}&q={{search}}`;
export const GET_Bulk_BUY_VIEW_DETAILS = `${USER_SERVICE}/manage/bulkbuy/{{id}}/view`;
export const FEEDBACK_LIST = `${USER_SERVICE}/manage/feedback?page={{page}}&q={{search}}`;
export const GET_FEEDBACK_DETAILS = `${USER_SERVICE}/manage/feedback/{{id}}/view`;
export const GET_AFFILIATE_MARKETING_LIST = `${USER_SERVICE}/manage/affiliate?page={{page}}&q={{search}}`;
export const GET_AFFILIATE_MARKETING_VIEW_DETAILS = `${USER_SERVICE}/manage/affiliate/{{id}}/view`;
export const SUBSCRIPTION_LIST = `${USER_SERVICE}/manage/subscribe?page={{page}}&q={{search}}`;
export const SUBSCRIPTION_LIST_EDIT = `${USER_SERVICE}/manage/subscribe/{{id}}/edit`;
export const TRUSTED_HEALTH_LIST = `${PRODUCT_SERVICE}/manage/trusthealth?page={{page}}`;
export const TRUSTED_HEALTH_DETAILS = `${PRODUCT_SERVICE}/manage/trusthealth/{{id}}/view`;
export const TRUSTED_HEALTH_EDIT = `${PRODUCT_SERVICE}/manage/trusthealth/{{id}}/edit`;
export const TRUSTED_HEALTH_CREATE = `${PRODUCT_SERVICE}/manage/trusthealth/add`;
export const TRUSTED_HEALTH_DELETE = `${PRODUCT_SERVICE}/manage/trusthealth/{{id}}/delete`;
export const EMAIL_SUPPORT_LIST =`${USER_SERVICE}/manage/email/support?page={{page}}&q={{search}}`;
export const EMAIL_SUPPORT_VIEW=`${USER_SERVICE}/manage/email/support/{{id}}/view`;

//SPORTS
export const SPORTS_LIST = `${PRODUCT_SERVICE}/manage/sports?page={{page}}&q={{search}}`;
export const SPORTS_VIEW = `${PRODUCT_SERVICE}/manage/sports/{{id}}`;
export const SPORTS_EDIT = `${PRODUCT_SERVICE}/manage/sports/{{id}}`;
export const SPORTS_CREATE = `${PRODUCT_SERVICE}/manage/sports`;
export const SPORTS_DELETE = `${PRODUCT_SERVICE}/manage/sports/{{id}}/delete`;

//GOALS
export const GOALS_LIST = `${PRODUCT_SERVICE}/manage/goals?page={{page}}&q={{search}}`;
export const GOALS_VIEW = `${PRODUCT_SERVICE}/manage/goals/{{id}}`;
export const GOALS_EDIT = `${PRODUCT_SERVICE}/manage/goals/{{id}}`;
export const GOALS_CREATE = `${PRODUCT_SERVICE}/manage/goals`;
export const GOALS_DELETE = `${PRODUCT_SERVICE}/manage/goals/{{id}}/delete`;

//DIET
export const DIET_LIST = `${PRODUCT_SERVICE}/manage/diets?page={{page}}&q={{search}}`;
export const DIET_VIEW = `${PRODUCT_SERVICE}/manage/diets/{{id}}`;
export const DIET_EDIT = `${PRODUCT_SERVICE}/manage/diets/{{id}}`;
export const DIET_CREATE = `${PRODUCT_SERVICE}/manage/diets`;
export const DIET_DELETE = `${PRODUCT_SERVICE}/manage/diets/{{id}}/delete`;

//ADDRESS
export const CUSTOMER_ADDRESS_EDIT = `${USER_SERVICE}/customer/edit/address/{{id}}`;
export const CUSTOMER_ADDRESS_ADD = `${USER_SERVICE}/customer/add/address/{{id}}`;
export const STATE=`${USER_SERVICE}/state/`;

//CANCEL
export const CANCEL=`${ORDER_SERVICE}/manage/order/cancelled/all?page={{page}}&q={{search}}`;

// BULK EDIT PRODUCT

export const  BULK_EDIT_PRODUCT =`${PRODUCT_SERVICE}/manage/product?page={{page}}&q={{search}}`
export const UPDATE_PRICE = `${PRODUCT_SERVICE}/manage/product/{{id}}/price`


//BANNER
export const BANNER_LIST=`${PRODUCT_SERVICE}/manage/banner?page={{page}}`;
export const BANNER_VIEW = `${PRODUCT_SERVICE}/manage/banner/{{id}}/view`;
export const BANNER_EDIT = `${PRODUCT_SERVICE}/manage/banner/{{id}}/edit`;
export const BANNER_CREATE = `${PRODUCT_SERVICE}/manage/banner`;
export const BANNER_DELETE = `${PRODUCT_SERVICE}/manage/banner/{{id}}/delete`;


//DEALS
export const DEALS_LIST = `${USER_SERVICE}/manage/deals?page={{page}}&q={{search}}`;
export const DEALS_VIEW = `${USER_SERVICE}/manage/deals/{{id}}/view`;
export const DEALS_EDIT = `${USER_SERVICE}/manage/deals/{{id}}`;
export const DEALS_CREATE = `${USER_SERVICE}/manage/deals`;
export const DEALS_DELETE = `${USER_SERVICE}/manage/deals/{{id}}/delete`;


//COUPON
export const COUPON_LIST = `${ORDER_SERVICE}/manage/coupon?page={{page}}&q={{search}}`;
export const COUPON_VIEW = `${ORDER_SERVICE}/manage/coupon/{{id}}/view`;
export const COUPON_EDIT = `${ORDER_SERVICE}/manage/coupon/{{id}}/edit`;
export const COUPON_CREATE = `${ORDER_SERVICE}/manage/coupon`;
export const COUPON_LOG =`${ORDER_SERVICE}/manage/coupon/logs?page={{page}}&q={{search}}`;

//ARTICLES
export const TYPELIST  = `${USER_SERVICE}/manage/article/type?page={{page}}&q={{search}}`;
export const GET_TYPE_DETAILS =`${USER_SERVICE}/manage/article/{{id}}/view`;
export const GET_TYPE_EDIT =`${USER_SERVICE}/manage/article/{{id}}/type`;
export const GET_TYPE_CREATE=`${USER_SERVICE}/manage/article/type`;
export const CATEGORY_LIST= `${USER_SERVICE}/manage/article/category?page={{page}}&q={{search}}`;
export const GET_CATEGORY_DETAILS_ARTICLE =`${USER_SERVICE}/manage/article/{{id}}/category/view`;
export const GET_CATEGORY_EDIT_ARTICLE =`${USER_SERVICE}/manage/article/{{id}}/category`;
export const GET_CATEGORY_CREATE_ARTICLE=`${USER_SERVICE}/manage/article/category`;
export const AUTHOR_LIST= `${USER_SERVICE}/manage/article/author?page={{page}}&q={{search}}`;
export const GET_AUTHOR_DETAILS_ARTICLE =`${USER_SERVICE}/manage/article/{{id}}/author/view`;
export const GET_AUTHOR_EDIT_ARTICLE =`${USER_SERVICE}/manage/article/{{id}}/author`;
export const GET_AUTHOR_CREATE_ARTICLE=`${USER_SERVICE}/manage/article/author`;
export const CONTENT_LIST= `${USER_SERVICE}/manage/article?page={{page}}&q={{search}}`;
export const GET_CONTENT_DETAILS_ARTICLE =`${USER_SERVICE}/manage/article/{{id}}`;
export const GET_ALL_CATEGORY =`${USER_SERVICE}/manage/article/category/all`;
export const GET_ALL_TYPE=`${USER_SERVICE}/manage/article/type/all`;
export const GET_ALL_AUTHOR =`${USER_SERVICE}/manage/article/author/all`;

export const GET_CONTENT_CREATE_ARTICLE=`${USER_SERVICE}/manage/article`;
export const GET_CONTENT_EDIT_ARTICLE =`${USER_SERVICE}/manage/article/{{id}}/edit`;
export const GET_CONTENT_DELETE_ARTICLE =`${USER_SERVICE}/manage/article/{{id}}/delete`;




//GST
export const GST_LIST = `${ORDER_SERVICE}/manage/gst?page={{page}}&q={{search}}`;
export const GST_VIEW = `${ORDER_SERVICE}/manage/gst/{{id}}/view`;
export const GST_EDIT = `${ORDER_SERVICE}/manage/gst/{{id}}/edit`;
export const GST_CREATE = `${ORDER_SERVICE}/manage/gst`;
export const GST_DROPDOWN = `${ORDER_SERVICE}/manage/gst/all`;


//CERTIFICATION
export const CERTIFICATION_LIST = `${PRODUCT_SERVICE}/manage/certification/?page={{page}}&q={{search}}`;
export const CERTIFICATION_VIEW = `${PRODUCT_SERVICE}/manage/certification/{{id}}`;
export const CERTIFICATION_EDIT = `${PRODUCT_SERVICE}/manage/certification/{{id}}`;
export const CERTIFICATION_CREATE = `${PRODUCT_SERVICE}/manage/certification`;


//REVIEW
export const REVIEW_LIST = `${PRODUCT_SERVICE}/manage/review/{{id}}?page={{page}}&sort_by={{search}}`;
export const REVIEW_VIEW = `${PRODUCT_SERVICE}/manage/review/{{id}}/view`;
export const REVIEW_EDIT = `${PRODUCT_SERVICE}/manage/review/{{id}}/edit`;
export const REVIEW_CREATE = `${PRODUCT_SERVICE}/manage/review/{{id}}/add`;


//TESTIMONIAL
export const TESTIMONIAL_LIST = `${USER_SERVICE}/manage/testimonial?page={{page}}&q={{search}}`;
export const TESTIMONIAL_VIEW = `${USER_SERVICE}/manage/testimonial/{{id}}/view`;
export const TESTIMONIAL_EDIT = `${USER_SERVICE}/manage/testimonial/{{id}}/edit`;
export const TESTIMONIAL_CREATE = `${USER_SERVICE}/manage/testimonial/add`;
export const TESTIMONIAL_DELETE = `${USER_SERVICE}/manage/testimonial/{{id}}/delete`;
export const TESTIMONIAL_DROPDOWN_CATEGORY = `${USER_SERVICE}/manage/testimonial/category/all`;


//TESTIMONIAL CATEGORY
export const TESTIMONIAL_CATEGORY_LIST = `${USER_SERVICE}/manage/testimonial/category?page={{page}}&q={{search}}`;
export const TESTIMONIAL_CATEGORY_VIEW = `${USER_SERVICE}/manage/testimonial/category/{{id}}/view`;
export const TESTIMONIAL_CATEGORY_EDIT = `${USER_SERVICE}/manage/testimonial/category/{{id}}/edit`;
export const TESTIMONIAL_CATEGORY_CREATE = `${USER_SERVICE}/manage/testimonial/category/add`;
export const TESTIMONIAL_CATEGORY_DELETE = `${USER_SERVICE}/manage/testimonial/category/{{id}}/delete`;


//TESTIMONIAL GALLERY
export const TESTIMONIAL_GALLERY_LIST = `${USER_SERVICE}/manage/testimonial/gallery?page={{page}}&q={{search}}`;
export const TESTIMONIAL_GALLERY_VIEW = `${USER_SERVICE}/manage/testimonial/gallery/{{id}}/view`;
export const TESTIMONIAL_GALLERY_EDIT = `${USER_SERVICE}/manage/testimonial/gallery/{{id}}/edit`;
export const TESTIMONIAL_GALLERY_CREATE = `${USER_SERVICE}/manage/testimonial/gallery/add`;
export const TESTIMONIAL_GALLERY_DELETE = `${USER_SERVICE}/manage/testimonial/gallery/{{id}}/delete`;

