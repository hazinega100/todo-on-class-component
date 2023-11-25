import {Component} from "react";
import {NavLink, Outlet} from "react-router-dom";
import style from "./Header.module.css"

const logo = "https://raw.githubusercontent.com/mustafaynk/todolist/master/appgallery/logo.png"

class Header extends Component<any, any>{
    render() {
        return (
            <div className={style.header}>
                <NavLink to='/login'><img className={style.logo} src={logo} alt="logo" /></NavLink>
                <h1>TodoLists</h1>
                <NavLink className={style.login_link} to='/login'>Login</NavLink>
                <Outlet />
            </div>
        )
    }
}

export default Header