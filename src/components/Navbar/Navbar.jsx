import React from "react";
import logo from "../../assets/logo.png";
const Navbar = () => {
	return (
		<div className=' px-10 pt-10 flex flex-row items-center justify-between border-b-4 bg-gray-100 border-gray-200 pb-4'>
			<a className='flex title-font font-medium items-center text-gray-900 '>
				<img src={logo} alt='' className='w-40 rounded-lg' />
			</a>
			<nav className='md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center'></nav>
			<button className='inline-flex text-white font-semibold items-center bg-blue-600  py-1 px-3 focus:outline-none hover:bg-blue-500 rounded-full text-base'>
				Contact Us
			</button>
		</div>
	);
};

export default Navbar;
