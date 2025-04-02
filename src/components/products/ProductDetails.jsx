import React, { useEffect, useState } from 'react';
import { Link, Links } from 'react-router-dom';
import ImageGallery from './ImageGallery';
import { useDispatch, useSelector } from 'react-redux';
import { productDetailsAction } from '../../redux/actions/productAction';
import { useParams } from 'react-router-dom';
import SpecificationTable from './SpecificationTable';
import { Helmet } from 'react-helmet-async';
import RatingProgressBar from '../common/RatingProgressBar';

const ProductDetails = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;;
    const { details } = useParams();
    const dispatch = useDispatch();

    const { product, loading: productsLoading, error: productsError } = useSelector((state) => state.productDetails);
    const [ratingsData, setRatingsData] = useState({ 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);


    useEffect(() => {
        dispatch(productDetailsAction(details));
    }, [dispatch, details]);

    useEffect(() => {
        if (product?.reviews?.length) {
            const newRatingsData = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            let totalSum = 0;
            let totalCount = 0;

            product.reviews.forEach((review) => {
                if (review.rating >= 1 && review.rating <= 5) {
                    newRatingsData[review.rating]++;
                    totalSum += review.rating;
                    totalCount++;
                }
            });

            setRatingsData(newRatingsData);
            setAverageRating(totalCount ? (totalSum / totalCount).toFixed(1) : 0);
            setTotalRatings(totalCount);
        }
    }, [product]);
    // console.log(averageRating)
    // const ratingsData = {
    //     5: 120,
    //     4: 45,
    //     3: 30,
    //     2: 10,
    //     1: 5,
    // };




    const scrollToSection = (spec) => {
        const section = document.getElementById(spec);
        if (section) {
            const offsetTop = section.offsetTop;
            const spaceFromTop = 90; // Add some space from the top (in pixels)
            window.scrollTo({
                top: offsetTop - spaceFromTop,
                behavior: "smooth",
            });
        }
    };

    const updatedImages = product?.imageUrls?.map((img) => `${BASE_URL}${img}`) || [];

    return (
        <div className='w-full max-w-6xl mx-auto p-4'>
            <Helmet>
                <title>{product?.name}</title>
                <meta name={product?.name} content={product?.name} />
            </Helmet>

            {/* Product Name */}
            <div className='bg-white p-6 text-2xl font-bold mb-1 text-center md:text-left'>{product?.name}</div>

            {/* Main Product Details */}
            <div className='flex flex-col md:flex-row gap-6 bg-white p-6'>
                {/* Left Section: Image Gallery */}
                <div className='w-full md:w-1/2 lg:w-1/3 border border-slate-300 p-4 rounded-lg'>
                    {product && product.imageUrls ? (
                        <ImageGallery images={updatedImages} />
                    ) : (
                        <p className='text-center text-slate-500'>Loading images...</p>
                    )}
                </div>

                {/* Right Section: Product Details */}
                <div className='w-full md:w-1/2 lg:w-2/3 border border-slate-300 p-4 rounded-lg'>
                    <h3 className='font-bold text-xl mb-4'>{product?.name}</h3>
                    <p className='text-lg mb-4 text-slate-700'>Price: Rs. {product?.price}</p>

                    {/* Seller Links */}
                    <div className='flex flex-col gap-4 mb-6'>
                        {product?.sellers.map((seller, index) => (
                            <div key={index} className='flex flex-col sm:flex-row justify-between items-center p-3 border border-slate-200 rounded-lg'>
                                <Link to={seller.link} className='w-16 h-16 mb-2 sm:mb-0'>
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT6ppYvn4kCipfwvI3NG3v4eXyH3EGxtRJnA&s" alt="Seller Logo" className='w-full h-full object-contain' />
                                </Link>
                                <div className='flex items-center gap-4'>
                                    <p className='text-lg font-semibold'>Rs. {product?.price}</p>
                                    <Link to={seller.link} className='bg-red-500 text-white py-2 px-4 rounded uppercase hover:bg-red-600 transition-colors'>
                                        Go to Store
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Key Specifications */}
                    <div className='mb-6'>
                        <h2 className='text-xl font-semibold mb-4'>Key Specifications</h2>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div className='p-3 border border-slate-200 rounded-lg'>
                                <h3 className='font-semibold'>Performance</h3>
                                <p className='text-slate-600'>{product?.performance?.cpu}</p>
                            </div>
                            <div className='p-3 border border-slate-200 rounded-lg'>
                                <h3 className='font-semibold'>Display</h3>
                                <p className='text-slate-600'>{product?.display?.screenSize}</p>
                            </div>
                            <div className='p-3 border border-slate-200 rounded-lg'>
                                <h3 className='font-semibold'>Camera</h3>
                                <p className='text-slate-600'>{product?.camera?.cameraResolution}</p>
                            </div>
                            <div className='p-3 border border-slate-200 rounded-lg'>
                                <h3 className='font-semibold'>Battery</h3>
                                <p className='text-slate-600'>{product?.battery?.capacity}</p>
                            </div>
                        </div>
                    </div>

                    {/* See All Specifications */}
                    <div className='text-right'>
                        <button onClick={() => scrollToSection("spec")} className='text-red-500 hover:text-red-600 transition-colors cursor-pointer'>
                            See All Specifications &gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <div className='bg-white p-6 mt-1 border border-slate-300 rounded-lg'>
                <h3 className='font-semibold text-xl mb-1'>{product?.urlName}</h3>
                <p className='text-slate-600'>{product?.description}</p>
            </div>

            {/* Pros and Cons */}
            <div className='bg-white p-6 mt-1 border border-slate-300 rounded-lg'>
                <div className='flex justify-between items-center mb-6'>
                    <h3 className='font-semibold text-xl'>Pros and Cons</h3>
                    <Link to={`/review/${product?.urlName}`} className='text-red-500 hover:text-red-600 transition-colors'>
                        Read Full Review &gt;
                    </Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div className='p-4 border border-slate-200 rounded-lg'>
                        <h4 className='font-semibold mb-3'>Pros</h4>
                        <ul className='list-disc list-inside'>
                            {product?.pros.map((pro, index) => (
                                <li key={index} className='text-slate-600'>{pro}</li>
                            ))}
                        </ul>
                    </div>
                    <div className='p-4 border border-slate-200 rounded-lg'>
                        <h4 className='font-semibold mb-3'>Cons</h4>
                        <ul className='list-disc list-inside'>
                            {product?.cons.map((con, index) => (
                                <li key={index} className='text-slate-600'>{con}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* User Reviews */}
            <div className="bg-white p-6 mb-2 flex flex-col md:flex-row items-center justify-between mt-1 gap-6 w-full">

                {/* Overall Rating Section */}
                <div className="w-full md:w-1/3 text-center p-4 border-r md:border-r-gray-300">
                    <h2 className="uppercase font-semibold mb-3">Overall Rating</h2>
                    <h1 className="uppercase text-3xl font-bold">
                        {averageRating} <span className="text-lg">/ 5</span>
                    </h1>
                    <h3 className="uppercase text-sm text-slate-600">Based on {totalRatings} ratings</h3>
                </div>

                {/* Rating Progress Bar Section */}
                <div className="w-full md:w-1/3 flex justify-center p-4 border-r md:border-r-gray-300">
                    <RatingProgressBar ratings={ratingsData} />
                </div>

                {/* Review Button Section */}
                <div className="w-full md:w-1/3 text-center p-4">
                    <h2 className="uppercase font-semibold mb-2">Share Your Thoughts</h2>
                    <Link
                        to={`/${product?.urlName}-write-review.html#write_user_review_tab`}
                        state={{ product }}  // ✅ Pass the product as state

                        className="uppercase font-semibold border border-red-400 text-red-400 px-4 py-2 rounded-md inline-block cursor-pointer hover:bg-red-400 hover:text-white">
                        Write Review
                    </Link>
                </div>

            </div>
            {/* Seller Links */}
            <div className='flex flex-col gap-4 mb-2 bg-white'>
                {product?.sellers.map((seller, index) => (
                    <div key={index} className='flex flex-col sm:flex-row justify-between items-center p-3 '>
                        <Link to={seller.link} className='w-16 h-16 mb-2 sm:mb-0'>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQT6ppYvn4kCipfwvI3NG3v4eXyH3EGxtRJnA&s" alt="Seller Logo" className='w-full h-full object-contain' />
                        </Link>
                        <div className='flex items-center gap-4'>
                            <p className='text-lg font-semibold'>Rs. {product?.price}</p>
                            <Link to={seller.link} className='bg-red-500 text-white py-2 px-4 rounded uppercase hover:bg-red-600 transition-colors'>
                                Go to Store
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Specifications Table */}
            <div className='bg-white p-6 mt-1 border border-slate-300 rounded-lg'>
                <h3 id='spec' className='font-semibold text-xl mb-6'>Specifications</h3>
                {['general', 'design', 'performance', 'storage', 'camera', 'battery', 'network', 'media', 'others'].map((section) => (
                    <div key={section} className='flex flex-col md:flex-row gap-4 py-4 border-b border-slate-200 last:border-b-0'>
                        <div className='w-full md:w-1/5 text-slate-500 font-semibold'>
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </div>
                        <div className='w-full md:w-4/5'>
                            <SpecificationTable specifications1={product?.[section]} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;