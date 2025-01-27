import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
    <ul className='flex gap-1 justify-center items-center font-semibold text-white mt-4'>
      {pages.map(pageNo => (
        <li
          key={pageNo}
          className={`border-2 w-8 h-8 flex justify-center items-center cursor-pointer ${currentPage === pageNo ? 'bg-white text-black' : ''}`}
          onClick={() => onPageChange(pageNo)}
        >
          {pageNo}
        </li>
      ))}
    </ul>
    </>
  );
};

export default Pagination;