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
export const ADMIN_LOGIN = `http://65.1.17.188:5000/admin`