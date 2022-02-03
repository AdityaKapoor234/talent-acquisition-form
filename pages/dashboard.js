import Head from 'next/head'
import Image from 'next/image'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {APP_NAME} from "../utils/constant";
import DashboardLayoutComponent from "../component/layouts/dashboard-layout/dashboard-layout";

export default function Dashboard() {

  return (
    <div>
      <Head>
        <title>{APP_NAME} - Dashborad</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
        </Head>

      <main>
        <DashboardLayoutComponent>
            
        </DashboardLayoutComponent>
      </main>

      
    </div>
  )
}