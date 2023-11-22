
import React from "react";

const Paginate = ({
  projectsPerPage,
  totalProjects,
  paginate,
  previousPage,
  nextPage,
  currentPage
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <ul className="flex items-center -space-x-px h-10 text-base cursor-pointer">
        <li
          onClick={previousPage}
          className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700`}
        >
          Prev
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`flex items-center justify-center px-4 h-10 leading-tight ${currentPage === number ? "bg-blue-500 text-white" : "bg-white"} border border-gray-300 hover:bg-gray-100 hover:text-gray-700`}
          >
            {number}
          </li>
        ))}
        <li
          onClick={nextPage}
          className={`flex items-center justify-center px-4 h-10 leading-tight bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700`}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
