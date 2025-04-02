import React from 'react'
import { Link } from 'react-router-dom'

const TopCategory = ({title,category,categories,BASE_URL}) => {
    
    
    return (
        <div className='md:w-4/6 w-auto m-auto my-2 bg-white p-3'>
            <h2 className='text-2xl font-bold'>{title}</h2>
            <div className='flex space-x-4 mt-2 overflow-x-auto scrollbar-hidden whitespace-nowrap'>
                {
                    categories?.map((cat, index) => {
                        return (
                            <Link to={`${category+"/"+cat.urlName}`} key={index}>
                                <div key={index} className="flex flex-col items-center w-30 border border-gray-300 p-2  cursor-pointer flex-shrink-0">
                                    <img src={`${BASE_URL+cat.image}`} alt={cat.name} className="w-20 h-20  object-cover object-[50%_50%]" />
                                    <p className="text-sm mt-1 capitalize">{cat.title}</p>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TopCategory