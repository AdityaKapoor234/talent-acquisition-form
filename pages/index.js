import Head from 'next/head'
import Image from 'next/image'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {APP_NAME} from "../utils/constant";
import AuthLayoutComponent from "../component/layouts/auth-layout/auth-layout";
import Login from '../component/login/login';

export default function Home() {

  return (
    <div>
      <Head>
        <title>{APP_NAME} - login</title>
        <meta name="description" content="Trusted Brands. Better Health." />
        <link rel="icon" href="/fitcart.ico" />
        </Head>

      <main>
      <AuthLayoutComponent image={"/images/login.png"}>
        <div className='row justify-content-center margin-login '>
          <div className='col-8 p-0 '>
            <Login/>
          </div>
        </div>
      </AuthLayoutComponent>
      </main>

      
    </div>
  )
}
