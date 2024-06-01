import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Productdescription from "./pages/ProductDescription/Productdescription";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Products from "./pages/Products/Products";

function App() {

	return (
		<BrowserRouter>
			<Navbar />
			<Routes>
				<Route path="/" element={<Products/>}/>
				<Route path="/productdesc/:id" element={<Productdescription product={Products}/>}  />
			</Routes>

			<Footer />
		</BrowserRouter>
	);
}

export default App;
