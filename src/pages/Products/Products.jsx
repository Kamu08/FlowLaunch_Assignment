
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Products = () => {
	const exchangeRate = 83.5;

	const [allProducts, setAllProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		const api = async () => {
			try {
				const res = await axios("https://dummyjson.com/products");
				setAllProducts(res.data.products);
				setFilteredProducts(res.data.products);

				console.log(res.data.products);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};
		api();
	}, []);

	const handleSearch = (event) => {
		const term = event.target.value;
		setSearchTerm(term);
		const filtered = allProducts.filter((product) =>
			product.title.toLowerCase().includes(term.toLowerCase())
		);
		setFilteredProducts(filtered);
	};

	if (loading)
		return (
			<div className='flex justify-center items-center h-screen'>
				Loading...
			</div>
		);
	if (error)
		return (
			<div className='flex justify-center items-center h-screen'>
				Error fetching products
			</div>
		);

	return (
		<section className='bg-[#f8f6f3] text-gray-700 body-font pt-5 px-20'>
			<div className='container mx-auto px-5 py-24'>
				<h1 className='text-4xl font-extrabold text-center mb-12'>
					Our Premium Products
				</h1>
				<div className='flex justify-center mb-8'>
					<input
						type='text'
						value={searchTerm}
						onChange={handleSearch}
						placeholder='Search for products...'
						className='px-4 py-2 w-full max-w-lg rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm'
					/>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{filteredProducts.map((product) => (
						<div
							className='bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105'
							key={product.id}
						>
							<Link
								to={`/productdesc/${product.id}`}
								className='block relative h-60 overflow-hidden'
							>
								<div className='absolute inset-0 bg-slate-300 opacity-20'></div>
								<img
									className='w-full h-full object-contain object-center transition-transform transform'
									src={product.thumbnail}
									alt={product.title}
								/>
							</Link>

							<div className='p-6'>
								
								<div className='flex items-center justify-between  py-1'>
									<div>
									<svg
											className='w-6 h-6  text-red-600  fill-current '
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
										>
											<path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
										</svg>
									</div>
									<div className='bg-yellow-200 py-1.5 px-6 rounded-full'>
										<p className='text-xs text-yellow-500'>
											{product.availabilityStatus}
										</p>
									</div>
								</div>
								<h1 className='title-font text-xl font-semibold text-gray-900 mb-3'>
									{product.title}
								</h1>

								<div className='flex items-center mb-4'>
									{product.discountPercentage ? (
										<>
											<span className='text-gray-900  '>
												Rs.
												<span className='text-lg'>
													{(
														((product.price *
															(100 - product.discountPercentage)) /
															100) *
														exchangeRate
													).toFixed(0)}
												</span>
												<del className='pl-1 font-thin text-gray-400 text-sm '>
													Rs.{(product.price * exchangeRate).toFixed(0)}
												</del>
											</span>
											<span className='text-orange-500 text-xs ml-1'>
												({product.discountPercentage}% OFF)
											</span>
										</>
									) : (
										<span className='text-gray-900 '>
											Rs.{(product.price * exchangeRate).toFixed(0)}
										</span>
									)}{" "}
								</div>
								<div className='flex items-center justify-between'>
									<button className='bg-[#924d3d] text-white px-2 py-2 rounded-md hover:bg-[#642228] transition duration-300'>
										Buy Now
									</button>
									<button className='bg-[#924d3d] text-white px-2 py-2 rounded-md hover:bg-[#642228] transition duration-300'>
										Add to Cart
									</button>
									
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Products;
