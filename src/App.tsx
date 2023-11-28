import "./App.css";
import Header from "./components/Header/Header";
import Todolists from "./components/Todolists/Todolists";
import {Navigate, Route, Routes} from "react-router-dom";
import Snackbars from "./components/Snackbar/Snackbar";
import LoginMUI from "./components/Login/LoginMUI";
import {useDispatch, useSelector} from "react-redux";
import {initializeAppTC} from "./state/reducers/auth-reducer";
import {AppDispatchThunkType, AppStoreType} from "./state/store";
import {useEffect} from "react";
import Loading from "./components/Loading";

const App = () => {
    const dispatch = useDispatch<AppDispatchThunkType>()
    const initialize = useSelector<AppStoreType, boolean>(state => state.auth.isInitialize)
    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    if (!initialize) {
        return <Loading />
    }
    return (
        <div className="App">
            <Header/>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Todolists/>}/>
                    <Route path='/login' element={<LoginMUI/>}/>

                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </div>
            <Snackbars/>
        </div>
    );
}

export default App;
