import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {APP_NAME, APP_TAGLINE, APP_IMAGE} from "../../../utils/constant";


export default function AuthLayoutComponent({children, image}) {

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content={APP_TAGLINE}
                />
                <meta
                    property="og:image"
                    content={APP_IMAGE}
                />
                <meta name="og:title" content={APP_NAME}/>
                <meta name="twitter:card" content="summary_large_image"/>
            </Head>
            <main className="auth-layout-body">
                <div className='container-fluid auth-layout-container'>
                    <div className='row auth-layout-row'>
                        <div className='col-md-6 auth-hero-container ' style={{background:`url(${image})`}}>
                        </div>
                        <div className='col-md-6 col-sm-12'>
                            <div className='row auth-margin'>
                                <div className='col-md-12 col-12 text-center h-70'>
                                    <img
                                        className='auth-logo'
                                        src='/images/tagline-logo.svg'
                                        alt='tagline-logo'
                                    />
                                </div>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
