import "./App.css";
import Header from "./components/Header/Header";
import Todolists from "./components/Todolists/Todolists";
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";
import Snackbars from "./components/Snackbar/Snackbar";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <div className="container">
                <Routes>
                    <Route path='/' element={<Todolists/>}/>
                    <Route path='/login' element={<Login/>}/>

                    <Route path='/404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                </Routes>
            </div>
            <Snackbars/>
        </div>
    );
}

export default App;
