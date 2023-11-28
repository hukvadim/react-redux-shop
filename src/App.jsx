import { BrowserRouter, Routes, Route } from "react-router-dom";

// Сторінки сайту
import NoMatch from "./pages/NoMatch";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Delivery from "./pages/Delivery";
import Contacts from "./pages/Contacts";
import Order from "./pages/Order";
import Search from "./pages/Search";
import Category from "./pages/Category";

function App() {

    return (
        <BrowserRouter basename="/react-redux-shop">
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={`/category/:categoryId`} element={<Category />} />
                    <Route path={`/about`} element={<About />} />
                    <Route path={`/delivery`} element={<Delivery />} />
                    <Route path={`/contacts`} element={<Contacts />} />
                    <Route path={`/search`} element={<Search />} />
                    <Route path={`/order`} element={<Order />} />
                    <Route path={`*`} element={<NoMatch />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
