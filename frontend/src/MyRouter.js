import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./components/home";
import Pagenotfound from './components/Pagenotfound';
import BuildPage from "./components/Buildpage";
import Register from "./components/register";
import Login from "./components/login";
import Orderpage from "./components/Orderpage";
import Contact from "./components/Contact"
import Cart from "./components/shoppingCart";
import OrderPlaced from "./components/OrderPlaced";

function MyRouter() {

    
    return (
        <div>
            <BrowserRouter>
                
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/build" element={<BuildPage />} />
                    <Route path="/order" element={<Orderpage />} />
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path = "/orderplaced" element={<OrderPlaced/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/*" element={<Pagenotfound />} />
                </Routes>

            </BrowserRouter>

        </div>
    )
}

export default MyRouter
