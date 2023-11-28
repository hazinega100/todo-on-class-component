import {Component} from "react";
import {NavLink} from "react-router-dom";
import style from "./Header.module.css"
import {connect} from "react-redux";
import {logOutTC} from "../../state/reducers/auth-reducer";

const logo = "https://raw.githubusercontent.com/mustafaynk/todolist/master/appgallery/logo.png"

type PropsType = {
    logOutTC: () => void
}

class Header extends Component<PropsType, any>{
    onLogOutHandler() {
        this.props.logOutTC()
    }
    render() {
        return (
            <div className={style.header}>
                <NavLink to='/login'><img className={style.logo} src={logo} alt="logo" /></NavLink>
                <h1>TodoLists</h1>
                <div>
                    <NavLink className={style.login_link} to='/login'>Login</NavLink>
                    <NavLink className={style.login_link} onClick={this.onLogOutHandler} to='/login'>Logout</NavLink>
                </div>
            </div>
        )
    }
}

export default connect(null, {logOutTC})(Header)