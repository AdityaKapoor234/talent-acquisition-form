import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {APP_NAME} from "../utils/constant";
import DashboardLayoutComponent from "../component/layouts/dashboard-layout/dashboard-layout";
import CustomerComponent from "../component/customer/customer-component";
import Pagination from '@mui/material/Pagination';

export default function Customer() {

  return (
    <div>
      <Head>
        <title>{APP_NAME} - Customer</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
        </Head>

      <main>
        <DashboardLayoutComponent>
            <div className='row border-box'>
                <div className ="col-md-12">
                    <div className='hamburger'><span>customer / </span>customer</div>
                    <div className='page-name'>Customer</div>
                </div>
            </div>
            <div className='row sticky-scroll'>
                <div className='col-md-12 '>
                    <CustomerComponent/>
                </div>
            </div>
            <div className='pagination'>
                <Pagination count={10} showFirstButton showLastButton size="small" />

            </div>
        </DashboardLayoutComponent>
      </main>

    </div>
  )
}