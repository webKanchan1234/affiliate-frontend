import React from 'react'
import { headersData } from '../../data/headersData'
import MenuItem from './MenuItem'

const Header = () => {
    return (
        <div className="w-full pt-20  bg-white flex items-center justify-center p-2 text-black header-shadow z-20">
            <div className="flex space-x-6">
                {headersData.map((item, index) => (
                    <MenuItem key={index} item={item}  />
                ))}
            </div>
        </div>
    )
}

export default Header