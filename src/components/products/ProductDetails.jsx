
import React, { useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { productDetailsAction } from '../../redux/actions/productAction';
import ImageGallery from './ImageGallery';
import SpecificationTable from './SpecificationTable';
import RatingProgressBar from '../common/RatingProgressBar';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';

const ProductDetails = () => {
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const { details } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { product, loading: productsLoading, error: productsError } = useSelector((state) => state.productDetails);

    // console.log("product", product);

    // Calculate ratings data
    const { ratingsData, averageRating, totalRatings } = useMemo(() => {
        const result = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let totalSum = 0;
        let totalCount = 0;

        if (product?.reviews?.length) {
            product.reviews.forEach((review) => {
                if (review.rating >= 1 && review.rating <= 5) {
                    result[review.rating]++;
                    totalSum += review.rating;
                    totalCount++;
                }
            });
        }

        return {
            ratingsData: result,
            averageRating: totalCount ? (totalSum / totalCount).toFixed(1) : 0,
            totalRatings: totalCount
        };
    }, [product]);

    // Memoized product images
    const productImages = useMemo(() => (
        product?.imageUrls?.map((img) => `${BASE_URL}${img}`) || []
    ), [product, BASE_URL]);

    // Specification sections
    const specificationSections = useMemo(() => (
        ['general', 'design', 'performance','display', 'storage', 'camera', 'battery', 'network','sensor', 'media', 'others']
    ), []);

    // Fetch product details
    useEffect(() => {
        dispatch(productDetailsAction(details));
    }, [dispatch, details]);

    const scrollToSection = (spec) => {
        const section = document.getElementById(spec);
        if (section) {
            const offsetTop = section.offsetTop;
            const spaceFromTop = 90;
            window.scrollTo({
                top: offsetTop - spaceFromTop,
                behavior: "smooth",
            });
        }
    };

    // Loading and error states
    if (productsLoading) {
        return <Loader fullPage />;
    }

    if (productsError) {
        return <ErrorMessage
            message={productsError}
            retry={() => dispatch(productDetailsAction(details))}
            fullPage
        />;
    }

    if (!product) {
        return <ErrorMessage
            message="Product not found"
            retry={() => navigate('/')}
            fullPage
        />;
    }

    return (
        <div className='w-full max-w-6xl mx-auto p-4'>
            <Helmet>
                <title>{product.name} - Specifications, Reviews & Price | YourStore</title>
                <meta name="description" content={`${product.name} - ${product.description?.substring(0, 160)}...`} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description?.substring(0, 160)} />
                <meta property="og:image" content={productImages[0]} />
                <meta property="og:type" content="product" />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        "name": product.name,
                        "description": product.description,
                        "brand": {
                            "@type": "Brand",
                            "name": product.brand
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": averageRating,
                            "reviewCount": totalRatings
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": product.price,
                            "priceCurrency": "INR",
                            "availability": "https://schema.org/InStock"
                        }
                    })}
                </script>
            </Helmet>

            {/* Product Name */}
            <h1 className='bg-white p-6 text-2xl font-bold mb-1 text-center md:text-left'>{product.name}</h1>

            {/* Main Product Details */}
            <div className='flex flex-col md:flex-row gap-6 bg-white p-6'>
                {/* Image Gallery */}
                <div className='w-full md:w-1/2 lg:w-1/3 border border-slate-300 p-4 rounded-lg'>
                    <ImageGallery images={productImages} />
                </div>

                {/* Product Details */}
                <div className='w-full md:w-1/2 lg:w-2/3 border border-slate-300 p-4 rounded-lg'>
                    <h2 className='font-bold text-xl mb-4'>{product.name}</h2>
                    <p className='text-lg mb-4 text-slate-700'>Price: ₹{Number(product?.price).toLocaleString()}</p>

                    {/* Seller Links */}
                    <div className='flex flex-col gap-4 mb-6'>
                        {product.sellers.map((seller, index) => (
                            <div key={`seller-${index}`} className='flex flex-col sm:flex-row justify-between items-center p-3 border border-slate-200 rounded-lg'>
                                <Link to={seller.link} className='w-16 h-16 mb-2 sm:mb-0'>
                                    <img
                                        src={seller.logo || "https://via.placeholder.com/64"}
                                        alt={`${seller.name} logo`}
                                        className='w-full h-full object-contain'
                                        loading="lazy"
                                    />
                                </Link>
                                <div className='flex items-center gap-4'>
                                    <p className='text-lg font-semibold'>₹{Number(seller?.price).toLocaleString()}</p>
                                    <Link
                                        to={seller.link}
                                        className='bg-red-500 text-white py-2 px-4 rounded uppercase hover:bg-red-600 transition-colors'
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        Go to Store
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Key Specifications */}
                    <div className='mb-6'>
                        <h3 className='text-xl font-semibold mb-4'>Key Specifications</h3>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            {[
                                { title: 'Performance', value: product.performance?.cpu },
                                { title: 'Display', value: product.display?.screenSize },
                                { title: 'Camera', value: product.camera?.cameraResolution },
                                { title: 'Battery', value: product.battery?.capacity }
                            ].map((spec, i) => (
                                <div key={`spec-${i}`} className='p-3 border border-slate-200 rounded-lg'>
                                    <h4 className='font-semibold'>{spec.title}</h4>
                                    <p className='text-slate-600'>{spec.value || 'N/A'}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='text-right'>
                        <button
                            onClick={() => scrollToSection("spec")}
                            className='text-red-500 hover:text-red-600 transition-colors cursor-pointer'
                            aria-label="View all specifications"
                        >
                            See All Specifications &gt;
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Description */}
            <section className='bg-white p-6 mt-1 border border-slate-300 rounded-lg'>
                <h3 className='font-semibold text-xl mb-1'>About this product</h3>
                <p className='text-slate-600'>{product.description}</p>
            </section>

            {/* Pros and Cons */}
            <section className='bg-white p-6 mt-1 border border-slate-300 rounded-lg'>
                <div className='flex justify-between items-center mb-6'>
                    <h3 className='font-semibold text-xl'>Pros and Cons</h3>
                    <Link
                        to={`/review/${product.urlName}`}
                        className='text-red-500 hover:text-red-600 transition-colors'
                        aria-label="Read full review"
                    >
                        Read Full Review &gt;
                    </Link>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {[
                        { title: 'Pros', items: product.pros },
                        { title: 'Cons', items: product.cons }
                    ].map((section) => (
                        <div key={section.title} className='p-4 border border-slate-200 rounded-lg'>
                            <h4 className='font-semibold mb-3'>{section.title}</h4>
                            <ul className='list-disc list-inside'>
                                {section.items.map((item, index) => (
                                    <li key={`${section.title}-${index}`} className='text-slate-600'>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* User Reviews */}
            <section className="bg-white p-6 mb-2 flex flex-col md:flex-row items-center justify-between mt-1 gap-6 w-full">
                <div className="w-full md:w-1/3 text-center p-4 border-r md:border-r-gray-300">
                    <h2 className="uppercase font-semibold mb-3">Overall Rating</h2>
                    <h1 className="uppercase text-3xl font-bold">
                        {averageRating} <span className="text-lg">/ 5</span>
                    </h1>
                    <h3 className="uppercase text-sm text-slate-600">Based on {totalRatings} ratings</h3>
                </div>

                <div className="w-full md:w-1/3 flex justify-center p-4 border-r md:border-r-gray-300">
                    <RatingProgressBar ratings={ratingsData} />
                </div>

                <div className="w-full md:w-1/3 text-center p-4">
                    <h2 className="uppercase font-semibold mb-2">Share Your Thoughts</h2>
                    <Link
                        to={`/${product.urlName}-write-review.html#write_user_review_tab`}
                        state={{ product }}
                        className="uppercase font-semibold border border-red-400 text-red-400 px-4 py-2 rounded-md inline-block cursor-pointer hover:bg-red-400 hover:text-white"
                        aria-label="Write a review"
                    >
                        Write Review
                    </Link>
                </div>
            </section>

            <div className='flex flex-col gap-4 mb-2 bg-white'>
                {product?.sellers.map((seller, index) => (
                    <div key={index} className='flex flex-col sm:flex-row justify-between items-center p-3 border border-slate-200 '>
                        <Link to={seller.link} className='w-16 h-16 mb-2 sm:mb-0'>
                            <img src={seller.logo} className='w-full h-full object-contain' />
                        </Link>
                        <div className='flex items-center gap-4'>
                            <p className='text-lg font-semibold'>Rs. {Number(seller?.price).toLocaleString()}</p>
                            <Link to={seller.link} className='bg-red-500 text-white py-2 px-4 rounded uppercase hover:bg-red-600 transition-colors'>
                                Go to Store
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Specifications Table */}
            <section className='bg-white p-6 mt-1 border border-slate-300 rounded-lg'>
                <h3 id='spec' className='font-semibold text-xl mb-6'>Detailed Specifications</h3>
                {specificationSections.map((section) => (
                    product[section] && Object.keys(product[section]).length > 0 && (
                        <div key={section} className='flex flex-col md:flex-row gap-4 py-4 border-b border-slate-200 last:border-b-0'>
                            <div className='w-full md:w-1/5 text-slate-500 font-semibold'>
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </div>
                            <div className='w-full md:w-4/5'>
                                <SpecificationTable specifications1={product[section]} />
                            </div>
                        </div>
                    )
                ))}
            </section>
        </div>
    );
};

export default React.memo(ProductDetails);