import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import {useEffect, useState} from "react";
import Router from "next/router"
import {APP_NAME, APP_TAGLINE, APP_IMAGE} from "../../../utils/constant";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';


export default function DashboardLayoutComponent({children}) {

    const [tab, setTab] = useState(1);
    const [tabSale, setTabSale] = useState(false);
    const [tabCatalog, setTabCatalog] = useState(false);
    const [tabCustomer, setTabCustomer] = useState(false);
    const [categary, setCategary] = useState(0);
    const [logout, setLogout] = useState(false);

    const handleCategary=(url,value)=>{
        Router.push(url)
        setCategary(value)
        setTab(0)
    }
    const handleDashboard=()=>{
        Router.push("/dashboard")
        setTab(1)
        setCategary(0)
    }
    const handleLogout=()=>{
        Router.push("/")
    }

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
            <main className="dashboard-background">
                <div className='container-fluid '>
                    <div className='header'>
                        <img src="/images/fitcart-logo.png" className="img-fluid" alt="logo"/>
                        {logout &&
                            <ul>
                                <li onClick={()=>handleLogout()}><LogoutIcon className='logout-icon'/>Logout</li>
                            </ul>
                        }
                        <div className='login'>admin@gmail.com <ArrowDropDownIcon className={logout ?'drop-icon icon-drop':'drop-icon'} onClick={()=>{setLogout(!logout)}}/></div>
                    </div>
                    <div className='main-module'>
                        <div className='module-menu'>
                            <div className='menu'>
                                <div className={tab ===1 ?'menu-btn active':'menu-btn'} onClick={()=> handleDashboard()}>
                                    <span>
                                        {tab ===1 ?<DashboardIcon className='outline-icon'/>:<DashboardOutlinedIcon className='outline-icon'/>}
                                        dashboard
                                    </span>
                                </div>
                                <div className={tabSale ?'menu-btn active':'menu-btn'} onClick={()=> setTabSale(!tabSale)}>
                                    <span>
                                        {tabSale ?<LocalGroceryStoreIcon className='outline-icon'/>:<LocalGroceryStoreOutlinedIcon className='outline-icon'/>}
                                        sales
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon'/>
                                </div>
                                    {tabSale  &&
                                        <ul>
                                            <li className={categary=== 7 && "sub_active"} onClick={()=> handleCategary("#",7)}>order</li>
                                        </ul>
                                    }
                                <div className={tabCatalog  ?'menu-btn active':'menu-btn'} onClick={()=> setTabCatalog(!tabCatalog)}>
                                    <span>
                                        {tabCatalog ?<CategoryIcon className='outline-icon'/>:<CategoryOutlinedIcon className='outline-icon'/>}
                                        catalog
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon'/>
                                </div>
                                    {tabCatalog &&
                                        <ul>
                                            <li className={categary=== 1 && "sub_active"} onClick={()=> handleCategary("#",1)}>category</li>
                                            <li className={categary=== 2 && "sub_active"} onClick={()=> handleCategary("#",2)}>ingredient</li>
                                            <li className={categary=== 3 && "sub_active"} onClick={()=> handleCategary("#",3)}>classification</li>
                                            <li className={categary=== 4 && "sub_active"} onClick={()=> handleCategary("#",4)}>brand</li>
                                            <li className={categary=== 5 && "sub_active"} onClick={()=> handleCategary("#",5)}>product</li>
                                            <li className={categary=== 6 && "sub_active"} onClick={()=> handleCategary("#",6)}>inventory</li>
                                        </ul>
                                    }
                                <div className={tabCustomer ?'menu-btn active':'menu-btn'} onClick={()=> setTabCustomer(!tabCustomer)}>
                                    <span>
                                        {tabCustomer ? <GroupIcon className='outline-icon'/>:<GroupOutlinedIcon className='outline-icon'/>}
                                        customer
                                    </span>
                                    <ArrowDropDownIcon className='drop-icon'/>
                                </div>
                                    {tabCustomer &&
                                        <ul>
                                            <li className={categary=== 8 && "sub_active"} onClick={()=> handleCategary("#",8)}>customer</li>
                                            <li className={categary=== 9 && "sub_active"} onClick={()=> handleCategary("#",9)}>customer type</li>
                                        </ul>
                                    }
                                    
                            </div>
                        </div>
                        <div className='main-componemt'>
                            {children}
                        </div>
                       
                    </div>
                </div>
            </main>
        </div>
    )
}
