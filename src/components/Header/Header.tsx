import {Component} from "react";
import {NavLink} from "react-router-dom";
import style from "./Header.module.css"
import {connect} from "react-redux";
import {logOutTC} from "../../state/reducers/auth-reducer";
import {AppStoreType} from "../../state/store";

const logo = "https://raw.githubusercontent.com/mustafaynk/todolist/master/appgallery/logo.png"

type PropsType = {
    logOutTC: () => void
    isLoggedIn: boolean
    initialize: boolean
}

class Header extends Component<PropsType, any> {
    onLogOutHandler = () => {
        this.props.logOutTC()
    }
    render() {
        console.log(this.props.isLoggedIn)
        return (
            <div className={style.header}>
                <NavLink to='/login'><img className={style.logo} src={logo} alt="logo"/></NavLink>
                <h1>TodoLists</h1>
                <div>
                    {
                        this.props.isLoggedIn
                            ?
                            <button className={style.login_link} onClick={this.onLogOutHandler}>Logout</button>
                            :
                            <NavLink className={style.login_link} to='/login'>Login</NavLink>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: AppStoreType) => {
    return {
        initialize: state.auth.isInitialize,
        isLoggedIn: state.auth.isLoggedIn
    }
}

export default connect(mapStateToProps, {logOutTC})(Header)