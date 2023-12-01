import {Outlet } from "react-router-dom";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Cart from '../components/cart';

export default function Layout() {
	return (
	  <>
		<Navigation />
		<Outlet />
		<Footer />
		<Cart />
	  </>
	);
}

