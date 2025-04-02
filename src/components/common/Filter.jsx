import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';

const Filter = ({ title, filters, type, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Toggle filter section visibility
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Filter options based on search query
  const filteredFilters = filters.filter((filter) =>
    filter.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='border-b border-gray-300 py-2'>
      <div className='flex justify-between items-center cursor-pointer' onClick={handleToggle}>
        <h2 className='uppercase font-semibold text-[0.8rem]'>{title}</h2>
        <span className='text-right'>{isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
      </div>
      <div className={isOpen ? 'block' : 'hidden'}>
        {/* Search input for filters with many options (e.g., brands) */}
        {type === 'brand' && (
          <div className='flex items-center border-b border-blue-400'>
            <Search size={15} className="text-gray-500" />
            <input
              type="text"
              placeholder={`Search ${title}`}
              className='outline-0 px-1 w-5/6'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}

        {type === 'brand' && (
          <div className="max-h-40 overflow-y-auto pr-2">
            {filteredFilters.map((filter, index) => (
              <div key={index} className='p-1 flex items-center'>
                <input
                  type="checkbox"
                  id={filter.value}
                  name={filter.value}
                  onChange={(e) => onFilterChange(filter.value, e.target.checked)}
                />
                <label htmlFor={filter.value} className='ml-2 text-sm'>{filter.label}</label>
              </div>
            ))}
          </div>
        )}

        {type === 'price' && (
          <div className='p-1'>
            {filters.map((filter, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type="radio"
                  id={filter.value}
                  name="price"
                  onChange={(e) => onFilterChange(filter.value, e.target.checked)}
                />
                <label htmlFor={filter.value} className='ml-2 text-sm'>{filter.label}</label>
              </div>
            ))}
          </div>
        )}

        {type === 'ram' && (
          <div className='p-1'>
            {filters.map((filter, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type="checkbox"
                  id={filter.value}
                  name={filter.value}
                  onChange={(e) => onFilterChange(filter.value, e.target.checked)}
                />
                <label htmlFor={filter.value} className='ml-2 text-sm'>{filter.label}</label>
              </div>
            ))}
          </div>
        )}

        {type === 'memory' && (
          <div className='p-1'>
            {filters.map((filter, index) => (
              <div key={index} className='flex items-center'>
                <input
                  type="checkbox"
                  id={filter.value}
                  name={filter.value}
                  onChange={(e) => onFilterChange(filter.value, e.target.checked)}
                />
                <label htmlFor={filter.value} className='ml-2 text-sm'>{filter.label}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;