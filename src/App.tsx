import "./App.css";
import Header from "./components/Header/Header";
import Todolists from "./components/Todolists/Todolists";
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login/Login";

const App = () => {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route path='/' element={<Todolists />} />
                <Route path='/login' element={<Login/>} />
            </Routes>
        </div>
    );
}

export default App;
