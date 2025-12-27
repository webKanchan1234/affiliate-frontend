import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card } from '../products/Card';
import { Link } from 'react-router-dom';
import { FiArrowRight } from "react-icons/fi";

const CategoryRowType = ({ title, category, products, BASE_URL, fullWidth = false }) => {
    // console.log(category,products?.[0]?.subcategory)
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.5; // Scroll by half the container width
            const newScrollPosition = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: newScrollPosition,
                behavior: 'smooth',
            });
        }
    };

    return (
        <div className={`${fullWidth ? 'w-full' : 'md:w-4/6'} w-auto mx-auto mb-5 bg-white p-6 `}>
            <div className='flex justify-between items-center mb-6'>
                <h2 className='text-2xl font-bold capitalize text-gray-800'>{title}</h2>
                <Link to={`/${category}/${products?.[0]?.subcategory}`} className='flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200'>
                    View all <FiArrowRight className="ml-2" />
                </Link>
            </div>
            <div className='relative'>
                <button 
                    onClick={() => scroll('left')} 
                    className='absolute left-0 z-10 bg-white shadow-lg p-2 rounded-full hidden md:flex hover:bg-gray-100 transition-colors duration-200 -translate-y-1/2 top-1/2'
                >
                    <ChevronLeft size={24} className="text-gray-700" />
                </button>
                <div 
                    ref={scrollRef} 
                    className='flex gap-4 overflow-x-auto scrollbar-hidden whitespace-nowrap scroll-smooth w-full px-2'
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {products?.map((product, index) => (
                        <div key={index} className='flex-shrink-0 w-48 sm:w-56 md:w-64 snap-center'>
                            <Card product={product} />
                        </div>
                    ))}
                </div>
                <button 
                    onClick={() => scroll('right')} 
                    className='absolute right-0 z-10 bg-white shadow-lg p-2 rounded-full hidden md:flex hover:bg-gray-100 transition-colors duration-200 -translate-y-1/2 top-1/2'
                >
                    <ChevronRight size={24} className="text-gray-700" />
                </button>
            </div>
        </div>
    );
};

export default CategoryRowType;