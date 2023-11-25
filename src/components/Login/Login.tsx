import {Component} from "react";
import style from "./Login.module.css"
import React from 'react';

class Login extends Component<any, any> {
    render() {
        return (
            <div>
                <form className={style.login} action="">
                    <div>
                        <input className={style.login_input} type="email"/>
                    </div>
                    <div>
                        <input className={style.login_input} type="password"/>
                    </div>
                    <div>
                        <input className={style.login_checkbox} type="checkbox"/>
                        <label htmlFor="checkbox" >Remember Me</label>
                    </div>
                    <div>
                        <button className={style.login_btn} type="submit">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;