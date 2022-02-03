import React, {Component} from "react";
import Link from "next/link";
import Router from 'next/router'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {toast } from 'react-toastify';



export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            number:""
        }
    }


    render() {
        return (
            <div  data-component='login'>
                <div className="admin-login">
                    <span>admin login</span>
                </div>
                <div className="login-form">
                    <label>Email<span className="mandatory-star">*</span></label>
                    <input type="text"  placeholder="Enter your email address" />
                </div>
                <div className="login-form">
                    <label>Password<span className="mandatory-star">*</span></label>
                    <input type="text"  placeholder="Enter your password" />
                </div>
                <div className="custom-btn " onClick={()=>Router.push("/dashboard")}>
                    <span>Login </span>
                    <ArrowForwardIosIcon className='arrow-icon'/>
                </div>
                
            </div>
        )
    }
}
