import {Component} from "react";
import style from "./Login.module.css"

class Login extends Component<any, any>{
    render() {
        return (
            <div className={style.login}>
                <form action="">
                    <input type="email"/>
                    <input type="password"/>
                    <label htmlFor="Remember Me">
                        <input type="checkbox"/>
                    </label>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;