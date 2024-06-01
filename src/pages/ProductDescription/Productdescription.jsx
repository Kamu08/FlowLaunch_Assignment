
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Productdescription = () => {
	const exchangeRate = 83.5;

	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [amount, setAmount] = useState(1);
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await axios.get(`https://dummyjson.com/products/${id}`);
				setProduct(res.data);
				setLoading(false);
			} catch (err) {
				setError(err);
				setLoading(false);
			}
		};
		fetchProduct();
	}, [id]);

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

	const renderStars = (rating) => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			if (i <= rating) {
				stars.push(
					<svg
						key={i}
						className='w-5 h-5 text-yellow-500'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.28 3.946a1 1 0 00.95.69h4.151c.969 0 1.372 1.24.588 1.81l-3.357 2.447a1 1 0 00-.364 1.118l1.28 3.946c.3.921-.755 1.688-1.54 1.118L10 13.014l-3.357 2.447c-.784.57-1.838-.197-1.54-1.118l1.28-3.946a1 1 0 00-.364-1.118L2.661 9.373c-.784-.57-.381-1.81.588-1.81h4.151a1 1 0 00.95-.69l1.28-3.946z'></path>
					</svg>
				);
			} else {
				stars.push(
					<svg
						key={i}
						className='w-5 h-5 text-gray-300'
						fill='currentColor'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.28 3.946a1 1 0 00.95.69h4.151c.969 0 1.372 1.24.588 1.81l-3.357 2.447a1 1 0 00-.364 1.118l1.28 3.946c.3.921-.755 1.688-1.54 1.118L10 13.014l-3.357 2.447c-.784.57-1.838-.197-1.54-1.118l1.28-3.946a1 1 0 00-.364-1.118L2.661 9.373c-.784-.57-.381-1.81.588-1.81h4.151a1 1 0 00.95-.69l1.28-3.946z'></path>
					</svg>
				);
			}
		}
		return stars;
	};

	return (
		product && (
			<section className='text-gray-600 bg-[#f8f6f3] body-font overflow-hidden'>
				<Link to='/' className='absolute text-blue-900 mt-5 ml-20 '>
					Back to Main Page →
				</Link>
				<div className='container px-5 py-20 mx-auto'>
					<div className='lg:w-4/5 mx-auto flex flex-wrap'>
						<div className='lg:w-1/2 w-full relative'>
							<div className='absolute inset-0 bg-slate-300 opacity-20'></div>
							<img
								alt='ecommerce'
								className='lg:w-full w-full lg:h-auto h-64 object-contain object-center rounded'
								src={product.thumbnail}
							/>
							<div className='flex mt-4'>
								{product.images.map((image, index) => (
									<img
										key={index}
										className='w-20 h-20 object-cover object-center rounded mr-2'
										src={image}
										alt={`product ${index + 1}`}
									/>
								))}
							</div>
						</div>
						<div className='lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0'>
							<h2 className='text-sm title-font text-violet-800 tracking-widest uppercase font-semibold'>
								{product.brand}
							</h2>
							<h1 className='text-gray-900 text-4xl title-font font-bold mb-2'>
								{product.title}
							</h1>
							<p className='leading-relaxed mb-6 text-gray-700'>
								{product.description}
							</p>

							<div className='flex items-center pb-5 border-b-2 border-gray-300 mb-6'>
								<div className='flex flex-col gap-3'>
									<div className='bg-green-200 py-1.5 px-6 rounded-full'>
										<p className='text-xs text-green-500'>
											{product.availabilityStatus}
										</p>
									</div>
									<span className='text-yellow-600 font-medium flex items-center'>
										{renderStars(product.rating)}
									</span>
								</div>
							</div>

							<div className='flex flex-row items-center gap-6 mb-6'>
								<div className='flex flex-row items-center'>
									<button
										className='bg-gray-200 px-3 py-1 rounded-lg text-violet-800 text-xl hover:bg-gray-300'
										onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
									>
										-
									</button>
									<span className='py-2 px-4 rounded-lg text-gray-900'>
										{amount}
									</span>
									<button
										className='bg-gray-200 px-3 py-1 rounded-lg text-violet-800 text-xl hover:bg-gray-300'
										onClick={() => setAmount((prev) => prev + 1)}
									>
										+
									</button>
								</div>
							</div>

							<div className='flex items-center pb-5 border-b-2 border-gray-300 mb-6'>
								<div className='flex items-center my-4'>
									{product.discountPercentage ? (
										<>
											<span className='text-gray-900 text-2xl font-bold'>
												Rs.{" "}
												{(
													((product.price *
														(100 - product.discountPercentage)) /
														100) *
													exchangeRate
												).toFixed(0)}
											</span>
											<del className='pl-2 text-gray-400 text-lg'>
												Rs. {(product.price * exchangeRate).toFixed(0)}
											</del>
											<span className='text-orange-500 text-sm ml-2'>
												({product.discountPercentage}% OFF)
											</span>
										</>
									) : (
										<span className='text-gray-900 text-2xl font-bold'>
											Rs. {(product.price * exchangeRate).toFixed(0)}
										</span>
									)}
								</div>
							</div>

							<div className='flex items-center space-x-4'>
								<button className='flex-grow text-white bg-[#924d3d] border-0 py-2 px-6 focus:outline-none hover:bg-[#642228] rounded'>
									Add to Cart
								</button>
								<button className='flex-grow text-white bg-[#924d3d] border-0 py-2 px-6 focus:outline-none hover:bg-[#642228] rounded'>
									Buy Now
								</button>
								<button className='rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-gray-700'>
									<svg
										fill='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										className='w-5 h-5'
										viewBox='0 0 24 24'
									>
										<path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
									</svg>
								</button>
							</div>
						</div>
					</div>
					<div className='mt-10'>
						<h2 className='text-3xl font-bold mb-6 text-gray-900'>
							Product Description
						</h2>

						<div className='pb-5 border-b-2 border-gray-200 mb-5'>
							<div className='flex flex-wrap'>
								<span className='mr-6 mb-3 text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Shipping:
									</strong>{" "}
									{product.shippingInformation}
								</span>
								<span className='mr-6 mb-3 text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>SKU:</strong>{" "}
									{product.sku}
								</span>
							</div>
						</div>

						<div className='pb-5 border-b-2 border-gray-200 mb-5'>
							<div className='flex flex-wrap'>
								<span className='mr-6 mb-3 text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Minimum Order Quantity:
									</strong>{" "}
									{product.minimumOrderQuantity}
								</span>
								<span className='mr-6 mb-3 text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Return Policy:
									</strong>{" "}
									{product.returnPolicy}
								</span>
								<span className='mr-6 mb-3 text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Warranty:
									</strong>{" "}
									{product.warrantyInformation}
								</span>
							</div>
						</div>

						<div className='mb-5 flex items-center border-b-2 border-gray-200'>
							<div className='mb-4'>
								<span className='text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Category:
									</strong>{" "}
									{product.category}
								</span>
							</div>
							<div className='mb-4 ml-7'>
								<span className='text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Stock:
									</strong>{" "}
									{product.stock}
								</span>
							</div>
						</div>

						<div className='pb-5 border-b-2 border-gray-200 mb-5'>
							<div className='flex flex-wrap'>
								<span className='mr-6 mb-3 text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Dimensions:
									</strong>{" "}
									{product.dimensions.height} x {product.dimensions.width} x{" "}
									{product.dimensions.depth} cm
								</span>
								<span className='mr-6 mb-3 text-lg text-gray-700'>
									<strong className='font-semibold text-gray-900'>
										Weight:
									</strong>{" "}
									{product.weight} kg
								</span>
							</div>
						</div>
					</div>

					<div className='mt-10'>
						<h2 className='text-2xl font-bold mb-4'>Reviews</h2>
						<div className='space-y-4'>
							{product.reviews.map((review, index) => (
								<div key={index} className='p-4 border rounded-lg'>
									<div className='flex items-center mb-2'>
										<div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray-200'>
											<span className='font-bold text-gray-600'>
												{review.reviewerName[0]}
											</span>
										</div>
										<div className='ml-3'>
											<h4 className='text-gray-900 font-semibold'>
												{review.reviewerName}
											</h4>
											<p className='text-sm text-gray-500'>
												{new Date(review.date).toLocaleDateString()}
											</p>
										</div>
									</div>
									<p className='text-gray-700'>{review.comment}</p>
									<p className='text-sm text-gray-600 flex'>
										Rating: {renderStars(product.rating)}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		)
	);
};

export default Productdescription;
